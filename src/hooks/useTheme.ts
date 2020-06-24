import { useState, useLayoutEffect } from "react";

const preferDarkSchema =
  (window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  false;
const defaultTheme = preferDarkSchema ? "dark" : "light";

function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || defaultTheme
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export default useTheme;
