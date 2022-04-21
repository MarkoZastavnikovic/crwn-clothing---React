import React, { useContext } from "react";
// import SHOP_DATA from "../../shop-data.json";
import { ProductsContext } from "../../contexts/products.context";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import "./shop.styles.scss";

const ShopPage = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="shop-page page">
      {products.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default ShopPage;
