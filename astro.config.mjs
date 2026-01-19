import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { remarkExcerpt } from "./plugins/remark-excerpt.mjs";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    integrations: [preact(), tailwind(), sitemap({
        serialize(item) {
            return {
                ...item,
                url: item.url.replace(/\b\d{4}\b/g, "")
            };
        }
    }), mdx()],
    output: "static",
    site: "https://dylanpaulus.com",
    vite: {
        ssr: {
            external: ["svgo"],
        },
    },
    markdown: {
        extendDefaultPlugins: true,
        syntaxHighlight: "shiki",
        remarkPlugins: [remarkReadingTime, remarkExcerpt],
    },
});
