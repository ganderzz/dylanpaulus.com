import React from "react";
import { IPost } from "../interfaces/IPost";
import { Link } from "gatsby";

interface IProps {
  data: {
    node: IPost;
  };
  style?: {};
}

export function PostListItem({ data, style = {}, ...rest }: IProps) {
  return (
    <div style={style} className="border-b pb-12 mb-12" {...rest}>
      <span className="block font-medium sm:text-3xl text-xl text-grey-darkest">
        {data.node.frontmatter.date}
      </span>

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
