import { SetCalendarViewAction } from "../actions";

export interface CalendarState {
  view: boolean;
}

const initialState = {
  view: false,
};

export const calendarReducer = (
  state: CalendarState = initialState,
  action: SetCalendarViewAction
) => {
  switch (action.type) {
    case "SET_CALENDAR_VIEW": {
      return {
        ...state,
        view: action.payload,
      };
    }
    default:
      return state;
  }
};
