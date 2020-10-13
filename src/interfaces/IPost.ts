export interface IPost {
  id: string;
  excerpt: string;
  timeToRead?: number;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
  };
  fields: {
    slug: string;
  };
}
