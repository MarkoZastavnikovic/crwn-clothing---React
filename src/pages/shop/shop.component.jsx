import React from "react";

import { Routes, Route } from "react-router-dom";

import ShopPreview from "../../components/shop-preview/shop-preview.component";
import CategoryPage from "../category/category.component";

import "./shop.styles.scss";

const ShopPage = () => {
  return (
    <Routes>
      <Route index element={<ShopPreview />} />
      <Route path=":category" element={<CategoryPage />} />
    </Routes>
  );
};

export default ShopPage;
