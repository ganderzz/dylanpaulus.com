import React from "react";
import H from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

interface IProps {
  pathname?: string;
  description: string;
  lang: string;
  meta: { name: string; content: string }[];
  keywords: string[];
  title: string;
  image: string | null;
}

const Helmet: any = H;

function SEO({
  pathname = "",
  description = null,
  meta = [],
  keywords = [],
  title = null,
  image = null,
}: Partial<IProps>) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const siteMetadata = data.site.siteMetadata;
        const metaDescription = description ?? siteMetadata.description;
        const siteLink = `${siteMetadata.siteUrl}${
          typeof window !== "undefined" ? window.location.pathname : ""
        }`;

        return (
          <Helmet
            title={title ?? siteMetadata.title}
            titleTemplate={`%s | ${siteMetadata.title}`}
            link={[
              {
                rel: "canonical",
                key: siteLink,
                href: siteLink,
              },
            ]}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: siteMetadata.title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:url`,
                content: siteLink,
              },
              {
                name: `twitter:creator`,
                content: siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `keywords`,
                content: keywords.concat(siteMetadata.keywords).join(`, `),
              },
            ]
              .concat(
                image
                  ? [
                      {
                        name: `twitter:image`,
                        content: `${siteMetadata.siteUrl}${pathname}twitter-card.jpg`,
                      },
                      {
                        name: `og:image`,
                        content: image,
                      },
                      {
                        name: `twitter:card`,
                        content: `summary_large_image`,
                      },
                    ]
                  : [
                      {
                        name: `twitter:card`,
                        content: `summary`,
                      },
                    ]
              )
              .concat(meta)}
          />
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
        keywords
        siteUrl
      }
    }
  }
`;
