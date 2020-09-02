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
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveLine } from "@nivo/line";
import {
  data2,
  data3,
  generateData,
} from "../components/Categories/calendarData2";
import { Colours } from "../styles/Colours";

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

  useEffect(() => {
    console.log(generateData());
  }, []);

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

  const handleEdit = async (id: number, data: JournalEntry) => {
    try {
      const response = await editEntry({
        variables: {
          id: id,
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
              getUserCategories: data.editEntry.categories,
            },
          });
          store.writeQuery<GetAllUserEntriesQuery>({
            query: GetAllUserEntriesDocument,
            data: {
              getAllUserEntries: data.editEntry.entries,
            },
          });
        },
      });
      if (!response) {
        alert("Failed to edit.");
        return;
      }
    } catch (err) {
      alert(err);
    }
  };

  const getCurrentDayTimestamp = (d: Date) => {
    console.log(d);
    return new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    )
      .toUTCString()
      .slice(0, 16);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome back, {body}</Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h2">
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
                  <div style={{ position: "relative", height: 438 }}>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <ResponsiveLine
                        data={data3}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{
                          type: "linear",
                          min: "auto",
                          max: "auto",
                          stacked: true,
                          reverse: false,
                        }}
                        axisTop={null}
                        axisRight={null}
                        curve="cardinal"
                        axisBottom={{
                          orient: "bottom",
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: "transportation",
                          legendOffset: 36,
                          legendPosition: "middle",
                        }}
                        axisLeft={{
                          orient: "left",
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: "count",
                          legendOffset: -40,
                          legendPosition: "middle",
                        }}
                        colors={{ scheme: "nivo" }}
                        pointSize={10}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabel="y"
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                          {
                            anchor: "right",
                            direction: "column",
                            justify: false,
                            translateX: 111,
                            translateY: -50,
                            itemsSpacing: 4,
                            itemDirection: "left-to-right",
                            itemWidth: 99,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 9,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                              {
                                on: "hover",
                                style: {
                                  itemBackground: "rgba(0, 0, 0, .03)",
                                  itemOpacity: 1,
                                },
                              },
                            ],
                          },
                        ]}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card className={classes.cards}>
              <div style={{ position: "relative", height: 275 }}>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ResponsiveCalendar
                    data={data2()}
                    from="2020-02-01"
                    to="2020-12-01"
                    emptyColor="#eeeeee"
                    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#ffffff"
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    legends={[
                      {
                        anchor: "bottom-right",
                        direction: "row",
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: "right-to-left",
                      },
                    ]}
                  />
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
