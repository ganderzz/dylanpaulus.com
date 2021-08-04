import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  transition: background 0.2s color 0.2s;
}

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

`;
