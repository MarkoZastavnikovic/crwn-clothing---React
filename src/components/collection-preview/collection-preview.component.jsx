import React from "react";
import "./collection-preview.styles.scss";

import { useNavigate } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ title, items, routeName }) => {
  const navigate = useNavigate();

  return (
    <div className="collection-preview">
      <h1
        className="title"
        onClick={() => {
          navigate(`${routeName}`);
        }}
      >
        {title.toUpperCase()}
        <span className="arrow-right">&rarr;</span>
      </h1>
      <div className="preview">
        {items
          .filter((_, idx) => idx < 4)
          .map(({ id, ...otherItemProps }) => (
            <CollectionItem key={id} {...otherItemProps} />
          ))}
      </div>
    </div>
  );
};
export default CollectionPreview;
