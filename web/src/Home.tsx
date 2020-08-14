import React from "react";
import { useMeQuery } from "./generated/graphql";
import {
  makeStyles,
  Theme,
  createStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export const Home = () => {
  const { data, loading } = useMeQuery();
  let body: any = null;
  const classes = useStyles();

  if (loading) {
    body = "loading...";
  } else if (data && data.me) {
    body = data.me.firstName;
  } else {
    body = "undefined";
  }
  return (
    <main className={classes.content}>
      <Typography variant="h4">Welcome back, {body}</Typography>
    </main>
  );
};
