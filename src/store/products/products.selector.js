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

// export const selectCategoriesMap = (state) =>
// state.products.productsArray.reduce((acc, products) => {
//   const { title, items, routeName } = products;
//   acc[title.toLowerCase()] = { title, items, routeName };
//   return acc;
// }, {});
