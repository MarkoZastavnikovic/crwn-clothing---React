import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

// import { createActionSetProductsArray } from "../../store/products/products.action";

import { selectCategoriesMap } from "../../store/products/products.selector";

import CollectionItem from "../../components/collection-item/collection-item.component";

// import { ProductsContext } from "../../contexts/products.context";

import "./category.styles.scss";

const CategoryPage = () => {
  // const dispatch = useDispatch();
  const { category } = useParams();
  // const { products } = useContext(ProductsContext);
  const categories = useSelector(selectCategoriesMap);
  const [collection, setCollection] = useState(categories[category]);

  useEffect(() => {
    setCollection(categories[category]);
  }, [category, categories]);

  return (
    <div className="category-page">
      <h1 className="category-title">{categories[category]?.title}</h1>
      <div className="preview">
        {collection &&
          collection.items.map((product) => (
            <CollectionItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
