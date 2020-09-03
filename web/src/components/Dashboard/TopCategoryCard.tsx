import React from "react";
import { dashboardStyles } from "../../App/Dashboard";
import { Card, CardContent, Typography } from "@material-ui/core";

interface TopCategoryCardProps {}

export const TopCategoryCard: React.FC<TopCategoryCardProps> = ({}) => {
  const classes = dashboardStyles();

  return (
    <>
      <Card className={classes.cards}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.top}>
            <b>School</b>
          </Typography>
          <Typography variant="body2" component="p" className={classes.bot}>
            Most time spent in this category
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
