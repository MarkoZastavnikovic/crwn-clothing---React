import React from "react";

// import { CartContext } from "../../contexts/cart.context";

import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import {
  createActionAddItemToCart,
  createActionRemoveItemFromCart,
  createActionClearItemFromCart,
} from "../../store/cart/cart.action";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  // const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(
  //   CartContext
  // );

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const clearItemHandler = () =>
    dispatch(createActionClearItemFromCart(cartItems, cartItem));
  const addItemHandler = () =>
    dispatch(createActionAddItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(createActionRemoveItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}&euro;</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
