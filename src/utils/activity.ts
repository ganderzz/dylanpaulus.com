export type ActivityData = {
  version: number;
  type: string;
  distanceMi: number;
  elevationFt: number;
  movingTimeSec: number;
  caption?: string;
  trace: { points: [number, number][] };
  elevation: { points: [number, number][] } | null;
};

export function formatMovingTime(totalSeconds: number): string {
  const minutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}
