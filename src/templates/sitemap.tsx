import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function SiteMap({ data }) {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  const tagsList = React.useMemo(
    () =>
      edges.reduce((accu, edge) => {
        const tags = edge.node.frontmatter.tags;

        const formatted = tags.reduce((subAccu, tag) => {
          return {
            ...subAccu,
            [tag]: accu[tag] && accu[tag] >= 0 ? accu[tag] + 1 : 1,
          };
        }, {});

        return {
          ...accu,
          ...formatted,
        };
      }, {}),
    [edges]
  );

  return (
    <Layout>
      <SEO
        description="Sitemap"
        title="Sitemap"
        keywords={Object.keys(tagsList || {})}
      />
      <section className="sm:p-16 p-6 pt-10">
        <h3 className="mt-0 mb-16 bg-gray-800 text-white p-6">Sitemap</h3>

        <div className="flex flex-wrap -mb-4">
          {Object.keys(tagsList).map((key) => (
            <Link
              key={key}
              to={`/tags/${key}/`}
              className="focus:border-2 focus:border-grey-dark hover:opacity-100 m-2 hover:bg-gray-700 hover:text-white text-lg rounded bg-gray-700 p-2 text-white no-underline font-semibold mr-2 opacity-75"
            >
              {key} ({tagsList[key] || 0})
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;
