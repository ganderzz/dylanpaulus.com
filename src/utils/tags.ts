import type { CollectionEntry } from "astro:content";

export function normalizeTag(tag: string): string {
  return tag.toLocaleLowerCase().replace(/\s+/g, "-");
}

export function orderByPopular(tags: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.entries(tags).sort(([, a], [, b]) => b - a));
}

export async function getTags(posts: CollectionEntry<"post">[]) {
  return posts
    .flatMap((post) => post.data?.tags)
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
