import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Header from "./header";

import "./layout.css";

interface ISocialProps {
  title: string;
  icon: string;
  url: string;
}

const socialMedia: ISocialProps[] = [
  {
    title: "Github",
    icon: "github",
    url: "https://github.com/ganderzz"
  },
  {
    title: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/DylanPaulus"
  },
  {
    title: "Stack Overflow",
    icon: "stack-overflow",
    url: "https://stackoverflow.com/users/7828585/dpaulus"
  },
  {
    title: "Linkedin",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/dylanpaulus"
  }
];

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: "-130px auto auto auto",
            maxWidth: 1200,
            width: "90%",
            background: "#FFF",
            padding: `40px 60px`
          }}
        >
          <main>{children}</main>
          <footer
            style={{
              borderTop: "1px solid #ddd",
              margin: "40px auto",
              paddingTop: 20,
              width: "60%",
              textAlign: "center"
            }}
          >
            {socialMedia.map(item => (
              <a className="social__icon" href={item.url} title={item.title}>
                <i className={`fab fa-${item.icon}`} />
              </a>
            ))}
          </footer>
        </div>
      </>
    )}
  />
);

export default Layout;
