import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt({
  html: true,
  breaks: true,
});

export const GET = async () => {
  const posts = await getCollection("post");
  posts.sort((a, b) => {
    return (new Date(b.data.date) as any) - (new Date(a.data.date) as any);
  });

  return rss({
    title: "Dylan Paulus' Blog",
    description: "Rambling on software.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.date as any,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: `<language>en-us</language>`,
  });
};
