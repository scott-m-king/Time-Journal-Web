import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import HistoryIcon from "@material-ui/icons/History";
import { Switch } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: theme.palette.secondary.light,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      paddingTop: 6,
    },
  })
);

export const Header: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  let body: any = undefined;

  if (!loading && data && data.me) {
    body = data.me;
  }

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    dispatch(setTheme(checked));
  }, [checked]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {body !== undefined ? (
              <Link
                to="/ok/dashboard"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <HistoryIcon fontSize="large" />
              </Link>
            ) : (
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <HistoryIcon fontSize="large" />
              </Link>
            )}
          </Typography>
          {body !== undefined ? (
            <>
              <Switch
                checked={checked}
                onChange={handleChange}
                color="primary"
              />
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
            </>
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
