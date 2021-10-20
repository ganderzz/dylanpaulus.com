import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function SiteMap({ data }) {
  const sortedTags = React.useMemo(() => {
    return data.allMdx.group.sort((a, b) => b.totalCount - a.totalCount);
  }, [data]);

  const largestTotalCount = sortedTags[0].totalCount;

  return (
    <Layout>
      <SEO
        description="Sitemap"
        title="Sitemap"
        keywords={sortedTags.map((p) => p.tag)}
      />
      <section className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h1 className="mt-0 mb-8 border-b dark:border-gray-600 pb-4 font-bold">
          Sitemap
        </h1>

        <div className="flex flex-wrap">
          {sortedTags.map(({ tag, totalCount }) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              style={{
                opacity: Math.max(0.65, totalCount / largestTotalCount),
              }}
              className="focus:border-2 focus:border-grey-dark hover:opacity-100 hover:scale-105 transform m-2 hover:bg-gray-900 hover:text-white text-lg rounded bg-gray-700 p-2 text-white no-underline font-semibold mr-2"
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
    allMdx(limit: 500) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
