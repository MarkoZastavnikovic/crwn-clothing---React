import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import ScrollToTop from "./utils/ScrollToTop/scroll-to-top.component";

// import { UserContext } from "./contexts/user.context";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
} from "./utils/firebase/firebase.utils";

import { createActionSetCurrentUser } from "./store/user/user.action.js";
import { createActionSetProductsArray } from "./store/products/products.action";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "./store/user/user.selector";

import AuthenticationPage from "./pages/authentication/authentication.component";
import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component";
import ContactPage from "./pages/contact/contact.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(createActionSetCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const productsArray = await getCategoriesAndDocuments();
      dispatch(createActionSetProductsArray(productsArray));
    };
    getCategoriesMap();
  }, [dispatch]);

  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="shop/*" element={<ShopPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="auth"
            element={currentUser ? null : <AuthenticationPage />}
          />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
