import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  useMeQuery,
  useLogoutMutation,
  useUpdateUserThemeMutation,
  MeQuery,
  MeDocument,
} from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import HistoryIcon from "@material-ui/icons/History";
import { Switch } from "@material-ui/core";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

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
  const [updateTheme] = useUpdateUserThemeMutation();

  let body: any = undefined;

  if (!loading && data && data.me) {
    body = data.me;
  }

  const handleChange = async () => {
    try {
      checked ? await changeTheme("light") : await changeTheme("dark");
      setChecked(!checked);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (!loading && data && data.me !== undefined && data.me !== null) {
      if (data.me.theme === "light") {
        setChecked(false);
      }

      if (data.me.theme === "dark") {
        setChecked(true);
      }
    }
  }, [loading]);

  const changeTheme = async (theme: string) => {
    try {
      await updateTheme({
        variables: {
          theme: theme,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }

          let hack = {
            id: data.updateUserTheme.id,
            email: data.updateUserTheme.email,
            firstName: data.updateUserTheme.firstName,
            lastName: data.updateUserTheme.lastName,
            theme: data.updateUserTheme.theme === "light" ? "dark" : "light",
          };

          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: hack,
            },
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

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
              {checked ? (
                <BrightnessLowIcon color="secondary" />
              ) : (
                <BrightnessHighIcon color="inherit" />
              )}
              <Switch checked={checked} onChange={handleChange} />
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
