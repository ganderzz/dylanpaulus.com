import React from "react";
import { Link } from "gatsby";
import stylized from "styled-components";
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
  {
    title: "RSS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    ),
    url: "/rss.xml",
    isExternal: true,
  },
];

const Container = stylized.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.border};
  margin: 40px auto 0 auto;
  padding-top: 1rem;

  > * {
    margin: 0 1rem;
  }

  a, a:visited {
    color: ${(props) => props.theme.link.font};
    transition: color 0.2s;
  }

  a:hover {
    color: ${(props) => props.theme.link.hover};
  }
`;

export function Footer() {
  return (
    <Container>
      {socialMedia.map((item) => {
        if (item.isExternal) {
          return (
            <a key={item.title} href={item.url} title={item.title}>
              {item.icon}
            </a>
          );
        }

        return (
          <Link key={item.title} title={item.title} to={item.url}>
            {item.icon}
          </Link>
        );
      })}
    </Container>
  );
}
