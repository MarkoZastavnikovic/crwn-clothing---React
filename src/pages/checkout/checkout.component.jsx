import React from "react";

// import { CartContext } from "../../contexts/cart.context";

import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

import "./checkout.styles.scss";

const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.name} cartItem={cartItem} />
      ))}
      <span className="total">Total: {cartTotal}&euro;</span>
      <PaymentForm />
      <div className="test-card-info">
        <h3>Test credit card</h3>
        <p>
          CARD NUMBER: 4242 4242 4242 4242 --- DATE: Any future date --- CVC:
          Any 3 digits --- ZIP: Any 5 digits
        </p>
      </div>
    </div>
  );
};

export default Checkout;
