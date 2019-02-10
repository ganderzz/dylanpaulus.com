import { Link } from "gatsby";
import React from "react";

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#2b2e33`,
      marginBottom: `#fff`,
      paddingTop: 10,
      height: 200
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 2fr",
        alignItems: "center",
        height: 70,
        maxWidth: 1200,
        width: "90%",
        padding: 0,
        margin: "0 auto",
        color: "#FFF"
      }}
    >
      <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: 700 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <div className="main__menu" style={{ textAlign: "right" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  </header>
);

export default Header;
