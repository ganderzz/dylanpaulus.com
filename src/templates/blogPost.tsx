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
  location: {
    origin: string;
  };
};

export default function BlogPost(payload: Props) {
  if (!payload) {
    return null;
  }

  const { markdownRemark } = payload.data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO
        description={frontmatter.title}
        title={frontmatter.title}
        keywords={frontmatter.tags}
        image={
          frontmatter.image
            ? `${
                payload.location.origin
              }${require(`../images/covers/${frontmatter.image}`)}`
            : null
        }
      />

      <span>
        {frontmatter.date}{" "}
        <TagsList
          className="sm:ml-4 sm:inline block mt-2"
          tags={frontmatter.tags}
        />
      </span>

      <h3 className="mt-4 mb-8 font-bold">{frontmatter.title}</h3>

      <div
        className="blog-post leading-loose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {frontmatter && frontmatter.title && (
        <Comments title={frontmatter.title} />
      )}
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
        image
      }
    }
  }
`;
