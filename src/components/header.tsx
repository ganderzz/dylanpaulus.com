import { Link } from "gatsby";
import React from "react";
import { MenuLink } from "./MenuLink";

const Header = ({ siteTitle }) => (
  <header className="pt-10 h-64 bg-gray-900">
    <div className="container h-12 p-0 mx-auto flex items-center">
      <Link
        to="/"
        className="text-5xl mx-0 font-bold w-1/2 text-white no-underline hover:text-gray-500"
      >
        👱🏼 <span className="md:inline sm:hidden hidden">{siteTitle}</span>
      </Link>

      <div className="text-right w-1/2">
        <MenuLink to="/">Blog</MenuLink>
        <MenuLink to="/books">Books</MenuLink>
        <MenuLink to="/about">About</MenuLink>
      </div>
    </div>
  </header>
);

export default Header;
