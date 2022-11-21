export function remarkExcerpt() {
  return function (tree, { data }) {
    if (tree.type === "root") {
      const children = tree.children
        .filter((child) => child.type === "paragraph")
        .flatMap((child) => child.children)
        .filter((node) => node.type === "text");

      const allContent = children.reduce((accu, current) => accu + current.value, "");
      const slice = allContent.slice(0, 300);

      data.astro.frontmatter.excerpt = slice + (slice[slice.length - 1] === "." ? "" : "...");
    }
  };
}
