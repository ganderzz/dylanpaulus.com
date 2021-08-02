import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { IPost } from "../interfaces/IPost";

interface IProps {
  data: {
    node: IPost;
  };
  style?: React.CSSProperties;
}

const Container = styled.div`
  min-height: 117px;
  color: var(--font-color);
  margin-bottom: 2.4rem;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.link.font};
    transition: color 0.15s;
  }

  a:hover {
    color: ${(props) => props.theme.link.hover};
  }

  h2 {
    margin: 0;
  }
`;

export function PostListItem({ data, style = {}, ...rest }: IProps) {
  return (
    <Container style={style} {...rest}>
      <div style={{ minHeight: 24 }}>
        <span>{data.node.frontmatter.date}</span> •{" "}
        <span>{data.node.timeToRead} min</span>
      </div>

      <h2>
        <Link to={data.node.fields.slug} title={data.node.excerpt}>
          {data.node.frontmatter.title}
        </Link>
      </h2>

      <aside>{data.node.excerpt}</aside>
    </Container>
  );
}
