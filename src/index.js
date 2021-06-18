import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FFFF33",
      main: "#FFDE00",
      dark: "#CCAB00",
      contrastText: "#2E3C40",
    },
    secondary: {
      light: "#FF3333",
      main: "#FF0000",
      dark: "#CC0000",
      contrastText: "#FFF",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
