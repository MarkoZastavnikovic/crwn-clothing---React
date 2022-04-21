import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./header.styles.scss";

import { UserContext } from "../../contexts/user.context";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Header = () => {
  const { currentUser } = useContext(UserContext);

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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
