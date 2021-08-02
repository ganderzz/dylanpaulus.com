import React from "react";
import styled from "styled-components";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as SunIcon } from "../icons/sun.svg";
import useTheme from "../hooks/useTheme";
import { useStyledDarkMode } from "gatsby-styled-components-dark-mode";

const ThemeLink = styled.a`
  margin-top: 5px;
  margin-right: 8px;
  margin-left: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #fff;
`;

export function ThemeToggle() {
  const { isDark, toggleDark } = useStyledDarkMode();

  return (
    <ThemeLink
      onClick={() => {
        toggleDark(!isDark);
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </ThemeLink>
  );
}
