import { Category } from "./types";

export type Action = { type: `SET_SELECTED_CATEGORY`; payload: Category };

export const setSelectedCategory = (category: Category): Action => ({
  type: "SET_SELECTED_CATEGORY",
  payload: category,
});
