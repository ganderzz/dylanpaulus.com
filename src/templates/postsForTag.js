import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { PostListItem } from "../components/postListItem";

export default function PostsForTag({ data, pageContext }) {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  const tagCount = edges.length;

  return (
    <Layout>
      <SEO
        description=""
        title={pageContext.tag}
        keywords={[pageContext.tag]}
      />

      <h3
        style={{
          margin: 0,
          paddingBottom: 10
        }}
      >
        {pageContext.tag} ({tagCount})
      </h3>

      {edges.map(e => (
        <PostListItem data={e} style={{ marginBottom: 20 }} />
      ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;