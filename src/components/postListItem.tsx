import React from "react";
import { IPost } from "../interfaces/IPost";
import { Link } from "gatsby";

interface IProps {
  data: {
    node: IPost;
  };
  style?: React.CSSProperties;
}

export function PostListItem({ data, style = {}, ...rest }: IProps) {
  return (
    <div
      style={{ minHeight: 117, ...style }}
      className="block mb-20 max-w-screen-lg"
      {...rest}
    >
      <div
        style={{ color: "var(--font-color)" }}
        className="flex font-medium text-md opacity-75"
      >
        <span className="flex content-center mr-2">
          {data.node.frontmatter.date}
        </span>
        •<span className="ml-2">{data.node.timeToRead} min</span>
      </div>

      <Link
        to={data.node.fields.slug}
        title={data.node.excerpt}
        className="font-bold text-3xl"
      >
        {data.node.frontmatter.title}
      </Link>

      <aside
        style={{ color: "var(--font-color)" }}
        className="text-base leading-12 "
      >
        {data.node.excerpt}
      </aside>
    </div>
  );
}
