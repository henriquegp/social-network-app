import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: Roboto, sans-serif;
  }

  html, :root {
    font-size: 62.5%;
  }

  html, body {
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    background: ${(props) => props.theme.bodyBackground};
  }

  body {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color};
  }
`;

export default GlobalStyle;
