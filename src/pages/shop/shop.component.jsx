import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import ShopPreview from "../../components/shop-preview/shop-preview.component";
import CategoryPage from "../category/category.component";

import { useSelector, useDispatch } from "react-redux";

import { selectProductsAreLoading } from "../../store/products/products.selector";

import Spinner from "../../components/spinner/spinner.component.jsx";

import { fetchProductsAsync } from "../../store/products/products.action";

import "./shop.styles.scss";

const ShopPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectProductsAreLoading);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={isLoading ? <Spinner /> : <ShopPreview />} />
      <Route
        path=":category"
        element={isLoading ? <Spinner /> : <CategoryPage />}
      />
    </Routes>
  );
};

export default ShopPage;
