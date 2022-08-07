import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

import "../styles/main.css";

const Layout = ({ children, className = "" }) => (
  <>
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
    <Header />

    <main className={`p-4 sm:p-0 w-full text-base -mt-20 ${className}`}>{children}</main>

    <Footer />
  </>
);

export default Layout;
