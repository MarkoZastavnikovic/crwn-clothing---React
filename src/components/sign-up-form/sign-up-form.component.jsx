import React, { useState } from "react";

import {
  creatAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

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

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!email || !password) {
      alert("Fill out the sign-in fields.");
      return;
    }

    try {
      const { user } = await creatAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user, displayName);
      console.log(userDocRef);
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use.");
      } else {
        console.error(`MARZ: sign up problem (${err.message})`);
      }
    }
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
          label="displayName"
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
          label="confirmPassword"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default SignUpForm;
