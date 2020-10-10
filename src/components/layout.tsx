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
      <section className="max-w-screen-xl mx-auto">
        <Header siteTitle={data.site.siteMetadata.title} />

        <main
          className="main-content container mx-auto md:w-full lg:w-5/6 -mt-32"
          style={{ fontSize: "1rem" }}
        >
          <section className="mx-auto">{children}</section>

          <Footer />
        </main>
      </section>
    )}
  />
);

export default Layout;
