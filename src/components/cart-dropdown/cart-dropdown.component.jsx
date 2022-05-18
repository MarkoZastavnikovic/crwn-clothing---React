import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import CustomButton from "../custom-button/custom-button.component";

import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.name} cartItem={item} />)
        ) : (
          <span>Your cart is empty</span>
        )}
      </div>
      <CustomButton className="dropdown" onClick={goToCheckoutHandler}>
        go to checkout
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
