import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Dashboard } from "./App/Dashboard";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { LandingPage } from "./LandingPage";
import { Body } from "./layouts/Body";
import { Auth } from "./layouts/Auth";

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
        <Route
          path="/ok/dashboard"
          render={() => (
            <Body>
              <Dashboard />
            </Body>
          )}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};
