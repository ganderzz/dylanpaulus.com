import React from "react";
import { Link } from "gatsby";

interface IProps {
  tags: string[];
  style?: React.CSSProperties;
  className?: string;
}

export const TagsList = ({ tags = [], style = {}, ...rest }: IProps) => {
  return (
    <span style={style} {...rest}>
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className={`inline-block hover:bg-gray-400 hover:text-gray-800 dark:bg-gray-900 dark:text-white bg-gray-300 text-gray-800 border-0 scale-100 transform hover:scale-105 rounded-full px-3 py-1 text-sm font-semibold my-2 mx-1 leading-5 transition ease-out duration-200`}
        >
          {tag}
        </Link>
      ))}
    </span>
  );
};
