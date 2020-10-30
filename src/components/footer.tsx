import React from "react";
import { Link } from "gatsby";
import { ReactComponent as TwitterIcon } from "../icons/twitter.svg";
import { ReactComponent as GithubIcon } from "../icons/github.svg";
import { ReactComponent as SitemapIcon } from "../icons/sitemap.svg";

interface ISocialProps {
  title: string;
  icon: any;
  url: string;
  isExternal: boolean;
}

const socialMedia: ISocialProps[] = [
  {
    title: "Github",
    icon: <GithubIcon />,
    url: "https://github.com/ganderzz",
    isExternal: true,
  },
  {
    title: "Twitter",
    icon: <TwitterIcon />,
    url: "https://twitter.com/DylanPaulus",
    isExternal: true,
  },
  {
    title: "Sitemap",
    icon: <SitemapIcon />,
    url: "/sitemap/",
    isExternal: false,
  },
];

const socialIconClass =
  "hover:opacity-100 mr-12 opacity-75 text-5xl inline-block";

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
          >
            {item.icon}
          </Link>
        );
      })}
    </footer>
  );
}
