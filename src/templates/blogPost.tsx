import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { IGatsbyQuery } from "../interfaces/IGatsbyQuery";
import { IBlogPostResponse } from "../interfaces/IBlogPostResponse";
import { Comments } from "../components/comments";
import { FrontmatterInfo } from "../components/frontmatterInfo";

type Props = {
  data: IGatsbyQuery<IBlogPostResponse>;
  location: {
    origin: string;
  };
};

const TableOfContents = styled.div`
  margin: 0;

  ul,
  li {
    margin: 0;
    padding: 0 0 0 0.5rem;
    list-style-type: none;
  }

  a,
  a:active,
  a:visited {
    opacity: 0.8;
    color: ${(props) => props.theme.link.font};
    text-decoration: none;
    transition: color 0.2s opacity 0.2;
  }
  a:hover {
    opacity: 1;
    color: ${(props) => props.theme.link.hover};
  }
`;

export default function BlogPost(payload: Props) {
  if (!payload) {
    return null;
  }

  const { markdownRemark } = payload.data as any;
  const { frontmatter, html, timeToRead, parent, tableOfContents } =
    markdownRemark;

  return (
    <Layout>
      <SEO
        description={frontmatter.description ?? frontmatter.title}
        title={frontmatter.title}
        keywords={frontmatter.tags}
        image={
          frontmatter.image
            ? `${(payload.data as any).site.siteMetadata.siteUrl}/static/${
                frontmatter.image.relativePath
              }`
            : null
        }
      />

      {!frontmatter.published && (
        <div role="alert">
          <p>⚠️ This post is not published! Content is subject to change.</p>{" "}
          <a
            href={`https://github.com/ganderzz/dylanpaulus.com/blob/master/posts/${parent.name}.${parent.extension}`}
          >
            Suggest Edits
          </a>
        </div>
      )}

      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        data-credit={frontmatter.image_credit}
      >
        <FrontmatterInfo frontmatter={frontmatter} timeToRead={timeToRead} />
      </div>

      <section style={{ position: "relative" }}>
        <h1
          style={{
            maxWidth: "45ch",
            margin: "12px auto 0 auto",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "3rem",
          }}
        >
          {frontmatter.title}
        </h1>

        {frontmatter.series && (
          <h6
            style={{
              fontSize: "1rem",
              fontStyle: "italic",
              maxWidth: "45ch",
              margin: "0 auto 20px auto",
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            Part of the {frontmatter.series} series.
          </h6>
        )}

        <div style={{ marginTop: 30, marginBottom: 10, display: "flex" }}>
          <article
            className="blog__post"
            style={{ lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <aside>
            <div
              style={{
                position: "sticky",
                top: 60,
                left: 0,
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              <span style={{ opacity: 0.8 }}>Contents</span>
              <TableOfContents
                dangerouslySetInnerHTML={{ __html: tableOfContents }}
              />
            </div>
          </aside>
        </div>

        {frontmatter && frontmatter.title && (
          <Comments title={frontmatter.title} />
        )}
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      tableOfContents
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        image {
          id
          relativePath
        }
        series
        image_credit
        published
      }
    }
  }
`;
