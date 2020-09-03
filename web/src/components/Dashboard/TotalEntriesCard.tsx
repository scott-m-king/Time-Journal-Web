import React from "react";
import { dashboardStyles } from "../../App/Dashboard";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";

interface TotalEntriesCardProps {
  numEntries: number | undefined;
}

export const TotalEntriesCard: React.FC<TotalEntriesCardProps> = ({
  numEntries,
}) => {
  const classes = dashboardStyles();

  return (
    <>
      <Card className={classes.cards}>
        <CardContent>
          {numEntries ? (
            <>
              <Typography variant="h5" component="h2" className={classes.top}>
                <b>{numEntries}</b> Entries
              </Typography>
              <Typography variant="body2" component="p" className={classes.bot}>
                Entered in total
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
