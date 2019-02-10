import React from "react";
import { Link } from "gatsby";

interface IProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ currentPage, totalPages }: IProps) {
  return (
    <>
      {currentPage > 1 && (
        <Link
          to={`/${currentPage === 2 ? "" : currentPage - 1}`}
          style={{ padding: 5 }}
        >
          Previous Page
        </Link>
      )}

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageLink = i === 0 ? "" : i + 1;
        const index = i + 1;

        if (index === currentPage) {
          return (
            <strong key={i} style={{ padding: 5 }}>
              {index}
            </strong>
          );
        }

        return (
          <Link key={i} to={`/${pageLink}`} style={{ padding: 5 }}>
            {index}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link to={`/${currentPage + 1}`} style={{ padding: 5 }}>
          Next Page
        </Link>
      )}
    </>
  );
}
