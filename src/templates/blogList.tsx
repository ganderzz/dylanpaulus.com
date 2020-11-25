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
      <section style={{ minHeight: 1332 }}>
        <SubHeading className="mt-0">Recently Published</SubHeading>

        {posts.map((post) => (
          <PostListItem key={post.node.id} data={post} />
        ))}

        <div className="mt-8 mx-auto text-center">
          <Pagination currentPage={currentPage} totalPages={numPages} />
        </div>
      </section>
    </Layout>
  );
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { glob: "**/posts/**/index.md" }
        frontmatter: { published: { eq: true } }
      }
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
