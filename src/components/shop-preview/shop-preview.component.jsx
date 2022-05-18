import React, { useContext } from "react";
// import SHOP_DATA from "../../shop-data.json";
import { ProductsContext } from "../../contexts/products.context";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import "./shop-preview.styles.scss";

const ShopPreview = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="shop-page page">
      {Object.keys(products).map((title) => {
        const collection = products[title];
        return <CollectionPreview key={title} collection={collection} />;
      })}
    </div>
  );
};

export default ShopPreview;
