import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ActivityData } from "../src/utils/activity";

type Point = { lat: number; lon: number; ele: number | null; time: number | null };

type Options = {
  input: string;
  out: string;
  type: string;
  caption?: string;
  simplify: number;
  distance?: number;
  elevation?: number;
  movingTimeSec?: number;
};

function parseArgs(argv: string[]): Options {
  const opts: Partial<Options> = { out: "./route.json", type: "Activity", simplify: 0.0025 };
  const rest: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => argv[++i];
    switch (arg) {
      case "-h":
      case "--help":
        printHelp();
        process.exit(0);
      case "-o":
      case "--out":
        opts.out = next();
        break;
      case "-t":
      case "--type":
        opts.type = next();
        break;
      case "-c":
      case "--caption":
        opts.caption = next();
        break;
      case "-s":
      case "--simplify":
        opts.simplify = Number(next());
        break;
      case "-d":
      case "--distance":
        opts.distance = Number(next());
        break;
      case "-e":
      case "--elevation":
        opts.elevation = Number(next());
        break;
      case "--time":
        opts.movingTimeSec = parseDuration(next());
        break;
      default:
        if (arg.startsWith("-")) {
          fail(`Unknown option: ${arg}`);
        }
        rest.push(arg);
    }
  }

  if (rest.length === 0) {
    fail("Missing input GPX file. Run with --help for usage.");
  }
  opts.input = rest[0];
  return opts as Options;
}

function printHelp(): void {
  console.log(
    [
      "Usage: yarn import-activity <input.gpx> [options]",
      "",
      "  -o, --out <path>       output JSON path        (default ./route.json)",
      "  -t, --type <label>     activity kind label     (e.g. \"Trail run\")",
      "  -c, --caption <text>   optional caption",
      "  -s, --simplify <eps>   trace simplify epsilon  (default 0.0025)",
      "  -d, --distance <mi>    override distance (miles)",
      "  -e, --elevation <ft>   override elevation gain (feet)",
      "      --time <duration>  override moving time (1:58:22 | 1h58m | secs)",
      "  -h, --help",
    ].join("\n")
  );
}

