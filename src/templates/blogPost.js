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

      <span>
        {frontmatter.date}{" "}
        <TagsList
          className="sm:ml-4 sm:inline block mt-2"
          tags={frontmatter.tags}
        />
      </span>
      <h1 className="mt-4 font-bold">{frontmatter.title}</h1>

      <div
        className="leading-loose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
