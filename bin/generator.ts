import * as path from "https://deno.land/std/path/mod.ts";
import * as ReactDOMServer from "https://cdn.skypack.dev/react-dom";

const BASE_DIR = path.resolve(path.join(path.dirname(path.fromFileUrl(import.meta.url)), ".."));
const POSTS_DIR = path.join(BASE_DIR, "posts");
const TEMPLATES_DIR = path.join(BASE_DIR, "src");

const templateMain = await Deno.readTextFile(path.join(TEMPLATES_DIR, "index.jsx"));
console.log(templateMain);

for await (const contentEntry of Deno.readDir(POSTS_DIR)) {
  const filePath = path.join(POSTS_DIR, contentEntry.name, "index.md");

  try {
    const contents = await Deno.readTextFile(filePath);

    //console.log(contents);
  } catch {
    throw `Could not find an 'index.md' file at: ${filePath}.`;
  }
}
