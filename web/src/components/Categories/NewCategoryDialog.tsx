import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import {
  useCreateCategoryMutation,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
} from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export const NewCategoryDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (description === "") {
      alert("You must enter a name for your category");
      return;
    }

    try {
      await createCategory({
        variables: {
          description: description,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<GetUserCategoriesQuery>({
            query: GetUserCategoriesDocument,
            data: {
              getUserCategories: data.createCategory,
            },
          });
        },
      });
    } catch (err) {
      alert(err);
    }
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={handleClickOpen}
      >
        Create New Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new category, enter the title below. This category will
            be initialized with 0 minutes and no entries.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Category Title"
            type="input"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
