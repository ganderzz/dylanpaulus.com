export interface IPost {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    category?: string[];
  };
  fields: {
    slug: string;
  };
}