function fail(message: string): never {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function parseDuration(input: string): number {
  const value = input.trim();
  if (value.includes(":")) {
    const parts = value.split(":").map(Number);
    if (parts.some((n) => Number.isNaN(n))) fail(`Bad --time value: ${input}`);
    return parts.reduce((acc, n) => acc * 60 + n, 0);
  }
  const hm = value.match(/^(?:(\d+)h)?\s*(?:(\d+)m)?$/i);
  if (hm && (hm[1] || hm[2])) {
    return (Number(hm[1] ?? 0) * 60 + Number(hm[2] ?? 0)) * 60;
  }
  const seconds = Number(value);
  if (Number.isNaN(seconds)) fail(`Bad --time value: ${input}`);
  return seconds;
}

function parseGpx(xml: string): Point[] {
  const points: Point[] = [];
  const trkptRe = /<trkpt\b([^>]*?)(?:\/>|>([\s\S]*?)<\/trkpt>)/g;
  let match: RegExpExecArray | null;

  while ((match = trkptRe.exec(xml)) !== null) {
    const attrs = match[1];
    const inner = match[2] ?? "";
    const lat = Number(attrs.match(/\blat\s*=\s*"([^"]+)"/)?.[1]);
    const lon = Number(attrs.match(/\blon\s*=\s*"([^"]+)"/)?.[1]);
    if (Number.isNaN(lat) || Number.isNaN(lon)) continue;

    const eleRaw = inner.match(/<ele>\s*([^<]+)<\/ele>/)?.[1];
    const timeRaw = inner.match(/<time>\s*([^<]+)<\/time>/)?.[1];
    const ele = eleRaw !== undefined ? Number(eleRaw) : null;
    const time = timeRaw !== undefined ? Date.parse(timeRaw) : null;

    points.push({
      lat,
      lon,
      ele: ele !== null && !Number.isNaN(ele) ? ele : null,
      time: time !== null && !Number.isNaN(time) ? time : null,
    });
  }

  return points;
}

const EARTH_RADIUS_M = 6371000;
const METERS_PER_MILE = 1609.344;
const FEET_PER_METER = 3.28084;
const MOVING_SPEED_THRESHOLD = 0.3;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function haversine(a: Point, b: Point): number {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

function smooth(values: number[], window: number): number[] {
  const half = Math.floor(window / 2);
  return values.map((_, i) => {
    let sum = 0;
    let count = 0;
    for (let j = i - half; j <= i + half; j++) {
      if (j >= 0 && j < values.length) {
        sum += values[j];
        count++;
      }
    }
    return sum / count;
  });
}

type Stats = {
  distanceMeters: number;
  elevationGainMeters: number;
  movingTimeSec: number;
  cumFraction: number[];
};

function computeStats(points: Point[]): Stats {
  let distanceMeters = 0;
  let movingTimeSec = 0;
  const cumMeters: number[] = [0];

  for (let i = 1; i < points.length; i++) {
    const segment = haversine(points[i - 1], points[i]);
    distanceMeters += segment;
    cumMeters.push(distanceMeters);

    const tA = points[i - 1].time;
    const tB = points[i].time;
    if (tA !== null && tB !== null) {
      const dt = (tB - tA) / 1000;
      if (dt > 0 && segment / dt >= MOVING_SPEED_THRESHOLD) {
        movingTimeSec += dt;
      }
    }
  }

  let elevationGainMeters = 0;
  const eles = points.map((p) => p.ele).filter((e): e is number => e !== null);
  if (eles.length === points.length && eles.length > 1) {
    const smoothed = smooth(eles, 5);
    for (let i = 1; i < smoothed.length; i++) {
      const delta = smoothed[i] - smoothed[i - 1];
      if (delta > 0) elevationGainMeters += delta;
    }
  }

  const total = distanceMeters || 1;
  return {
    distanceMeters,
    elevationGainMeters,
    movingTimeSec,
    cumFraction: cumMeters.map((m) => m / total),
  };
}

function perpDistance(
  p: [number, number],
  a: [number, number],
  b: [number, number]
): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lenSq;
  const projX = a[0] + t * dx;
  const projY = a[1] + t * dy;
  return Math.hypot(p[0] - projX, p[1] - projY);
}

function rdp(points: [number, number][], epsilon: number): [number, number][] {
  if (points.length < 3) return points;
  let maxDist = 0;
  let index = 0;
  const start = points[0];
  const end = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDistance(points[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = rdp(points.slice(0, index + 1), epsilon);
    const right = rdp(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [start, end];
}

function round(n: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

function normalizeTrace(points: Point[]): [number, number][] {
  const lat0 = toRad(points.reduce((sum, p) => sum + p.lat, 0) / points.length);
  const cosLat0 = Math.cos(lat0);
  const projected = points.map((p) => ({ x: p.lon * cosLat0, y: p.lat }));

  const xs = projected.map((p) => p.x);
  const ys = projected.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.max(maxX - minX, maxY - minY) || 1;

  return projected.map((p) => [
    round((p.x - minX) / scale, 4),
    round((maxY - p.y) / scale, 4),
  ]);
}

function buildElevation(
  points: Point[],
  cumFraction: number[]
): ActivityData["elevation"] {
  const eles = points.map((p) => p.ele);
  if (eles.some((e) => e === null)) return null;

  const smoothed = smooth(eles as number[], 5);
  const minEle = Math.min(...smoothed);
  const maxEle = Math.max(...smoothed);
  const range = maxEle - minEle || 1;

  const series: [number, number][] = smoothed.map((ele, i) => [
    round(cumFraction[i], 4),
    round((ele - minEle) / range, 4),
  ]);
  return { points: rdp(series, 0.004) };
}

function main(): void {
  const opts = parseArgs(process.argv.slice(2));

  const inputPath = resolve(process.cwd(), opts.input);
  let xml: string;
  try {
    xml = readFileSync(inputPath, "utf8");
  } catch {
    fail(`Could not read GPX file: ${inputPath}`);
  }

  const points = parseGpx(xml!);
  if (points.length < 2) {
    fail("No usable track points found in the GPX file.");
  }

  const stats = computeStats(points);
  const trace = rdp(normalizeTrace(points), opts.simplify);
  const elevation = buildElevation(points, stats.cumFraction);

  const distanceMi =
    opts.distance ?? round(stats.distanceMeters / METERS_PER_MILE, 1);
  const elevationFt =
    opts.elevation ??
    Math.round((stats.elevationGainMeters * FEET_PER_METER) / 10) * 10;
  const movingTimeSec = opts.movingTimeSec ?? Math.round(stats.movingTimeSec);

  const data: ActivityData = {
    version: 1,
    type: opts.type,
    distanceMi,
    elevationFt,
    movingTimeSec,
    ...(opts.caption ? { caption: opts.caption } : {}),
    trace: { points: trace },
    elevation,
  };

  const outPath = resolve(process.cwd(), opts.out);
  writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n");

  const hours = Math.floor(movingTimeSec / 3600);
  const mins = Math.floor((movingTimeSec % 3600) / 60);
  const secs = movingTimeSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  console.log(`✓ import-activity — ${opts.type}`);
  console.log(`  parsed:     ${points.length} track points`);
  console.log(`  distance:   ${distanceMi} mi${opts.distance ? " (override)" : ""}`);
  console.log(
    `  elevation:  ${elevationFt.toLocaleString("en-US")} ft${opts.elevation ? " (override)" : ""}`
  );
  console.log(
    `  moving:     ${hours}:${pad(mins)}:${pad(secs)}${opts.movingTimeSec ? " (override)" : ""}`
  );
  console.log(`  trace:      ${points.length} → ${trace.length} points`);
  console.log(
    `  elevation chart: ${elevation ? `${elevation.points.length} points` : "none (no GPX elevation)"}`
  );
  console.log(`  wrote:      ${outPath}`);
}

main();
