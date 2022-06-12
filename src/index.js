import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";

import "./index.css";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
// import { UserProvider } from "./contexts/user.context";
// import { ProductsProvider } from "./contexts/products.context";
// import { CartProvider } from "./contexts/cart.context";

import { PersistGate } from "redux-persist/integration/react";

import { Elements } from "@stripe/react-stripe-js";

import { stripePromice } from "./utils/stripe/stripe.utils";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <BrowserRouter>
//           {/* <UserProvider> */}
//           {/* <ProductsProvider> */}
//           {/* <CartProvider> */}
//           <App />
//           {/* </CartProvider> */}
//           {/* </ProductsProvider> */}
//           {/* </UserProvider> */}
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromice}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
