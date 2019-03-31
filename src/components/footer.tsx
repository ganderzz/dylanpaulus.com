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
    isExternal: true
  },
  {
    title: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/DylanPaulus",
    isExternal: true
  },
  {
    title: "Sitemap",
    icon: "sitemap",
    url: "/sitemap",
    isExternal: false
  }
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        margin: "40px auto",
        paddingTop: 20,
        width: "60%",
        textAlign: "center"
      }}
    >
      {socialMedia.map(item => {
        if (item.isExternal) {
          return (
            <a
              key={item.title}
              className="social__icon"
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
            className="social__icon"
            to={item.url}
          >
            <i className={`fas fa-${item.icon}`} />
          </Link>
        );
      })}
    </footer>
  );
}
