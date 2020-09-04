import React from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import { useMeQuery } from "../generated/graphql";
import { SettingsBar } from "../components/Settings/SettingsBar";

interface SettingsProps {}

export const Settings = () => {
  const { loading, data } = useMeQuery();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Account Settings</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SettingsBar />
            </Grid>
            <Grid item xs={12}>
              <Card style={{ height: 250, width: 300 }}></Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
