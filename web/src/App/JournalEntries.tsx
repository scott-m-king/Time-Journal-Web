import React from "react";
import Typography from "@material-ui/core/Typography";
import { CreateEntryForm } from "../Forms/CreateEntryForm";
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Snackbar,
} from "@material-ui/core";
import {
  useCreateEntryMutation,
  GetUserCategoriesDocument,
  GetUserCategoriesQuery,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
  useEditEntryMutation,
} from "../generated/graphql";
import { JournalEntry } from "../redux/types";
import { EntryTable } from "../components/JournalEntries/EntryTable";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CreateEntry = () => {
  const classes = useStyles();
  const [createEntry] = useCreateEntryMutation();
  const [editEntry] = useEditEntryMutation();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (data: JournalEntry) => {
    try {
      const response = await createEntry({
        variables: {
          categoryId: data.categoryId,
          title: data.title,
          notes: data.notes,
          duration: data.duration,
          date: getCurrentDayTimestamp(new Date(data.date)),
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
        return;
      }
      handleClick();
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = async (id: number, data: JournalEntry) => {
    try {
      const response = await editEntry({
        variables: {
          id: id,
          categoryId: data.categoryId,
          title: data.title,
          notes: data.notes,
          duration: data.duration,
          date: getCurrentDayTimestamp(new Date(data.date)),
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<GetUserCategoriesQuery>({
            query: GetUserCategoriesDocument,
            data: {
              getUserCategories: data.editEntry.categories,
            },
          });
          store.writeQuery<GetAllUserEntriesQuery>({
            query: GetAllUserEntriesDocument,
            data: {
              getAllUserEntries: data.editEntry.entries,
            },
          });
        },
      });
      if (!response) {
        alert("Failed to edit.");
        return;
      }
      handleClick();
    } catch (err) {
      alert(err);
    }
  };

  const getCurrentDayTimestamp = (d: Date) => {
    console.log(d);
    return new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    )
      .toUTCString()
      .slice(0, 16);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Journal Entries</Typography>
        </Grid>
        <Grid item xs sm={12} md={12} lg={3} xl={3}>
          <Paper className={classes.paper}>
            <CreateEntryForm onSubmit={handleSubmit} onEdit={handleEdit} />
          </Paper>
        </Grid>
        <Grid item xs sm={12} md={12} lg={9} xl={9}>
          <EntryTable />
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Entry successfully added!
        </Alert>
      </Snackbar>
    </div>
  );
};
