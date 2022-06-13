import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, className, ...otherProps }) => (
  <button
    // onClick={() => console.log("click test")}
    className={`custom-button ${className ? className : ""}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
