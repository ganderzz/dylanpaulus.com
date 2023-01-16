import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import { remarkExcerpt } from "./plugins/remark-excerpt.mjs";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [compress(), image(), preact(), tailwind(), sitemap(), mdx()],
  output: "static",
  site: `https://dylanpaulus.com`,
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: "shiki",
    remarkPlugins: [remarkReadingTime, remarkExcerpt]
  }
});