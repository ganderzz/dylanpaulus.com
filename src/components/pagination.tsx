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
          className="p-1 mr-2 no-underline font-medium"
        >
          Previous Page
        </Link>
      )}

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageLink = i === 0 ? "" : i + 1;
        const index = i + 1;

        if (index === currentPage) {
          return (
            <strong key={i} className="p-1 no-underline">
              {index}
            </strong>
          );
        }

        return (
          <Link key={i} to={`/${pageLink}`} className="p-1 no-underline">
            {index}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          to={`/${currentPage + 1}`}
          className="p-1 ml-2 no-underline font-medium"
        >
          Next Page
        </Link>
      )}
    </>
  );
}
