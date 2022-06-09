import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

// import { createActionSetDisplayName } from "../../store/user/user.action";

// import {
//   auth,
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
//   updateProfileDisplayName,
// } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { createActionSignUpAsync } from "../../store/user/user.action";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields);
  // };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createActionSignUpAsync(
        displayName,
        email,
        password,
        confirmPassword,
        navigate
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="display name"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="confirm password"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default SignUpForm;
