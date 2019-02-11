export interface IPost {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
  };
  fields: {
    slug: string;
  };
}
