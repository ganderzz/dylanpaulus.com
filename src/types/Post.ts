export type Post = {
  timeToRead: number;
  tags: string[];
  date: string;
  title: string;
  image: string;
  image_credit: string;
  published: boolean;
  description: string;
  excerpt?: string;
  series?: string;
};
