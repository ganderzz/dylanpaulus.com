import { toString } from "mdast-util-to-string";

export function remarkExcerpt() {
  return function (tree, { data }) {
    data.astro.frontmatter.excerpt = toString(tree).slice(0, 400) + "...";
  };
}
