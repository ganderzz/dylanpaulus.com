import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { TagsList } from "../components/tagsList";

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

      <h1>Sitemap</h1>

      <TagsList tags={sortedTags.map((p) => p.tag)} />
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
