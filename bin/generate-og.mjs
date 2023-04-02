import { promises } from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import { LOGO } from "./logo-img.mjs";
import { generateCard } from "./card.mjs";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_PATH = path.resolve(DIRNAME, "../src/content/post");

const readFileAsync = async (file) => {
  const contents = await promises.readFile(file);

  return contents.buffer;
};

/**
 * Gets the content from index.md files in the content directory.
 *
 * @returns {Promise<{ fileDirectory: string, title: string }[]>}
 */
async function getContent() {
  const directories = await promises.readdir(CONTENT_PATH);
  let results = [];

  for (const directory of directories) {
    const files = await promises.readdir(path.join(CONTENT_PATH, directory));

    for (const file of files) {
      if (!file.includes("index.md")) {
        continue;
      }

      const markdownFile = await promises.readFile(
        path.join(CONTENT_PATH, directory, file)
      );

      const contents = markdownFile.toString();
      const match = /^title:\s*\"(.*)\"\s*$/m.exec(contents);

      if (match?.length > 0) {
        results.push({ fileDirectory: directory, title: match[1] });
      }
    }
  }

  return results;
}

/**
 * Generates a thumbnail for the given post.
 *
 * @param {string} fileDirectory
 * @param {string} title
 * @param {Buffer} interBold
 * @param {Buffer} interRegular
 * @returns {Promise<void>}
 */
async function generateThumbnail({
  fileDirectory,
  title,
  interBold,
  interRegular,
}) {
  console.log(`Creating Thumbnail for ${title}...`);

  const svg = await generateCard({ title, interBold, interRegular });
  await sharp(Buffer.from(svg, "utf-8"))
    .composite([
      {
        input: await sharp(Buffer.from(LOGO, "utf-8"))
          .resize({ height: 110 })
          .toBuffer(),
        gravity: "southwest",
        left: 40,
        top: 40,
      },
    ])
    .toFile(
      path.resolve(DIRNAME, "..", "dist", "posts", fileDirectory, "card.png")
    );
}

async function run() {
  console.log("Generating social og images...");

  console.log("Fetching Inter fonts...");
  const interBold = await readFileAsync(
    path.resolve(DIRNAME, "fonts/Inter-Bold.woff")
  );
  const interRegular = await readFileAsync(
    path.resolve(DIRNAME, "./fonts/Inter-SemiBold.woff")
  );

  console.log("Fetching content...");
  const contents = await getContent();
  const promises = [];

  for (const { fileDirectory, title } of contents) {
    promises.push(
      generateThumbnail({ fileDirectory, title, interBold, interRegular })
    );
  }

  await Promise.all(promises);
}

run();
