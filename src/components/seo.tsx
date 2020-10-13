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
  description = null,
  lang = "en",
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
        const siteLink = `${siteMetadata.siteUrl}${location.pathname}`;

        return (
          <Helmet
            title={title ?? title}
            titleTemplate={`%s | ${title}`}
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
                        content: image,
                      },
                      {
                        name: `og:image`,
                        content: image,
                      },
                      {
                        name: `twitter:card`,
                        content: `summary`,
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
          >
            <html lang={lang ?? "en"} />
          </Helmet>
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
