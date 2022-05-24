import React from "react";

// import { CartContext } from "../../contexts/cart.context";

import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { createActionAddItemToCart } from "../../store/cart/cart.action";

import "./collection-item.styles.scss";

import CustomButton from "../custom-button/custom-button.component";

const CollectionItem = ({ product }) => {
  const { name, price, imageUrl } = product;
  // const { addItemToCart } = useContext(CartContext);

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () =>
    dispatch(createActionAddItemToCart(cartItems, product));

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton className="inverted-transparent" onClick={addProductToCart}>
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
