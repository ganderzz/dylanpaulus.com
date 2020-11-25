export interface IGatsbyQuery<T> {
  Mdx: {
    frontmatter: T;
    html: string;
  };
}
