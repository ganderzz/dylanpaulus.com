import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Header from "./header";
import { Footer } from "./footer";

import "../styles/main.css";

const Layout = ({ children, className = "" }) => (
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
    render={({ site }: { site: { siteMetadata: { title: string } } }) => (
      <>
        <Header siteTitle={site.siteMetadata.title} />

        <main className={`p-4 sm:p-0 w-full text-base -mt-20 ${className}`}>
          {children}

          <Footer />
        </main>
      </>
    )}
  />
);

export default Layout;
