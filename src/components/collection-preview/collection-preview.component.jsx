import React from "react";

import "./collection-preview.styles.scss";

import { useNavigate } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import { ReactComponent as ArrowRight } from "../../assets/arrow-narrow-right.svg";

const CollectionPreview = ({ collection }) => {
  const { title, items, routeName } = collection;
  const navigate = useNavigate();

  return (
    <div className="collection-preview">
      <div
        className="title"
        onClick={() => {
          navigate(`${routeName}`);
        }}
      >
        {title.toUpperCase()}
        <ArrowRight className="arrow-right" />
        {/* <span className="arrow-right">&rarr;</span> */}
      </div>
      <div className="preview">
        {items
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <CollectionItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
export default CollectionPreview;
