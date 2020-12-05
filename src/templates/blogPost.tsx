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
    <Layout className="mt-4">
      <SEO
        description={frontmatter.description ?? frontmatter.title}
        title={frontmatter.title}
        keywords={frontmatter.tags}
        image={
          frontmatter.image
            ? `${(payload.data as any).site.siteMetadata.siteUrl}/static/${
                frontmatter.image.relativePath
              }`
            : null
        }
      />

      {!frontmatter.published && (
        <div
          className="flex justify-between content-center text-base bg-orange-100 rounded-t-md border-t-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="relative top-0 mt-2">
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
        className="blog-post__header text-center"
        data-credit={frontmatter.image_credit}
      >
        <FrontmatterInfo frontmatter={frontmatter} timeToRead={timeToRead} />
      </div>

      <section className="mt-4">
        <h1
          className={`${
            frontmatter.series ? "mb-0" : "mb-10"
          } mt-4 mx-auto font-bold text-center`}
          style={{ maxWidth: "45ch" }}
        >
          {frontmatter.title}
        </h1>

        {frontmatter.series && (
          <h6
            className="mb-10 mt-0 mx-auto italic text-center"
            style={{ maxWidth: "45ch" }}
          >
            Part of the {frontmatter.series} series.
          </h6>
        )}

        <article
          className="blog__post mb-10 dark:text-gray-100 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {frontmatter && frontmatter.title && (
          <div className="blog__post">
            <Comments title={frontmatter.title} />
          </div>
        )}
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        image {
          id
          relativePath
        }
        series
        image_credit
        published
      }
    }
  }
`;
