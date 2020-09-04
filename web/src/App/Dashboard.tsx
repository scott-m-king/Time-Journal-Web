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
  Grid,
  Paper,
} from "@material-ui/core";
import styled from "styled-components";
import { CreateEntryForm } from "../Forms/CreateEntryForm";
import { JournalEntry } from "../redux/types";
import { LineGraphWidget } from "../components/Dashboard/LineGraphWidget";
import { TopFiveWidget } from "../components/Dashboard/TopFiveWidget";
import {
  getCurrentDayTimestamp,
  generateLineGraphData,
  DataObject,
} from "../Functions/dataProcessing";
import { CategoryCalendar } from "../components/Categories/CategoryCalendar";
import { TotalEntriesCard } from "../components/Dashboard/TotalEntriesCard";
import { EmojiCard } from "../components/Dashboard/EmojiCard";
import { TotalMinutesCard } from "../components/Dashboard/TotalMinutesCard";

export const dashboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cards: {
      textAlign: "center",
      height: 115,
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
  const classes = dashboardStyles();
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
  const [numEntries, setNumEntries] = useState<number | undefined>(undefined);
  const [totalMinutes, setTotalMinutes] = useState<number | undefined>(
    undefined
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
      if (entryData.getAllUserEntries.length === 0) {
        setTotalMinutes(0);
        setNumEntries(0);
      } else {
        let num = entryData.getAllUserEntries.reduce((acc, cur) => ({
          title: "",
          id: 0,
          date: "",
          notes: "",
          categoryId: 0,
          duration: acc.duration + cur.duration,
        })).duration;
        console.log(num);

        setTotalMinutes(num);
        setNumEntries(entryData.getAllUserEntries.length);
      }
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
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                style={{ textAlign: "center" }}
              >
                <TotalEntriesCard numEntries={numEntries} />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <TotalMinutesCard totalDuration={totalMinutes} />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <EmojiCard />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
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
            <Card>
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
                    activeCategory={undefined}
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
            <Card style={{ height: 320, overflow: "auto" }}>
              <Typography
                variant="h6"
                component="h4"
                className={classes.headers}
              >
                Top 5 Categories
              </Typography>
              <TopFiveWidget categoryList={categoryData?.getUserCategories} />
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
