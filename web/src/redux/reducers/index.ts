import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { editEntryReducer } from "./editEntryReducer";

export const rootReducer = combineReducers({
  activeCategory: categoriesReducer,
  editEntry: editEntryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
