import React from "react";
import { dashboardStyles } from "../../App/Dashboard";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";

interface TopCategoryCardProps {
  totalDuration: number | undefined;
}

export const TotalMinutesCard: React.FC<TopCategoryCardProps> = ({
  totalDuration,
}) => {
  const classes = dashboardStyles();

  return (
    <>
      <Card className={classes.cards}>
        <CardContent>
          {totalDuration !== undefined ? (
            <>
              <Typography variant="h5" component="h2" className={classes.top}>
                <b>{totalDuration}</b> minutes
              </Typography>
              <Typography variant="body2" component="p" className={classes.bot}>
                Logged in total
              </Typography>
            </>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>
    </>
  );
};
