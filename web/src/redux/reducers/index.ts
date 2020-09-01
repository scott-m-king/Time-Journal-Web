import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { editEntryReducer } from "./editEntryReducer";
import { calendarReducer } from "./calendarReducer";

export const rootReducer = combineReducers({
  activeCategory: categoriesReducer,
  editEntry: editEntryReducer,
  calendarView: calendarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
