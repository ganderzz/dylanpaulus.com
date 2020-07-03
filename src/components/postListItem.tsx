import React from "react";
import { IPost } from "../interfaces/IPost";
import { Link } from "gatsby";
import { TagsList } from "./tagsList";

interface IProps {
  data: {
    node: IPost;
  };
  style?: React.CSSProperties;
}

export function PostListItem({ data, style = {}, ...rest }: IProps) {
  return (
    <div style={style} className="post-item pb-8 mb-8" {...rest}>
      <div className="flex">
        <span className="flex content-center font-medium sm:text-2xl text-xl">
          {data.node.frontmatter.date}
        </span>
      </div>

      <Link
        className="font-bold sm:text-5xl text-4xl no-underline"
        to={data.node.fields.slug}
        title={data.node.excerpt}
      >
        {data.node.frontmatter.title}
      </Link>
    </div>
  );
}
