import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export default function AstroSearch() {
  return {
    name: "astro-search",
    hooks: {
      "astro:build:done": async ({ dir, routes, pages }) => {
        console.log(dir, routes, pages);
      },
    },
  };
}
