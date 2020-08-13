import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { Login } from "./Login";
import { SignupForm } from "./SignupForm";
import { Signup } from "./Signup";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};
