import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { PostListItem } from "../components/postListItem";
import { Pagination } from "../components/pagination";
import { SubHeading } from "../components/subheading";
import SEO from "../components/seo";
import { TagsList } from "../components/tagsList";

export default function BlogList({ data, pageContext }) {
  const posts = data.posts.edges;
  const { numPages, currentPage } = pageContext;

  const sortedTags = React.useMemo(() => {
    return data.tags.group
      .sort((a, b) => b.totalCount - a.totalCount)
      .slice(0, 5);
  }, [data]);

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
      <section style={{ display: "flex", minHeight: 1332 }}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <SubHeading>Recently Published</SubHeading>
            </div>
            <div>
              <Pagination currentPage={currentPage} totalPages={numPages} />
            </div>
          </div>

          {posts.map((post) => (
            <PostListItem key={post.node.id} data={post} />
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination currentPage={currentPage} totalPages={numPages} />
          </div>
        </div>

        <div style={{ padding: "0 1rem" }}>
          <Link to="/sitemap" style={{ textDecoration: "none" }}>
            <SubHeading>Popular Tags</SubHeading>
          </Link>

          <TagsList tags={sortedTags.map((p) => p.tag)} />
        </div>
      </section>
    </Layout>
  );
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    tags: allMarkdownRemark(limit: 500) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
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
