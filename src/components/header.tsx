import { Link } from "gatsby";
import React from "react";
import { MenuLink } from "./menuLink";
import { ReactComponent as Logo } from "../../static/logo.svg";
import { ThemeToggle } from "./themeToggle";
import { Search } from "./search";

const Header = ({ siteTitle }) => {
  return (
    <header className="pt-10 pl-2 pr-2 h-64 max-w-screen-xl mx-auto">
      <div className="z-10 relative container md:max-w-none mx-auto md:w-full lg:mx-auto h-12 flex items-center">
        <Link
          to="/"
          title={siteTitle}
          className="text-5xl mx-0 font-bold lg:w-1/2 w-1/4 text-white no-underline hover:text-gray-500 transition-all"
        >
          <Logo style={{ maxWidth: 350, minWidth: 120, width: "100%" }} />
        </Link>

        <nav role="navigation" className="text-right lg:w-1/2 w-3/4 z-10">
          <Search className="mr-4" />

          <MenuLink to="/">Blog</MenuLink>
          <MenuLink to="/about">About</MenuLink>

          <ThemeToggle />
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="skewed bg-gray-900"
        style={{
          backgroundImage:
            "linear-gradient(524deg, rgba(228, 228, 228,0.04) 0%, rgba(228, 228, 228,0.04) 30%,rgba(130, 130, 130,0.04) 30%, rgba(130, 130, 130,0.04) 49%,rgba(31, 31, 31,0.04) 49%, rgba(31, 31, 31,0.04) 100%),linear-gradient(538deg, rgba(228, 228, 228,0.04) 0%, rgba(228, 228, 228,0.04) 20%,rgba(130, 130, 130,0.04) 20%, rgba(130, 130, 130,0.04) 60%,rgba(31, 31, 31,0.04) 60%, rgba(31, 31, 31,0.04) 100%),linear-gradient(483deg, rgba(228, 228, 228,0.04) 0%, rgba(228, 228, 228,0.04) 29%,rgba(130, 130, 130,0.04) 29%, rgba(130, 130, 130,0.04) 48%,rgba(31, 31, 31,0.04) 48%, rgba(31, 31, 31,0.04) 100%),linear-gradient(331deg, rgb(17,24,39),rgb(17,24,39))",
        }}
      />
    </header>
  );
};

export default React.memo(Header);
