import React from "react";
import { Link } from "gatsby";

interface ISocialProps {
  title: string;
  icon: string;
  url: string;
  isExternal: boolean;
}

const socialMedia: ISocialProps[] = [
  {
    title: "Github",
    icon: "github",
    url: "https://github.com/ganderzz",
    isExternal: true,
  },
  {
    title: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/DylanPaulus",
    isExternal: true,
  },
  {
    title: "Sitemap",
    icon: "sitemap",
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
            >
              <i className={`fab fa-${item.icon}`} />
            </a>
          );
        }

        return (
          <Link
            key={item.title}
            title={item.title}
            className={socialIconClass}
            to={item.url}
          >
            <i className={`fas fa-${item.icon}`} />
          </Link>
        );
      })}
    </footer>
  );
}
