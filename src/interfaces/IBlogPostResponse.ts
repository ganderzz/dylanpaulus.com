export interface IBlogPostResponse {
  date: string;
  title: string;
  description: string;
  tags: string[];
  image: { relativePath: string };
  image_credit?: string;
  series?: string;
  published?: boolean;
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
}
