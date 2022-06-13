import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const createActionSetProductsArray = (categoriesMap) =>
//   createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS_ARRAY, categoriesMap);

export const createActionFetchProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START);

export const createActionFetchProductsSuccess = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, productsArray);

export const createActionFetchProductsFailed = (error) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED, error);

export const createActionFetchProductsAsync = () => async (dispatch) => {
  dispatch(createActionFetchProductsStart());
  try {
    const productsArray = await getCategoriesAndDocuments();
    dispatch(createActionFetchProductsSuccess(productsArray));
  } catch (err) {
    dispatch(createActionFetchProductsFailed(err));
    console.error(
      `MARZ: Fetching products problem. ${err.message} (Error code: ${err.code})`
    );
    alert(
      `Something went wrong. Please reload.\n\n${err.message} (Error code: ${err.code})`
    );
  }
};
