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
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className="focus:border-2 focus:border-grey-dark hover:opacity-100 hover:bg-grey-darker hover:text-white text-base rounded bg-grey-darkest p-2 text-white no-underline font-semibold mr-2 opacity-75"
        >
          {tag}
        </Link>
      ))}
    </span>
  );
}
