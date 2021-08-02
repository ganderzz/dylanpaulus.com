import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { ReactComponent as ChevronLeftIcon } from "../icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "../icons/chevron-right.svg";

interface IProps {
  totalPages: number;
  currentPage: number;
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1rem;
  border-radius: 4px;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.link.font};
    transition: color 0.15s;
  }

  a:hover {
    color: ${(props) => props.theme.link.hover};
  }

  svg {
    width: 1.4rem;
    margin-top: 0.5rem;
  }

  > * {
    padding: 0 0.4rem;
  }
`;

const ActivePage = styled.strong`
  border: 1px solid ${(props) => props.theme.link.hover};
  border-radius: 4px;
  font-weight: 500;
`;

export function Pagination({ currentPage, totalPages }: IProps) {
  return (
    <Container>
      <Link
        to={currentPage <= 2 ? "/" : `/${currentPage - 1}/`}
        aria-label="Previous"
      >
        <ChevronLeftIcon />
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageLink = i === 0 ? "/" : `/${i + 1}/`;
        const index = i + 1;

        if (index === currentPage) {
          return <ActivePage key={i}>{index}</ActivePage>;
        }

        return (
          <Link key={i} to={pageLink}>
            {index}
          </Link>
        );
      })}

      <Link
        to={
          currentPage === totalPages
            ? `/${totalPages}/`
            : `/${currentPage + 1}/`
        }
        aria-label="Next"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </Link>
    </Container>
  );
}
