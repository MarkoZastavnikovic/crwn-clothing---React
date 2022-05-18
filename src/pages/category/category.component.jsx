import React, { useContext, useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { ProductsContext } from "../../contexts/products.context";

import "./category.styles.scss";

const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useContext(ProductsContext);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (products) {
      setCollection(products[category]?.items);
    }
  }, [category, products]);

  return (
    <div className="category-page">
      <h1 className="category-title">{category}</h1>
      <div className="preview">
        {collection &&
          collection.map((product) => (
            <CollectionItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
