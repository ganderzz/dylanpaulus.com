import React from "react";
import { Link } from "gatsby";

interface IProps {
  tags: string[];
  style?: React.CSSProperties;
  className?: string;
}

const tagColor = (name: string): string => {
  switch (name?.toLowerCase()) {
    case "javascript":
      return "bg-orange-300 text-orange-800 hover:text-orange-900";
    case "react":
      return "bg-yellow-300 text-yellow-800 hover:text-yellow-900";
    case "personal":
      return "bg-green-300 text-green-800 hover:text-green-900";
    case "software-engineering":
      return "bg-teal-400 text-teal-800 hover:text-teal-900";
    case "beginner":
      return "bg-blue-400 text-blue-800 hover:text-blue-900";
  }

  return "bg-gray-300 text-gray-700 hover:text-gray-900";
};

export function TagsList({ tags = [], style = {}, ...rest }: IProps) {
  return (
    <span style={style} {...rest}>
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className={`inline-block ${tagColor(
            tag
          )} hover:bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 leading-5 transition ease-out duration-200`}
        >
          {tag}
        </Link>
      ))}
    </span>
  );
}
