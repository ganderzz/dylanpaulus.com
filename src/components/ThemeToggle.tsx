import { useEffect, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path
      fill="white"
      fill-rule="evenodd"
      d="M12.2 2A10 10 0 005 19a10 10 0 0016.8-9.6l-1.8 1.4c-1.3 1-2.7 1.6-4 1.9-1.9.4-3.2 0-3.9-.7-.7-.7-1.1-2-.7-4 .3-1.2 1-2.6 1.9-4l1.4-1.7a10 10 0 00-2.4-.3zm5.5 15.7a8 8 0 002.2-4.5c-3.5 2-7.3 2.3-9.3.2-2-2-1.9-5.8.2-9.3a8 8 0 106.9 13.6z"
      clip-rule="evenodd"
    />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path
      fill="white"
      fill-rule="evenodd"
      d="M12 16a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 100-12 6 6 0 000 12zM11 0h2v4.06a8.08 8.08 0 00-2 0V0zM7.1 5.68L4.21 2.81 2.81 4.22 5.68 7.1c.41-.52.89-1 1.41-1.41zM4.05 11H0v2h4.06a8.08 8.08 0 010-2zm1.62 5.9l-2.87 2.88 1.41 1.41 2.87-2.87c-.52-.41-1-.89-1.41-1.41zM11 19.95V24h2v-4.06a8.07 8.07 0 01-2 0zm5.9-1.62l2.88 2.87 1.41-1.41-2.87-2.87c-.41.52-.89 1-1.41 1.41zM19.95 13H24v-2h-4.06a8.07 8.07 0 010 2zm-1.62-5.9l2.87-2.88-1.41-1.41-2.87 2.87c.52.41 1 .89 1.41 1.41z"
      clip-rule="evenodd"
    />
  </svg>
);

export const ThemeToggle: FunctionComponent = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const mode = localStorage.getItem("theme") as "dark" | "light";

    return mode ?? "light";
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
      aria-label="Toggle site's theme"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="text-white hover:text-gray-500 transition-colors relative text-xl m-0 inline-block cursor-pointer"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
