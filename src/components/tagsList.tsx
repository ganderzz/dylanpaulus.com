import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

interface IProps {
  tags: string[];
  style?: React.CSSProperties;
  className?: string;
}

const Tag = styled(Link)`
  display: inline-block;
  font-size: 0.9rem;
  border-radius: 4px;
  margin: 0.2rem;
  padding: 0.2rem 0.4rem;
  text-decoration: none;
  word-break: keep-all;
  color: ${(props) => props.theme.tag.font};
  background: ${(props) => props.theme.tag.background};
  transition: background 0.2s;

  :hover {
    background: ${(props) => props.theme.tag.hover};
  }
`;

export function TagsList({ tags = [], style = {}, ...rest }: IProps) {
  return (
    <span style={style} {...rest}>
      {tags.map((tag) => (
        <Tag key={tag} to={`/tags/${tag}`}>
          {tag}
        </Tag>
      ))}
    </span>
  );
}
