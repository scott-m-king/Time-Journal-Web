import React from "react";
import { LoginForm } from "../Forms/LoginForm";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { RouteComponentProps } from "react-router-dom";
import { Auth } from "../layouts/Auth";
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";
import android_stock from "../media/android_stock.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      height: "100vh",
      background: `url(${android_stock})`,
      backgroundSize: "auto",
      backgroundRepeat: "no-repeat",
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    },
  })
);

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [login] = useLoginMutation();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<MeQuery>({
            //updating the Apollo Cache
            query: MeDocument,
            data: {
              me: data.login.user,
            },
          });
        },
      });

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }

      history.push("/ok/dashboard");
    } catch {
      alert("Invalid credentials.");
    }
  };

  return (
    <Auth>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={6} className={classes.gridItem}>
          <Typography variant="h1" style={{ color: "white", maxWidth: 600 }}>
            Time Journal
            <br />
            <Typography variant="body1" style={{ color: "white" }}>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas dignissim diam, commodo sodales dui lacinia eu. Nam
              venenatis rhoncus viverra. Aliquam efficitur, purus vitae vehicula
              congue, odio nulla dignissim ligula, ac dapibus quam tellus in
              elit. Aenean egestas tincidunt quam ac rhoncus. Vestibulum
              scelerisque ornare condimentum. Quisque porta justo felis, et
              imperdiet lacus sollicitudin a. Phasellus eu velit vitae nunc
              vehicula ullamcorper eu non est. Vestibulum eget ultricies neque.
              Sed interdum tempor ex, a maximus arcu iaculis sit amet. Morbi
              quis velit tincidunt eros efficitur iaculis quis ac enim. In enim
              lorem, luctus at pulvinar in, blandit et nisl. Nullam tristique
              eleifend velit sit amet semper. Fusce vestibulum lacus elit, ac
              malesuada libero vestibulum sed.
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <LoginForm onSubmit={handleLogin} />
        </Grid>
      </Grid>
    </Auth>
  );
};
