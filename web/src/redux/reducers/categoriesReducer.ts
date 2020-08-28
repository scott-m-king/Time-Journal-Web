import { Action } from "../actions";
import { Category } from "../types";

export interface CategoryState {
  selectedCategory: Category | undefined;
}

const initialState = {
  selectedCategory: undefined,
};

export const categoriesReducer = (
  state: CategoryState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_SELECTED_CATEGORY": {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }
    default:
      return state;
  }
};
