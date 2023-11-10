import { promises } from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import { LOGO } from "./logo-img.mjs";
import { generateCard } from "./card.mjs";
import { generateText } from "./text.mjs";

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
    if (directory.toLocaleLowerCase().includes(".ds_store")) {
      continue;
    }
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
      const imageMatch = /^image:\s*\"(.*)\"\s*$/m.exec(contents);
      const imagePath = imageMatch
        ? path.join(CONTENT_PATH, directory, imageMatch[1])
        : null;

      if (match?.length > 0) {
        results.push({
          fileDirectory: directory,
          title: match[1],
          image: imagePath,
        });
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
  image,
  interBold,
  interRegular,
}) {
  console.log(`Creating Thumbnail for ${title}...`);

  const svg = await generateCard();
  const text = await generateText({ title, image, interBold, interRegular });

  const additionalImages = [];
  if (image) {
    const bgImage = await sharp(image)
      .removeAlpha()
      .ensureAlpha(0.08)
      .resize({ width: 1200, height: 630 })
      .toBuffer();
    additionalImages.push({
      input: bgImage,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    });
  }

  await sharp(Buffer.from(svg, "utf-8"))
    .composite([
      ...additionalImages,
      {
        input: await sharp(Buffer.from(LOGO, "utf-8"))
          .resize({ height: 110 })
          .toBuffer(),
        gravity: "southwest",
        left: 40,
        top: 40,
      },
      {
        input: await sharp(Buffer.from(text, "utf-8")).toBuffer(),
        gravity: "northwest",
        left: 10,
        top: 20,
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

  for (const { fileDirectory, title, image } of contents) {
    promises.push(
      generateThumbnail({
        fileDirectory,
        title,
        image,
        interBold,
        interRegular,
      })
    );
  }

  await Promise.all(promises);
}

run();
