/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./public/**/*.{html,js,svg}",
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,css}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter var", "Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
