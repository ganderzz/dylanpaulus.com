import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function SiteMap({ data }) {
  const sortedTags = React.useMemo(() => {
    return data.allMarkdownRemark.group.sort(
      (a, b) => b.totalCount - a.totalCount
    );
  }, [data]);

  const largestTotalCount = sortedTags[0].totalCount;

  return (
    <Layout>
      <SEO
        description="Sitemap"
        title="Sitemap"
        keywords={sortedTags.map((p) => p.tag)}
      />
      <section className="sm:p-16 p-6 pt-10">
        <h3 className="mt-0 mb-16 bg-gray-800 text-white p-6">Sitemap</h3>

        <div className="flex flex-wrap -mb-4">
          {sortedTags.map(({ tag, totalCount }) => (
            <Link
              key={tag}
              to={`/tags/${tag}/`}
              style={{
                opacity: Math.max(0.65, totalCount / largestTotalCount),
              }}
              className="focus:border-2 focus:border-grey-dark hover:opacity-100 m-2 hover:bg-gray-700 hover:text-white text-lg rounded bg-gray-700 p-2 text-white no-underline font-semibold mr-2 opacity-75"
            >
              {tag} ({totalCount ?? 0})
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(limit: 500) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
