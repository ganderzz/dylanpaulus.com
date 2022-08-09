import React from "react";
import { StaticQuery, graphql } from "gatsby";

interface IProps {
  pathname?: string;
  description: string;
  lang: string;
  meta: { name: string; content: string }[];
  keywords: string[];
  title: string;
}

export const SEO = ({ pathname = "", title = "", description = "", meta = [], keywords = [] }: Partial<IProps>) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const siteMetadata = data.site.siteMetadata;
        const metaDescription = description ?? siteMetadata.description;
        const siteLink = `${siteMetadata.siteUrl}${typeof window !== "undefined" ? window.location.pathname : ""}`;

        return (
          <>
            <title>{title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}</title>
            <link rel="canonical" href={siteLink} />

            {[
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
                name: `og:image`,
                content: `${siteMetadata.siteUrl}/${pathname}twitter-card.jpg`,
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
              {
                name: `twitter:image`,
                content: `${siteMetadata.siteUrl}/${pathname}twitter-card.jpg`,
              },
              {
                name: `twitter:card`,
                content: `summary_large_image`,
              },
            ]
              .concat(meta)
              .map((item) => (
                <meta key={item.name} {...item} />
              ))}
          </>
        );
      }}
    />
  );
};

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
