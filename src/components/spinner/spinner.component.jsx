import React, { Fragment } from "react";

import "./spinner.styles.scss";

const Spinner = ({ overlay, className }) => {
  return (
    <Fragment>
      {overlay ? (
        <div className="spinner-overlay">
          <div className="spinner-container" />
        </div>
      ) : (
        <div className={`spinner-container ${className ? className : ""}`} />
      )}
    </Fragment>
  );
};
export default Spinner;
