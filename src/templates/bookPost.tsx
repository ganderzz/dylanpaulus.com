import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function BookPost({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO
        description={frontmatter.title}
        title={frontmatter.title}
        keywords={frontmatter.tags}
      />

      <div className="max-w-sm w-full max-w-full flex mb-6">
        <div className="flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <span>{frontmatter.date}</span>
            <h2 className="mt-4 mb-0 font-bold">{frontmatter.title}</h2>
            <h4 className="mt-0 mb-0">{frontmatter.author}</h4>

            <sub>{frontmatter.tags.join(", ")}</sub>
          </div>
        </div>
      </div>

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
        cover
        author
      }
    }
  }
`;
