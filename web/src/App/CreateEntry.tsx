import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { CreateEntryForm } from "../Forms/CreateEntryForm";
import { EntryTable } from "../components/EntryTable";
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Paper,
} from "@material-ui/core";
import styled from "styled-components";

const Root = styled.div`
  padding-top: 20px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const CreateEntry = () => {
  const classes = useStyles();
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Create Journal Entry</Typography>
          </Grid>
          <Grid item xs sm={12} lg={3}>
            <CreateEntryForm onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs sm={12} lg={9}>
            <Root>
              <EntryTable />
            </Root>
          </Grid>
        </Grid>
      </div>
  );
};
