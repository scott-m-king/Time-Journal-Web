import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { categoriesReducer } from "./reducers/categoriesReducer";

export const store = createStore(categoriesReducer);
