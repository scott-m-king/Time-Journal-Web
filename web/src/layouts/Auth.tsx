import React from "react";
import styled from "styled-components";
import {
  CssBaseline,
  Grid,
  Hidden,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Header } from "../components/Layout/Header";
import android_stock from "../media/android_stock.jpg";

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      height: "100vh",
      background: `url(${android_stock})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    },
    paper: {},
  })
);

export const Auth: React.FC<any> = ({ children, page }) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <CssBaseline />
      <Root>
        <Grid container className={classes.gridContainer}>
          <Hidden only={["xs", "sm", "md"]}>
            <Grid
              item
              lg={6}
              xl={6}
              className={classes.gridItem}
              style={{
                alignItems: "flex-start",
                overflowY: "scroll",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={4}
                style={{ maxWidth: 650, paddingTop: 175, paddingBottom: 175 }}
              >
                <Grid item>
                  <Typography
                    variant="h1"
                    style={{
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Time Journal
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    style={{ color: "white", textAlign: "center" }}
                  >
                    An application to keep track of where you spend your time.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    style={{ color: "white", textAlign: "left" }}
                  >
                    <br />
                    Have you ever had a week go by and by the end of it, realize
                    that you have no idea what you did that week? By keeping
                    track of how we spend our time, we can take control of our
                    actions to live more productive and well-balanced lives.
                    <br />
                    <br />
                    <i>
                      <b>Why Journaling?</b>
                    </i>
                    <br /> Research has shown that journaling can have powerful
                    mental health benefits and act as a documentation tool for
                    everyday life. Time Journal takes journaling a step further
                    by allowing you to record how much time you spend on the
                    activities and organize them into meaningful categories.{" "}
                    <br />
                    <br />
                    <i>
                      <b>How does it work?</b>
                    </i>
                    <br /> You will be able to create categories for your
                    activities and see how much time you spend on each one. This
                    application will combine common approaches to journaling and
                    budgeting to create visibility into where your time goes.
                    <br />
                    Have you ever had a week go by and by the end of it, realize
                    that you have no idea what you did that week? By keeping
                    track of how we spend our time, we can take control of our
                    actions to live more productive and well-balanced lives.
                    <br />
                    <br />
                    <i>
                      <b>Why Journaling?</b>
                    </i>
                    <br /> Research has shown that journaling can have powerful
                    mental health benefits and act as a documentation tool for
                    everyday life. Time Journal takes journaling a step further
                    by allowing you to record how much time you spend on the
                    activities and organize them into meaningful categories.{" "}
                    <br />
                    <br />
                    <i>
                      <b>How does it work?</b>
                    </i>
                    <br /> You will be able to create categories for your
                    activities and see how much time you spend on each one. This
                    application will combine common approaches to journaling and
                    budgeting to create visibility into where your time goes.
                    <br />
                    Have you ever had a week go by and by the end of it, realize
                    that you have no idea what you did that week? By keeping
                    track of how we spend our time, we can take control of our
                    actions to live more productive and well-balanced lives.
                    <br />
                    <br />
                    <i>
                      <b>Why Journaling?</b>
                    </i>
                    <br /> Research has shown that journaling can have powerful
                    mental health benefits and act as a documentation tool for
                    everyday life. Time Journal takes journaling a step further
                    by allowing you to record how much time you spend on the
                    activities and organize them into meaningful categories.{" "}
                    <br />
                    <br />
                    <i>
                      <b>How does it work?</b>
                    </i>
                    <br /> You will be able to create categories for your
                    activities and see how much time you spend on each one. This
                    application will combine common approaches to journaling and
                    budgeting to create visibility into where your time goes.
                    <br />
                    Have you ever had a week go by and by the end of it, realize
                    that you have no idea what you did that week? By keeping
                    track of how we spend our time, we can take control of our
                    actions to live more productive and well-balanced lives.
                    <br />
                    <br />
                    <i>
                      <b>Why Journaling?</b>
                    </i>
                    <br /> Research has shown that journaling can have powerful
                    mental health benefits and act as a documentation tool for
                    everyday life. Time Journal takes journaling a step further
                    by allowing you to record how much time you spend on the
                    activities and organize them into meaningful categories.{" "}
                    <br />
                    <br />
                    <i>
                      <b>How does it work?</b>
                    </i>
                    <br /> You will be able to create categories for your
                    activities and see how much time you spend on each one. This
                    application will combine common approaches to journaling and
                    budgeting to create visibility into where your time goes.
                    <br />
                    Have you ever had a week go by and by the end of it, realize
                    that you have no idea what you did that week? By keeping
                    track of how we spend our time, we can take control of our
                    actions to live more productive and well-balanced lives.
                    <br />
                    <br />
                    <i>
                      <b>Why Journaling?</b>
                    </i>
                    <br /> Research has shown that journaling can have powerful
                    mental health benefits and act as a documentation tool for
                    everyday life. Time Journal takes journaling a step further
                    by allowing you to record how much time you spend on the
                    activities and organize them into meaningful categories.{" "}
                    <br />
                    <br />
                    <i>
                      <b>How does it work?</b>
                    </i>
                    <br /> You will be able to create categories for your
                    activities and see how much time you spend on each one. This
                    application will combine common approaches to journaling and
                    budgeting to create visibility into where your time goes.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            className={classes.gridItem}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              spacing={4}
              style={{ paddingBottom: 30 }}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  style={{ color: "white", maxWidth: 600, textAlign: "center" }}
                >
                  {page}
                </Typography>
              </Grid>
              <Grid item>{children}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Root>
    </>
  );
};
