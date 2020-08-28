import { createStore } from "redux";
import { categoriesReducer } from "./reducers/categoriesReducer";

export const store = createStore(categoriesReducer);
