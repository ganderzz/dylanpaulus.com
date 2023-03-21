import type { CollectionEntry } from "astro:content";

/**
 * Normalizes a tag name.
 *
 * @param tag - Tag name to normalize.
 * @returns Normalized tag name.
 */
export function normalizeTag(tag: string): string {
  return tag.toLocaleLowerCase().replace(/\s+/g, "-");
}

/**
 * Returns a list of tags and their count ordered by popularity.
 *
 * @param posts - List of posts to get tags from.
 * @returns Record of tags and their count.
 * @example
 * ```ts
 * const tags = await getTags(posts);
 * const orderedTags = orderByPopular(tags);
 * ```
 */
export function orderByPopular(
  tags: Record<string, number>
): Record<string, number> {
  return Object.fromEntries(Object.entries(tags).sort(([, a], [, b]) => b - a));
}

/**
 *  Returns a list of tags and their count.
 *
 * @param posts - List of posts to get tags from.
 * @returns Record of tags and their count.
 */
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
