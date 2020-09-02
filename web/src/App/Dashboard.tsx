import React, { useEffect } from "react";
import {
  useMeQuery,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
  useCreateEntryMutation,
  useEditEntryMutation,
} from "../generated/graphql";
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@material-ui/core";
import styled from "styled-components";
import { CreateEntryForm } from "../Forms/CreateEntryForm";
import { JournalEntry } from "../redux/types";
import { LineGraphWidget } from "../components/Dashboard/LineGraphWidget";
import { CalendarWidget } from "../components/Dashboard/CalendarWidget";
import { MostRecentWidget } from "../components/Dashboard/MostRecentWidget";
import { getCurrentDayTimestamp } from "../Functions/calendarData2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cards: {
      textAlign: "center",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    top: {
      marginTop: 12,
    },
    bot: {
      marginBottom: 12,
    },
    paper: {
      padding: theme.spacing(2),
    },
    headers: {
      textAlign: "left",
      paddingLeft: 20,
      paddingTop: 15,
    },
    widgets: {
      position: "absolute",
      width: "100%",
      height: "100%",
      paddingBottom: 15,
    },
  })
);

const Layout = styled.div`
  display: flex;
  min-height: 100%;
  min-width: 100%;
`;

export const Dashboard = () => {
  const { data, loading } = useMeQuery();
  let body: any = null;
  const classes = useStyles();
  const [createEntry] = useCreateEntryMutation();
  const [editEntry] = useEditEntryMutation();

  if (loading) {
    body = "loading...";
  } else if (data && data.me) {
    body = data.me.firstName;
  } else {
    body = "";
  }

  const handleSubmit = async (data: JournalEntry) => {
    try {
      const response = await createEntry({
        variables: {
          categoryId: data.categoryId,
          title: data.title,
          notes: data.notes,
          duration: data.duration,
          date: getCurrentDayTimestamp(new Date(data.date)),
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<GetUserCategoriesQuery>({
            query: GetUserCategoriesDocument,
            data: {
              getUserCategories: data.createEntry.categories,
            },
          });
          store.writeQuery<GetAllUserEntriesQuery>({
            query: GetAllUserEntriesDocument,
            data: {
              getAllUserEntries: data.createEntry.entries,
            },
          });
        },
      });
      if (!response) {
        alert("Failed to add.");
        return;
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = async (id: number, data: JournalEntry) => {};

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome back, {body}</Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" component="h4">
                Quick-add Journal Entry
              </Typography>
              <CreateEntryForm onEdit={handleEdit} onSubmit={handleSubmit} />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Card className={classes.cards}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.top}
                    >
                      <b>16</b> Entries
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.bot}
                    >
                      Entered in total
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Card className={classes.cards}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.top}
                    >
                      <b>5</b> Entries
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.bot}
                    >
                      Entered in the last week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Card className={classes.cards}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.top}
                    >
                      <b>School</b>
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.bot}
                    >
                      Most time spent in this category
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card className={classes.cards}>
                  <Typography
                    variant="h6"
                    component="h4"
                    className={classes.headers}
                  >
                    Entries in 2020
                  </Typography>
                  <div style={{ position: "relative", height: 392 }}>
                    <div className={classes.widgets}>
                      <LineGraphWidget />
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
            <Card className={classes.cards}>
              <Typography
                variant="h6"
                component="h4"
                className={classes.headers}
              >
                Entries per day
              </Typography>
              <div style={{ position: "relative", height: 235 }}>
                <div className={classes.widgets}>
                  <CalendarWidget />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <Card
              className={classes.cards}
              style={{ maxHeight: 282, overflow: "auto" }}
            >
              <Typography
                variant="h6"
                component="h4"
                className={classes.headers}
              >
                Most Recent
              </Typography>
              <MostRecentWidget />
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
