import React from "react";
import { Grid, Typography } from "@material-ui/core";

interface AnalyticsProps {}

export const Settings = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Account Settings</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
