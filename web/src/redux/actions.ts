import { Category, JournalEntry } from "./types";

export type SetSelectedCategoryAction = {
  type: `SET_SELECTED_CATEGORY`;
  payload: Category | undefined;
};

export const setSelectedCategory = (
  category: Category | undefined
): SetSelectedCategoryAction => ({
  type: "SET_SELECTED_CATEGORY",
  payload: category,
});

export type SetEntryToEditAction = {
  type: `SET_ENTRY_TO_EDIT`;
  payload: JournalEntry | undefined;
};

export const setEntryToEdit = (
  entry: JournalEntry | undefined
): SetEntryToEditAction => ({
  type: "SET_ENTRY_TO_EDIT",
  payload: entry,
});

export type SetCalendarViewAction = {
  type: `SET_CALENDAR_VIEW`;
  payload: boolean;
};

export const setCalendarView = (view: boolean): SetCalendarViewAction => ({
  type: "SET_CALENDAR_VIEW",
  payload: view,
});

export type SetThemeAction = {
  type: `SET_THEME`;
  payload: boolean;
};

export const setTheme = (theme: boolean): SetThemeAction => ({
  type: "SET_THEME",
  payload: theme,
});
