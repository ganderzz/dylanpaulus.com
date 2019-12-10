import React from "react";
import H from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

interface IProps {
  description: string;
  lang: string;
  meta: { name: string; content: string }[];
  keywords: string[];
  title: string;
  image: string | null;
}

const Helmet: any = H;

function SEO({
  description = "",
  lang = "en",
  meta = [],
  keywords = [],
  title = "",
  image = null
}: Partial<IProps>) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;

        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription
              },
              {
                property: `og:title`,
                content: title
              },
              {
                property: `og:description`,
                content: metaDescription
              },
              {
                property: `og:type`,
                content: `website`
              },
              {
                name: `twitter:card`,
                content: `summary`
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author
              },
              {
                name: `twitter:title`,
                content: title
              },
              {
                name: `twitter:description`,
                content: metaDescription
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `)
                    }
                  : []
              )
              .concat(
                image
                  ? {
                      name: `twitter:image`,
                      content: image
                    }
                  : []
              )
              .concat(meta)}
          ></Helmet>
        );
      }}
    />
  );
}
export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
