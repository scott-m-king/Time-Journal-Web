import React from "react";
import { Grid, Typography, Card, Paper, Tabs, Tab } from "@material-ui/core";
import { useMeQuery } from "../generated/graphql";

interface SettingsProps {}

export const Settings = () => {
  const { loading, data } = useMeQuery();

  return (
    <div style={{ width: "100%" }}>
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

const SettingsBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper square style={{ width: 500 }}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Active" />
        <Tab label="Disabled" />
        <Tab label="Active" />
      </Tabs>
    </Paper>
  );
};
