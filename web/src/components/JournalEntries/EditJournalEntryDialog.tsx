import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { CreateEntryForm } from "../../Forms/CreateEntryForm";
import {
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
  useCreateEntryMutation,
} from "../../generated/graphql";
import { JournalEntry } from "../../redux/types";

interface EditJournalEntryDialogProps {
  open: boolean;
}

export const EditJournalEntryDialog: React.FC<EditJournalEntryDialogProps> = ({
  open,
}) => {
  const [openState, setOpenState] = useState(false);
  const [createEntry] = useCreateEntryMutation();

  useEffect(() => {
    setOpenState(open);
  }, [open]);

  const handleClose = () => {
    setOpenState(false);
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
    <Dialog
      open={openState}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
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
    </Dialog>
  );
};
