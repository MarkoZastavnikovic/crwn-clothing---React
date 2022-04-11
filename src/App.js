import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Authentication from "./pages/authentication/authentication.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="contact" />
          <Route path="auth" element={<Authentication />} />
          <Route path="shop/hats" />
          <Route path="shop/jackets" />
          <Route path="shop/sneakers" />
          <Route path="shop/womens" />
          <Route path="shop/mens" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
