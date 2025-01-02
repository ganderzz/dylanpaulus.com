import { defineCollection, z } from "astro:content";

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    description: z.optional(z.string()),
    banner: z.optional(z.string()),
    heroImage: z.optional(z.string()),
    timeToRead: z.optional(z.union([z.number(), z.string()])),
    published: z.optional(z.boolean()),
    externalLink: z.optional(z.string()),
    tip: z.optional(z.boolean()),
    excerpt: z.optional(z.string()),
    series: z.optional(z.string()),
  }),
});

export const collections = {
  post,
};
