import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const get = async () => {
  const posts = await getCollection("post");

  return rss({
    title: "Dylan Paulus' Blog",
    description: "Rambling on software.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.date as any,
    })),
    customData: `<language>en-us</language>`,
  });
};
