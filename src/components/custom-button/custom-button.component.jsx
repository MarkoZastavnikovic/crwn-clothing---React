import "./custom-button.styles.scss";

const CustomButton = ({ children, className, ...otherProps }) => (
  <button
    className={`custom-button ${className ? className : ""}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
