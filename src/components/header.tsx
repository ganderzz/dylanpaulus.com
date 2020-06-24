import { Link } from "gatsby";
import React from "react";
import { MenuLink } from "./menuLink";
import useTheme from "../hooks/useTheme";

const Header = ({ siteTitle }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="pt-10 h-64 bg-gray-900">
      <div className="container md:max-w-none md:mx-0 md:w-full lg:w-5/6 lg:mx-auto h-12 p-0 flex items-center">
        <Link
          to="/"
          className="text-5xl mx-0 font-bold w-1/2 text-white no-underline hover:text-gray-500"
        >
          <span className="md:inline">{siteTitle}</span>
        </Link>

        <div className="text-right w-1/2">
          <MenuLink to="/">Blog</MenuLink>
          <MenuLink to="/about">About</MenuLink>

          <a
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              color: "#FFF",
              fontSize: "1.3rem",
              marginLeft: 10,
              cursor: "pointer",
            }}
          >
            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
