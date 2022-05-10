import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { UserContext } from "./contexts/user.context";

import AuthenticationPage from "./pages/authentication/authentication.component";
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component";
import ContactPage from "./pages/contact/contact.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="auth"
            element={currentUser ? null : <AuthenticationPage />}
          />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="shop/hats" element={null} />
          <Route path="shop/jackets" element={null} />
          <Route path="shop/sneakers" element={null} />
          <Route path="shop/womens" element={null} />
          <Route path="shop/mens" element={null} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
