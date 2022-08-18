export interface IGatsbyQuery<T> {
  markdownRemark: {
    frontmatter: T;
    html: string;
    timeToRead: number;
    parent?: { name: string; extension: string };
  };
}
