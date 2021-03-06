import { createSelector } from "reselect";

const selectProductsReducer = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (products) => products.productsArray
);

export const selectCategoriesMap = createSelector(
  [selectProducts],
  (productsArray) =>
    productsArray.reduce((acc, products) => {
      const { title, items, routeName } = products;
      acc[title.toLowerCase()] = { title, items, routeName };
      return acc;
    }, {})
);

export const selectProductsAreLoading = createSelector(
  [selectProductsReducer],
  (products) => products.isLoading
);

export const selectProductsError = createSelector(
  [selectProductsReducer],
  (products) => products.error
);

// export const selectCategoriesMap = (state) =>
// state.products.productsArray.reduce((acc, products) => {
//   const { title, items, routeName } = products;
//   acc[title.toLowerCase()] = { title, items, routeName };
//   return acc;
// }, {});
