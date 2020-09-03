import React from "react";
import { dashboardStyles } from "../../App/Dashboard";
import { Card, CardContent, Typography } from "@material-ui/core";

interface WeeklyEntriesCardProps {}

export const WeeklyEntriesCard: React.FC<WeeklyEntriesCardProps> = ({}) => {
  const classes = dashboardStyles();

  return (
    <>
      <Card className={classes.cards}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.top}>
            <b>5</b> Entries
          </Typography>
          <Typography variant="body2" component="p" className={classes.bot}>
            Entered in the last week
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
