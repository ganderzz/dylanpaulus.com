import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { TagsList } from "../components/tagsList";
import SEO from "../components/seo";
import { IGatsbyQuery } from "../interfaces/IGatsbyQuery";
import { IBlogPostResponse } from "../interfaces/IBlogPostResponse";
import { Comments } from "../components/comments";

type Props = {
  data: IGatsbyQuery<IBlogPostResponse>;
};

export default function BlogPost({ data }: Props) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO
        description={frontmatter.title}
        title={frontmatter.title}
        keywords={frontmatter.tags}
      />

      <span>
        {frontmatter.date}{" "}
        <TagsList
          className="sm:ml-4 sm:inline block mt-2"
          tags={frontmatter.tags}
        />
      </span>
      <h1 className="mt-4 font-bold">{frontmatter.title}</h1>

      <div
        className="leading-loose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <Comments />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;