import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { editEntryReducer } from "./editEntryReducer";
import { calendarReducer } from "./calendarReducer";
import { themeReducer } from "./themeReducer";

export const rootReducer = combineReducers({
  activeCategory: categoriesReducer,
  editEntry: editEntryReducer,
  calendarView: calendarReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
