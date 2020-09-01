import React from "react";
import Typography from "@material-ui/core/Typography";
import { CreateEntryForm } from "../Forms/CreateEntryForm";
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Paper,
} from "@material-ui/core";
import {
  useCreateEntryMutation,
  GetUserCategoriesDocument,
  GetUserCategoriesQuery,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
} from "../generated/graphql";
import { JournalEntry } from "../redux/types";
import { EntryTable2 } from "../components/JournalEntries/EntryTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      width: "100%",
      color: theme.palette.text.secondary,
    },
  })
);

export const CreateEntry = () => {
  const classes = useStyles();
  const [createEntry] = useCreateEntryMutation();

  const handleSubmit = async (data: JournalEntry) => {
    try {
      const response = await createEntry({
        variables: {
          categoryId: data.categoryId,
          title: data.title,
          notes: data.notes,
          duration: data.duration,
          date: data.date,
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
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Journal Entries</Typography>
        </Grid>
        <Grid item xs sm={12} md={12} lg={3} xl={3}>
          <Paper className={classes.paper}>
            <CreateEntryForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
        <Grid item xs sm={12} md={12} lg={9} xl={9}>
          <EntryTable2 />
        </Grid>
      </Grid>
    </div>
  );
};
