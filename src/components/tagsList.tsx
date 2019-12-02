import React from "react";
import { Link } from "gatsby";

interface IProps {
  tags: string[];
  style?: React.CSSProperties;
  className?: string;
}

export function TagsList({ tags = [], style = {}, ...rest }: IProps) {
  return (
    <span style={style} {...rest}>
      {tags.map(tag => (
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className="focus:border-2 focus:border-grey-800 hover:opacity-100 hover:bg-gray-700 hover:text-white text-base rounded bg-gray-700 p-2 text-white no-underline font-semibold mr-2 opacity-75"
        >
          {tag}
        </Link>
      ))}
    </span>
  );
}
