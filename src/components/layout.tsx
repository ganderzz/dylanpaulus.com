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
      <section className="max-w-screen-xl md:max-w-none mx-auto">
        <Header siteTitle={data.site.siteMetadata.title} />

        <main className="main-content container md:max-w-none mx-auto md:w-full lg:w-5/6 -mt-32 sm:p-16 p-6 pt-10 text-2xl">
          <section className="mx-auto">{children}</section>

          <Footer />
        </main>
      </section>
    )}
  />
);

export default Layout;
