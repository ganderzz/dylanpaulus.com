import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { remarkExcerpt } from "./plugins/remark-excerpt.mjs";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

export default defineConfig({
  integrations: [preact(), tailwind()],
  site: `https://dylanpaulus.com`,
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime, remarkExcerpt],
  },
});
