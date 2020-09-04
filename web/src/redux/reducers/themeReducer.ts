import { SetThemeAction } from "../actions";

export interface ThemeState {
  theme: boolean;
}

const initialState = {
  theme: false,
};

export const themeReducer = (
  state: ThemeState = initialState,
  action: SetThemeAction
) => {
  switch (action.type) {
    case "SET_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    default:
      return state;
  }
};
