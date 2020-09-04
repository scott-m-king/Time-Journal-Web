import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import { useMeQuery } from "../generated/graphql";
import { Link } from "react-router-dom";
import { Colours } from "../styles/Colours";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
    iconic: {
      color: theme.palette.secondary.main,
    },
  })
);

export const Sidebar = () => {
  const classes = useStyles();
  const { data, loading } = useMeQuery();

  let body: any = undefined;

  if (!loading && data && data.me) {
    body = data.me;
  }

  const routes1 = ["/ok/dashboard"];
  const routes2 = ["/ok/create_entry", "/ok/category_list", "/ok/settings"];

  const icons = (index: number) => {
    switch (index) {
      case 0:
        return <MenuBookIcon />;
      case 1:
        return <ListIcon />;
      default:
        return <SettingsIcon />;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {!loading && body !== undefined ? (
        <div>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                {["Dashboard"].map((text, index) => (
                  <Link
                    to={routes1[index]}
                    className={classes.link}
                    key={index}
                  >
                    <ListItem button key={index}>
                      <ListItemIcon className={classes.iconic}>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                ))}
              </List>
              <Divider />
              <List>
                {["Journal Entries", "Categories", "Account Settings"].map(
                  (text, index) => (
                    <Link
                      to={routes2[index]}
                      className={classes.link}
                      key={index}
                    >
                      <ListItem button key={index}>
                        <ListItemIcon className={classes.iconic}>
                          {icons(index)}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                )}
              </List>
            </div>
          </Drawer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
