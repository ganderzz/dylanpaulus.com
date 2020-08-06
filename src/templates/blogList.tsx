import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { PostListItem } from "../components/postListItem";
import { Pagination } from "../components/pagination";
import { SubHeading } from "../components/subheading";
import SEO from "../components/seo";

export default function BlogList({ data, pageContext }) {
  const posts = data.posts.edges;
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
          `javascript`,
        ]}
      />

      <SubHeading style={{ marginTop: 0 }}>Recently Published</SubHeading>

      {posts.map((post) => (
        <PostListItem key={post.node.id} data={post} />
      ))}

      <div className="mt-10">
        <Pagination currentPage={currentPage} totalPages={numPages} />
      </div>
    </Layout>
  );
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/posts/*.md" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          timeToRead
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