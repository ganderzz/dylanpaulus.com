import React from "react";
import { Link } from "gatsby";

interface IProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ currentPage, totalPages }: IProps) {
  return (
    <nav className="relative z-0 inline-flex shadow-sm">
      <Link
        to={
          currentPage === 1
            ? ""
            : `/${currentPage === 2 ? "" : currentPage - 1}`
        }
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Previous"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageLink = i === 0 ? "" : i + 1;
        const index = i + 1;

        if (index === currentPage) {
          return (
            <strong
              key={i}
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-200 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              {index}
            </strong>
          );
        }

        return (
          <Link
            key={i}
            to={`/${pageLink}`}
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            {index}
          </Link>
        );
      })}

      <Link
        to={currentPage === totalPages ? "" : `/${currentPage + 1}`}
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Next"
        aria-disabled={currentPage === totalPages}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </nav>
  );
}
