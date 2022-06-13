import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import ShopPreview from "../../components/shop-preview/shop-preview.component";
import CategoryPage from "../category/category.component";

import { useSelector, useDispatch } from "react-redux";

import {
  selectProductsAreLoading,
  // selectProductsError,
  selectProducts,
} from "../../store/products/products.selector";

import Spinner from "../../components/spinner/spinner.component.jsx";

import { createActionFetchProductsAsync } from "../../store/products/products.action";

import "./shop.styles.scss";

const ShopPage = () => {
  const dispatch = useDispatch();

  const productsAreLoading = useSelector(selectProductsAreLoading);

  // const productsError = useSelector(selectProductsError);

  const productsArray = useSelector(selectProducts);

  useEffect(() => {
    if (Array.isArray(productsArray) && productsArray.length === 0) {
      dispatch(createActionFetchProductsAsync());
    }
  }, [dispatch, productsArray]);
  return (
    <Routes>
      <Route
        index
        element={
          productsAreLoading ? <Spinner overlay={true} /> : <ShopPreview />
        }
      />
      <Route
        path=":category"
        element={
          productsAreLoading ? <Spinner overlay={true} /> : <CategoryPage />
        }
      />
    </Routes>
  );
};

export default ShopPage;
