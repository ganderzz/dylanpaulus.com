import { useState, useEffect } from "react";

type Theme = "light" | "dark";

function useTheme() {
  const preferDarkSchema =
    typeof window !== "undefined"
      ? window?.matchMedia("(prefers-color-scheme: dark)").matches ?? false
      : false;

  const defaultTheme = preferDarkSchema ? "dark" : "light";

  const [theme, setTheme] = useState<Theme>(
    (typeof localStorage !== "undefined"
      ? localStorage.getItem("theme") ?? defaultTheme
      : defaultTheme) as Theme
  );

  const onThemeChange = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  return { theme, setTheme: onThemeChange };
}

export default useTheme;
