import React from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useDispatch, useSelector } from "react-redux";

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { createActionSetIsCartOpen } from "../../store/cart/cart.action";

// import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();

  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () =>
    dispatch(createActionSetIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
