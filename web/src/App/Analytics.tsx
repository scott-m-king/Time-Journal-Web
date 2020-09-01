import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  useCreateEntryMutation,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
} from "../generated/graphql";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { CreateEntryForm } from "../Forms/CreateEntryForm";
import { JournalEntry } from "../redux/types";

interface AnalyticsProps {}

export const Analytics = () => {
  const [open, setOpen] = React.useState(false);
  const [createEntry] = useCreateEntryMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          date: "",
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
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <CreateEntryForm onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};
