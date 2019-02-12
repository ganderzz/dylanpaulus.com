import React from "react";
import { Link } from "gatsby";

interface IProps {
  tags: string[];
  style?: {};
}

export function TagsList({ tags = [], style = {}, ...rest }: IProps) {
  return (
    <span style={style} {...rest}>
      {tags.map(tag => (
        <Link key={tag} to={`/tags/${tag}`} className="tag-list__item">
          {tag}
        </Link>
      ))}
    </span>
  );
}
