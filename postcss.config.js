module.exports = () => ({
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    require("cssnano")({ preset: "advanced" }),
  ],
});
