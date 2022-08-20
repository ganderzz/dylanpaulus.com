import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import { remarkExcerpt } from "./plugins/remark-excerpt.mjs";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), preact(), tailwind(), compress()],
  site: `https://dylanpaulus.com`,
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime, remarkExcerpt],
  },
});
