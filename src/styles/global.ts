import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  transition: all 0.3s;
}

@import url("https://rsms.me/inter/inter.css");

@font-face {
  font-family: "Inter", sans-serif;
  font-display: swap;
}

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;

  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.025rem;
}

@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}


body {
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.font};
  font-size: 1rem;
}

figcaption {
  font-size: 0.8rem;
  opacity: 0.8;
  margin: 0 auto;
  text-align: center;
}

blockquote {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    background: rgba(200, 200, 200, 0.2);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.blog__post {
  display: grid;
  font-size: 1.2rem;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;
}

.blog__post > * {
  grid-column: 2;
}

.full-bleed {
  width: 100%;
  grid-column: 1 / -1;
}
.full-bleed .gatsby-resp-image-wrapper {
  max-width: unset !important;
}
.full-bleed .gatsby-resp-image-figure {
  padding: 0 !important;
}
`;
