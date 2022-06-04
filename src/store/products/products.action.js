import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const createActionSetProductsArray = (categoriesMap) =>
//   createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_ARRAY, categoriesMap);

export const createActionFetchProductsStart = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START, productsArray);

export const createActionFetchProductsSuccess = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, productsArray);

export const createActionFetchProductsFailed = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED, productsArray);

export const fetchProductsAsync = () => async (dispatch) => {
  dispatch(createActionFetchProductsStart());
  try {
    const productsArray = await getCategoriesAndDocuments();
    dispatch(createActionFetchProductsSuccess(productsArray));
  } catch (e) {
    dispatch(createActionFetchProductsFailed(e));
  }
};
