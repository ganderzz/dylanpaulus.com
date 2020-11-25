import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Header from "./header";
import { Footer } from "./footer";

import "../styles/main.css";

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
    render={(data) => (
      <section>
        <Header siteTitle={data.site.siteMetadata.title} />

        <main className="w-full text-base -mt-20">
          {children}

          <Footer />
        </main>
      </section>
    )}
  />
);

export default Layout;
