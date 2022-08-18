import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

import "../styles/main.css";

export const Layout = ({ children }) => (
  <>
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>

    <Header />
    <main className="p-4 sm:p-0 w-full text-base -mt-20">{children}</main>
    <Footer />
  </>
);
