import React from "react";
import { Link } from "gatsby";

interface ISocialProps {
  title: string;
  icon: any;
  url: string;
  isExternal: boolean;
}

const socialMedia: ISocialProps[] = [
  {
    title: "Github",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="24px"
        height="24px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    url: "https://github.com/ganderzz",
    isExternal: true,
  },
  {
    title: "Twitter",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 3C9.10457 3 10 3.89543 10 5V8H16C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12H10V14C10 15.6569 11.3431 17 13 17H16C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21H13C9.13401 21 6 17.866 6 14V5C6 3.89543 6.89543 3 8 3Z"
          fill="currentColor"
        />
      </svg>
    ),
    url: "https://twitter.com/DylanPaulus",
    isExternal: true,
  },
  {
    title: "Sitemap",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 1H1V9H9V6H11V20H15V23H23V15H15V18H13V6H15V9H23V1H15V4H9V1ZM21 3H17V7H21V3ZM17 17H21V21H17V17Z"
          fill="currentColor"
        />
      </svg>
    ),
    url: "/sitemap",
    isExternal: false,
  },
];

const socialIconClass = "hover:opacity-100 mr-12 opacity-75 text-5xl";

export function Footer() {
  return (
    <footer className="w-3/5 pt-10 pb-10 text-center border-t border-solid mx-auto mt-8">
      {socialMedia.map((item) => {
        if (item.isExternal) {
          return (
            <a
              key={item.title}
              className={socialIconClass}
              href={item.url}
              title={item.title}
              style={{ display: "inline-block" }}
            >
              {item.icon}
            </a>
          );
        }

        return (
          <Link
            key={item.title}
            title={item.title}
            className={socialIconClass}
            to={item.url}
            style={{ display: "inline-block" }}
          >
            {item.icon}
          </Link>
        );
      })}
    </footer>
  );
}
