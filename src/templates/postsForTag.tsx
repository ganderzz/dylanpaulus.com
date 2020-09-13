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
      <section className="sm:p-16 p-6 pt-10">
        <h3 className="mt-0 mb-14 p-0 border-b pb-4 font-bold">
          {pageContext.tag} ({tagCount})
        </h3>

        {edges.map((e) => (
          <PostListItem data={e} />
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
