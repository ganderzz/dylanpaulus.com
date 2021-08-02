import { Link } from "gatsby";
import React from "react";
import stylized from "styled-components";
import { MenuLink } from "./menuLink";
import { ReactComponent as Logo } from "../../static/logo.svg";
import { ThemeToggle } from "./themeToggle";
import { Search } from "./search";

const Container = stylized.header`
  display: flex;
  flexFlow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.font};
`;

const Header = ({ siteTitle }) => {
  return (
    <Container>
      <Link to="/" title={siteTitle}>
        <Logo style={{ maxWidth: 350, minWidth: 120, width: "100%" }} />
      </Link>

      <nav
        role="navigation"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Search />

        <MenuLink to="/">Blog</MenuLink>
        <MenuLink to="/about">About</MenuLink>

        <ThemeToggle />
      </nav>
    </Container>
  );
};

export default React.memo(Header);
