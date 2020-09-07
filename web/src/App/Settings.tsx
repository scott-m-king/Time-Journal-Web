import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import { useMeQuery } from "../generated/graphql";
import { PasswordChangeForm } from "../Forms/PasswordChangeForm";

interface SettingsProps {}

export const Settings = () => {
  const { loading, data } = useMeQuery();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Account Settings</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SettingsBar />
            </Grid>
            <Grid item xs={3}>
              <Card style={{ height: "50%" }}>
                <Box
                  display="flex"
                  bgcolor="lightgreen"
                  alignItems="center"
                  justifyContent="center"
                  margin="auto"
                  height="100%"
                >
                  2. Box (alignItems and justifyContent)
                </Box>
              </Card>
            </Grid>
            <Grid item xs={9} style={{ height: 600 }}>
              <Card style={{ height: windowHeight - 250 }}>
                <Box
                  display="flex"
                  bgcolor="lightgreen"
                  margin="auto"
                  height="100%"
                >
                  <PasswordChangeForm
                    onSubmit={() => {
                      return;
                    }}
                  />
                </Box>
              </Card>
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
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        scrollButtons="auto"
        variant="scrollable"
      >
        <Tab label="Profile Options" style={{ width: 500 }} />
        <Tab label="Change Password" style={{ width: 500 }} />
        <Tab label="Delete Account" style={{ width: 500 }} />
      </Tabs>
    </Paper>
  );
};
