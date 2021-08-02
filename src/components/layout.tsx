import React from "react";
import Header from "./header";
import { Footer } from "./footer";
import { useSiteMetadata } from "../hooks/useMetadata";
import { GlobalStyle } from "../styles";
import { ThemeContext } from "styled-components";

const Layout = ({ children }) => {
  const { title } = useSiteMetadata();
  const theme = React.useContext(ThemeContext);

  return (
    <>
      <GlobalStyle theme={theme} />

      <Header siteTitle={title} />
      <main
        style={{
          padding: "1.4rem",
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {children}

        <Footer />
      </main>
    </>
  );
};

export default Layout;
