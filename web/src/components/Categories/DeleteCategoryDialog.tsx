import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  useDeleteCategoryMutation,
  GetUserCategoriesQuery,
  GetUserCategoriesDocument,
  GetAllUserEntriesQuery,
  GetAllUserEntriesDocument,
} from "../../generated/graphql";
import { CategoryCardProps } from "./CategoryCard";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen(bool: boolean): void;
  category: CategoryCardProps;
}

export const DeleteCategoryDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    if (category.description === "Uncategorized") {
      alert("You cannot delete the 'Uncategorized' category.");
      return;
    }

    try {
      await deleteCategory({
        variables: {
          categoryId: category.id,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<GetUserCategoriesQuery>({
            query: GetUserCategoriesDocument,
            data: {
              getUserCategories: data.deleteCategory.categories,
            },
          });
          store.writeQuery<GetAllUserEntriesQuery>({
            query: GetAllUserEntriesDocument,
            data: {
              getAllUserEntries: data.deleteCategory.entries,
            },
          });
        },
      });
    } catch (err) {
      alert("Entry could not be deleted. Error: " + err);
    }
    setIsOpen(false);
  };

  const handleCloseDelete = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete the ${category.description} category?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will re-categorize all entries tagged with the{" "}
          <b>{category.description}</b> category to the 'Uncategorized' category
          and permanently delete this category.
          <br />
          <br /> You currently have <b>{category.duration} minutes</b> assigned
          to entries in this category which will be reassigned. <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={handleDelete} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
