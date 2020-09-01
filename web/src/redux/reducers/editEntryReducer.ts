import { SetEntryToEditAction } from "../actions";
import { JournalEntry } from "../types";

export interface EntryState {
  editEntry: JournalEntry | undefined;
}

const initialState = {
  editEntry: undefined,
};

export const editEntryReducer = (
  state: EntryState = initialState,
  action: SetEntryToEditAction
) => {
  switch (action.type) {
    case "SET_ENTRY_TO_EDIT": {
      return {
        ...state,
        editEntry: action.payload,
      };
    }
    default:
      return state;
  }
};
