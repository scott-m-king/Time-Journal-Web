import { Category } from "./types";

export type Action = { type: `SET_SELECTED_CATEGORY`; payload: Category | undefined };

export const setSelectedCategory = (category: Category | undefined): Action => ({
  type: "SET_SELECTED_CATEGORY",
  payload: category,
});
