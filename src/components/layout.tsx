import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Header from "./header";
import { Footer } from "./footer";

import "../styles/main.css";

const Layout = ({ children }) => (
  <div>
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
        <div>
          <Header siteTitle={data.site.siteMetadata.title} />
          <main className="main-content container mx-auto -mt-32 sm:p-16 p-6 pt-10 text-2xl">
            <section>{children}</section>

            <Footer />
          </main>
        </div>
      )}
    />
  </div>
);

export default Layout;
