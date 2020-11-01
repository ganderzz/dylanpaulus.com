import { Link } from "gatsby";
import React from "react";
import { MenuLink } from "./menuLink";
import { ReactComponent as Logo } from "../../static/logo.svg";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as SunIcon } from "../icons/sun.svg";
import useTheme from "../hooks/useTheme";

const Header = ({ siteTitle }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="pt-10 h-64">
      <div className="z-10 relative container md:max-w-none mx-auto md:w-full lg:w-11/12 lg:mx-auto h-12 pl-2 pr-2 flex items-center">
        <Link
          to="/"
          title={siteTitle}
          className="text-5xl mx-0 font-bold lg:w-1/2 w-1/4 text-white no-underline hover:text-gray-500 transition-all"
        >
          <Logo style={{ maxWidth: 350, minWidth: 120, width: "100%" }} />
        </Link>

        <nav role="navigation" className="text-right lg:w-1/2 w-3/4 z-10">
          <MenuLink to="/">Blog</MenuLink>
          <MenuLink to="/about">About</MenuLink>

          <a
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:text-gray-500 transition-colors text-xl ml-3 relative inline-block cursor-pointer"
            style={{
              top: 5,
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </a>
        </nav>
      </div>

      <div aria-hidden="true" className="skewed bg-gray-900" />
    </header>
  );
};

export default Header;
