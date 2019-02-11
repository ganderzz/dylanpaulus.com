import React from "react";

interface IProps {
  tags: string[];
  style?: {};
}

export function TagsList({ tags = [], style = {}, ...rest }: IProps) {
  return (
    <span style={style} {...rest}>
      {tags.map(tag => (
        <span
          key={tag}
          style={{
            fontSize: "1rem",
            background: "#666",
            color: "#FFF",
            padding: "2px 4px",
            borderRadius: 4,
            marginRight: 3
          }}
        >
          {tag}
        </span>
      ))}
    </span>
  );
}
