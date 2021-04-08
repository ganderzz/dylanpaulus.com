import React from "react";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as SunIcon } from "../icons/sun.svg";
import useTheme from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <a
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="text-white hover:text-gray-500 transition-colors relative text-xl ml-3 inline-block cursor-pointer"
      style={{
        top: 5,
        width: 24,
        height: 24,
      }}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </a>
  );
}
