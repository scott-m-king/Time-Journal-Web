import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./App/Dashboard";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Body } from "./layouts/Body";
import { CreateEntry } from "./App/JournalEntries";
import { CategoryList } from "./App/CategoryList";
import { Settings } from "./App/Settings";
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
      secondary: blueGrey[200],
    },
  },
});

export const Routes: React.FC = () => {
  const [theme, setTheme] = useState<any>(lightTheme);
  const { loading, data } = useMeQuery();

  useEffect(() => {
    updateTheme();
  }, [data, loading]);

  const updateTheme = () => {
    if (
      !loading &&
      data !== undefined &&
      data.me !== null &&
      data.me !== undefined
    ) {
      if (data.me.theme === "light") {
        setTheme(lightTheme);
      }

      if (data.me.theme === "dark") {
        setTheme(darkTheme);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/ok/dashboard"
            render={() => (
              <Body>
                <Dashboard />
              </Body>
            )}
          />
          <Route
            path="/ok/create_entry"
            render={() => (
              <Body>
                <CreateEntry />
              </Body>
            )}
          />
          <Route
            path="/ok/category_list"
            render={() => (
              <Body>
                <CategoryList />
              </Body>
            )}
          />
          {/* <Route
            path="/ok/settings"
            render={() => (
              <Body>
                <Settings />
              </Body>
            )}
          /> */}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};
