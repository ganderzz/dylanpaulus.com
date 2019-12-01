export interface IBookResponse {
  date: string;
  title: string;
  tags: string[];
  cover: string;
  author: string;
  rating: BookRating;
}

export type BookRating = "Avoid It" | "Read It" | "Commit to Memory";
