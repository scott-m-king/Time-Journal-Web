import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Colours } from "./styles/Colours";
import { blueGrey, cyan } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

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
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<any>(lightTheme);
  const themeState = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (themeState) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [themeState]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};
