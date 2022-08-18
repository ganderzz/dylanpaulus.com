import { useEffect, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";

export const ThemeToggle: FunctionComponent = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const mode = localStorage.getItem("theme");

    return (mode as "dark" | "light") ?? "light";
  });

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (!htmlElement) {
      return;
    }

    htmlElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle site theme"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="text-white hover:text-gray-500 transition-colors relative text-xl ml-3 inline-block cursor-pointer"
      style={{
        width: 24,
        height: 24,
      }}
    >
      {theme === "dark" ? (
        <img src="/icons/sun.svg" className="inline" />
      ) : (
        <img src="/icons/moon.svg" className="inline" />
      )}
    </button>
  );
};
