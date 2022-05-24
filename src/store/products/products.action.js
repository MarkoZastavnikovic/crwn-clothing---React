import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";

export const createActionSetProductsArray = (categoriesMap) =>
  createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_ARRAY, categoriesMap);
