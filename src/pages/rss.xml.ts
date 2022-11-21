import rss from "@astrojs/rss";

const posts = import.meta.glob("./posts/**/*.md", { eager: true });

export const get = () =>
  rss({
    title: "Dylan Paulus' Blog",
    description: "Rambling on software.",
    site: import.meta.env.SITE,
    items: Object.values(posts).map((post: any) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
    })),
    customData: `<language>en-us</language>`,
  });
