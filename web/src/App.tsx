import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Colours } from "./styles/Colours";
import { blueGrey, cyan } from "@material-ui/core/colors";
import { useMeQuery } from "./generated/graphql";

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: Colours.primary,
      light: Colours.primaryLight,
    },
    secondary: {
      main: Colours.secondary,
      light: Colours.primary,
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[100],
      light: cyan[900],
    },
    secondary: {
      main: blueGrey[200],
      light: cyan[900],
    },
    background: {
      default: "#151C1F",
      paper: blueGrey[900],
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export const App = () => {
  const [loadPage, setLoadPage] = useState(true);
  const [theme, setTheme] = useState<any>(lightTheme);
  const { loading, data } = useMeQuery();

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoadPage(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && data && data.me) {
      if (data.me.theme === "light") {
        setTheme(lightTheme);
      } else {
        setTheme(darkTheme);
      }
    }

    setLoadPage(false);
  }, [data]);

  if (loadPage) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};
