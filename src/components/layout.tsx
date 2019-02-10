import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Header from "./header";

import "./layout.css";
import { Footer } from "./footer";

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
          
          <Footer />
        </div>
      </>
    )}
  />
);

export default Layout;
