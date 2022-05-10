import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./header.styles.scss";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="header">
        <div className="header-start">
          <Link className="logo-container" to="/">
            <Logo className="logo" />
          </Link>
          <div className="user-container">
            {currentUser
              ? `Welcome, ${
                  currentUser.displayName
                    ? currentUser.displayName.split(" ")[0]
                    : "user"
                }!`
              : null}
          </div>
        </div>
        <div className="options">
          <Link className="option" to="/shop">
            SHOP
          </Link>
          <Link className="option" to="/contact">
            CONTACT
          </Link>

          {currentUser ? (
            <span className="option sign-out" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="option" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen ? <CartDropdown /> : null}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
