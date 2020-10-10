import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { IGatsbyQuery } from "../interfaces/IGatsbyQuery";
import { IBlogPostResponse } from "../interfaces/IBlogPostResponse";
import { Comments } from "../components/comments";
import { FrontmatterInfo } from "../components/frontmatterInfo";

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

  const { markdownRemark } = payload.data as any;
  const { frontmatter, html, timeToRead, parent } = markdownRemark;

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

      {!frontmatter.published && (
        <div
          className="flex justify-between content-center text-base bg-orange-100 rounded-t-md border-t-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p style={{ position: "relative", top: "8px" }}>
            ⚠️ This post is not published! Content is subject to change.
          </p>{" "}
          <a
            href={`https://github.com/ganderzz/dylanpaulus.com/blob/master/posts/${parent.name}.${parent.extension}`}
            className="bg-white hover:text-black hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Suggest Edits
          </a>
        </div>
      )}

      <div
        className={`blog-post__header mb-2`}
        data-credit={frontmatter.image_credit}
      >
        <FrontmatterInfo frontmatter={frontmatter} timeToRead={timeToRead} />
      </div>

      <section className="sm:pl-16 sm:pr-16 sm:pb-16 pl-6 pr-6 pb-6">
        <h2 className="mt-0 mb-8 font-bold">{frontmatter.title}</h2>

        <div
          className="blog-post leading-loose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {frontmatter && frontmatter.title && (
          <Comments title={frontmatter.title} />
        )}
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      rawMarkdownBody
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        image
        image_credit
        theme
        published
      }
      parent {
        ... on File {
          name
          extension
        }
      }
    }
  }
`;
