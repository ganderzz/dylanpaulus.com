import type { MarkdownInstance } from "astro";
import type { Post } from "../types/Post";

export function normalizeTag(tag: string): string {
  return tag.toLocaleLowerCase().replace(/\s+/g, "-");
}

export async function getTags(posts: MarkdownInstance<Post>[]) {
  return posts
    .flatMap((post) => post.frontmatter?.tags)
    .reduce((accu: Record<string, number>, tagName) => {
      if (!tagName) {
        return accu;
      }

      const lowerTagName = normalizeTag(tagName);

      if (lowerTagName in accu) {
        return {
          ...accu,
          [lowerTagName]: accu[lowerTagName] + 1,
        };
      }

      return {
        ...accu,
        [lowerTagName]: 1,
      };
    }, {});
}
