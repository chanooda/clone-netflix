import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import normalize from "styled-normalize";
import { mainTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html{
    overflow-x: hidden;
  }
  *{
    color:${(props) => props.theme.fontColor};
    box-sizing: border-box;
  }
  body{
    background-color: ${(props) => props.theme.bgColor};
  }
  li{
    list-style:none;
  }
  a{
    text-decoration:none;
    color:inherit;
  }
  div{
    display:block;
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
