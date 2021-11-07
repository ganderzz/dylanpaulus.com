import React from "react";
import { Link } from "gatsby";
import { ReactComponent as ChevronLeftIcon } from "../icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "../icons/chevron-right.svg";

interface IProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ currentPage, totalPages }: IProps) {
  return (
    <nav className="relative z-0 inline-flex shadow-sm">
      <Link
        to={currentPage <= 2 ? "/" : `/${currentPage - 1}/`}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-secondary-300 dark:border-gray-600 bg-secondary-100 text-sm leading-5 font-medium text-primary-100 hover:bg-gray-100 focus:z-10  dark:hover:bg-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-primary-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Previous"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageLink = i === 0 ? "/" : `/${i + 1}/`;
        const index = i + 1;

        if (index === currentPage) {
          return (
            <strong
              key={i}
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-secondary-300 dark:border-gray-600 bg-secondary-300 text-sm leading-5 font-medium text-primary-100 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-primary-100 active:bg-secondary-200 transition ease-in-out duration-150"
            >
              {index}
            </strong>
          );
        }

        return (
          <Link
            key={i}
            to={pageLink}
            className="-ml-px relative inline-flex items-center px-4 py-2 border border-secondary-300 dark:border-gray-600 bg-secondary-100 text-sm leading-5 font-medium text-primary-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-primary-100 active:bg-secondary-200 transition ease-in-out duration-150"
          >
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
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-secondary-300 dark:border-gray-600 bg-secondary-100 text-sm leading-5 font-medium text-primary-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-primary-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Next"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Link>
    </nav>
  );
}
