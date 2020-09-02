import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Dashboard } from "./App/Dashboard";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { LandingPage } from "./LandingPage";
import { Body } from "./layouts/Body";
import { Auth } from "./layouts/Auth";
import { CreateEntry } from "./App/JournalEntries";
import { CategoryList } from "./App/CategoryList";
import { Settings } from "./App/Settings";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Auth>
              <LandingPage />
            </Auth>
          )}
        />
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
        <Route
          path="/ok/settings"
          render={() => (
            <Body>
              <Settings />
            </Body>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};
