import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { PostListItem } from "../components/postListItem";
import { Pagination } from "../components/pagination";
import SEO from "../components/seo";

export default function BlogList({ data, pageContext }) {
  const posts = data.allMarkdownRemark.edges;
  const { numPages, currentPage } = pageContext;

  return (
    <Layout>
      <SEO
        description=""
        title="Home"
        keywords={[
          `software`,
          `code`,
          `programming`,
          `blog`,
          `portfolio`,
          `react`,
          `typescript`,
          `javascript`
        ]}
      />

      {posts.map(post => (
        <PostListItem key={post.node.id} data={post} className="post__item" />
      ))}

      <div style={{ textAlign: "center", paddingTop: 15 }}>
        <Pagination currentPage={currentPage} totalPages={numPages} />
      </div>
    </Layout>
  );
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;