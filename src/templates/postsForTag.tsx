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
      <SEO title={pageContext.tag} keywords={[pageContext.tag]} />
      <section className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h1 className="mt-0 mb-8 border-b pb-4 font-bold">
          {pageContext.tag} ({tagCount})
        </h1>

        {edges.map((e) => (
          <PostListItem key={e.node.id} data={e} />
        ))}
      </section>
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
