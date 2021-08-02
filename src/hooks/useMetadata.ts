import { useStaticQuery, graphql } from "gatsby";

type QueryType = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<QueryType>(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return site.siteMetadata;
};
