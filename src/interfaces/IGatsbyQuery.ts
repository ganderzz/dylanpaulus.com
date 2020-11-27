export interface IGatsbyQuery<T> {
  markdownRemark: {
    frontmatter: T;
    html: string;
  };
}
