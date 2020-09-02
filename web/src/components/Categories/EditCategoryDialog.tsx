import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import {
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
  useEditCategoryMutation,
} from "../../generated/graphql";
import { CategoryCardProps } from "./CategoryCard";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen(bool: boolean): void;
  category: CategoryCardProps;
}

export const EditCategoryDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const [editCategory] = useEditCategoryMutation();
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleEdit = async () => {
    if (category.description === "Uncategorized") {
      alert("You cannot delete the 'Uncategorized' category.");
      return;
    }

    try {
      await editCategory({
        variables: {
          categoryId: category.id,
          updatedDescription: updatedDescription,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<GetUserCategoriesQuery>({
            query: GetUserCategoriesDocument,
            data: {
              getUserCategories: data.editCategory.categories,
            },
          });
          store.writeQuery<GetAllUserEntriesQuery>({
            query: GetAllUserEntriesDocument,
            data: {
              getAllUserEntries: data.editCategory.entries,
            },
          });
        },
      });
    } catch (err) {
      alert("Entry could not be edited. Error: " + err);
    }
    setIsOpen(false);
  };

  const handleCloseEdit = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to edit the ${category.description} category?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Enter a name to change <b>{category.description}'s</b> title to:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Category Title"
          type="input"
          onChange={(e) => setUpdatedDescription(e.target.value)}
          fullWidth
        />
        <DialogContentText id="alert-dialog-description2">
          <br />
          This action will re-name the <b>{category.description}</b> category to{" "}
          <b>{updatedDescription}</b>
          <br />
          <br /> You currently have <b>{category.duration} minutes</b> assigned
          to entries in this category. <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={handleEdit} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
