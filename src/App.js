import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SighInAndSignUpPage from "./pages/sign-in-and-sigh-up/sign-in-and-sigh-up.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sign-in" element={<SighInAndSignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
