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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3C7.89543 3 7 3.89543 7 5C7 5.74028 7.4022 6.38663 8 6.73244V17.2676C7.4022 17.6134 7 18.2597 7 19C7 20.1046 7.89543 21 9 21C9.74028 21 10.3866 20.5978 10.7324 20H11.9585C14.1676 20 15.9585 18.2091 15.9585 16V14.7324C16.5563 14.3866 16.9585 13.7403 16.9585 13C16.9585 11.8954 16.0631 11 14.9585 11C13.8539 11 12.9585 11.8954 12.9585 13C12.9585 13.7403 13.3607 14.3866 13.9585 14.7324V16C13.9585 17.1046 13.0631 18 11.9585 18H10.7324C10.5568 17.6964 10.3036 17.4432 10 17.2676V6.73244C10.5978 6.38663 11 5.74028 11 5C11 3.89543 10.1046 3 9 3Z"
          fill="currentColor"
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
          fill-rule="evenodd"
          clip-rule="evenodd"
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
          fill-rule="evenodd"
          clip-rule="evenodd"
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
    <footer className="w-3/5 pt-10 text-center border-t border-solid mx-auto mt-16">
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
