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
  const hasRenderedClipboard  = React.useRef(false);

  React.useEffect(() => {
    if (hasRenderedClipboard.current) {
      return;
    }

    const codeBlocks = document.querySelectorAll("div[data-language]");

    Array.prototype.forEach.call(codeBlocks, function(block) {
      const copyElement = document.createElement("a");
      copyElement.innerHTML = "<i class='fas fa-clipboard' />";
      copyElement.style.cursor = "pointer";
      copyElement.style.position = "absolute";
      copyElement.style.top = "5px";
      copyElement.style.right = "15px";

      block.style.position = "relative";
  
      copyElement.onclick = function(e) {
        const elem = (e.currentTarget as any).parentNode.querySelector("pre");

        if (!elem) {
          return;
        }

        const CopyRange = document.createRange();

        CopyRange.selectNode(elem);
        window.getSelection().addRange(CopyRange);
        document.execCommand("copy");
      };

      block.appendChild(copyElement);
    });

    hasRenderedClipboard.current = true;

  }, []);

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

      <h1 className="mt-4 font-bold">{frontmatter.title}</h1>

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
