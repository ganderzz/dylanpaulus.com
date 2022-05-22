import React from "react";

const applyDarkModeClass = `
(function () {
  try {
    var mode = localStorage.getItem("theme");
    var supportDarkMode =
      window.matchMedia("(prefers-color-scheme: dark)").matches === true;
    if (!mode && supportDarkMode) {
      document.body.classList.add("dark");
      document.documentElement.dataset.theme = "dark";

      return;
    }

    if (!mode) {
      return;
    }

    document.body?.classList.add(mode);
    document.documentElement.dataset.theme = mode;
  } catch (e) {
    console.error(e);
  }
})();
`;

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: applyDarkModeClass,
      }}
    />,
  ]);
};
