import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { TagsList } from "../components/tagsList";
import SEO from "../components/seo";

export default function BlogPost({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO
        description=""
        title={frontmatter.title}
        keywords={frontmatter.tags}
      />

      <div className="blog-post">
        <span>
          {frontmatter.date}{" "}
          <TagsList style={{ marginLeft: 5 }} tags={frontmatter.tags} />
        </span>
        <h1
          style={{ fontSize: "5.0rem", marginBottom: "2.8rem", marginTop: 0 }}
        >
          {frontmatter.title}
        </h1>

        <div
          className="blog-post-content"
          style={{
            fontSize: "1.7rem",
            lineHeight: "3.1rem"
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
