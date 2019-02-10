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
    <div style={style} {...rest}>
      <span style={{ display: "block", color: "#50545c", fontWeight: 600 }}>
        {data.node.frontmatter.date}
        {data.node.frontmatter.category
          ? " - " + data.node.frontmatter.category
          : ""}
      </span>
      <Link
        style={{ fontSize: "3.2rem", fontWeight: 700 }}
        to={data.node.fields.slug}
        title={data.node.excerpt}
      >
        {data.node.frontmatter.title}
      </Link>{" "}
    </div>
  );
}
