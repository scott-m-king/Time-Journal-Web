import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
  useCreateEntryMutation,
  useGetAllUserEntriesQuery,
  useGetUserCategoriesQuery,
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
import { MostRecentWidget } from "../components/Dashboard/MostRecentWidget";
import {
  getCurrentDayTimestamp,
  generateLineGraphData,
  DataObject,
} from "../Functions/calendarData2";
import { CategoryCalendar } from "../components/Categories/CategoryCalendar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

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
  const classes = useStyles();
  const [createEntry] = useCreateEntryMutation();
  const {
    loading: entryLoading,
    data: entryData,
  } = useGetAllUserEntriesQuery();
  const {
    loading: categoryLoading,
    data: categoryData,
  } = useGetUserCategoriesQuery();
  const [calendarData, setCalendarData] = useState<
    Array<DataObject> | undefined
  >([]);
  const activeCategory = useSelector(
    (state: RootState) => state.activeCategory.selectedCategory
  );

  useEffect(() => {
    if (
      !entryLoading &&
      !categoryLoading &&
      entryData &&
      entryData.getAllUserEntries &&
      categoryData &&
      categoryData.getUserCategories
    ) {
      setCalendarData(
        generateLineGraphData(
          entryData.getAllUserEntries,
          categoryData.getUserCategories
        )
      );
    }
  }, [entryData, categoryData, entryLoading, categoryLoading]);

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
            {loading ? (
              ""
            ) : (
              <Typography variant="h4">
                Welcome back, {data?.me?.firstName}
              </Typography>
            )}
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
                      <LineGraphWidget data={calendarData} />
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
              <div style={{ position: "relative", height: 273 }}>
                <div className={classes.widgets}>
                  <CategoryCalendar
                    activeCategory={activeCategory}
                    entries={entryData?.getAllUserEntries}
                    maxHeight={250}
                    start="2020-02-01"
                    end="2020-12-31"
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <Card className={classes.cards} style={{ overflow: "auto" }}>
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
