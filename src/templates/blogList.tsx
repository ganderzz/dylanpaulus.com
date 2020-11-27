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
      <section
        className="flex max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto"
        style={{ minHeight: 1332 }}
      >
        <div className="w-2/3 px-8">
          <div className="flex">
            <div className="flex-1">
              <SubHeading className="mt-0">Recently Published</SubHeading>
            </div>
            <div className="flex-1 text-right mt-8 mb-8">
              <Pagination currentPage={currentPage} totalPages={numPages} />
            </div>
          </div>

          {posts.map((post) => (
            <PostListItem key={post.node.id} data={post} />
          ))}

          <div className="mt-8 mx-auto text-right">
            <Pagination currentPage={currentPage} totalPages={numPages} />
          </div>
        </div>

        <div className="flex flex-col w-1/3 px-8">
          <Link to="/sitemap">
            <SubHeading className="mt-0">Popular Tags</SubHeading>
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
