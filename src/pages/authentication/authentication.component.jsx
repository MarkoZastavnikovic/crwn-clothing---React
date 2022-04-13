import React from "react";
import "./authentication.styles.scss";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => (
  <div className="authentication-container page">
    <SignIn />
    <SignUpForm />
  </div>
);

export default Authentication;
