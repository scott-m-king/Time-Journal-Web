import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Header: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const classes = useStyles();

  let body: any = undefined;

  if (!loading && data && data.me) {
    body = data.me;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} style={{background: "#0a80cc"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {body !== undefined ? (
              <Link to="/ok/dashboard" style={{ textDecoration: "none", color: "white" }}>
                Time Journal
              </Link>
            ) : (
              <Link
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Time Journal
              </Link>
            )}
          </Typography>
          {body !== undefined ? (
            <Button
              variant="contained"
              onClick={async () => {
                await logout();
                await client!.resetStore();
                setAccessToken("");
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          ) : (
            <Button variant="contained">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
