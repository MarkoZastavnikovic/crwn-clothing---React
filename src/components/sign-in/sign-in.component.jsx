import React, { useState } from "react";
import "./sign-in.styles.scss";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

// import { getRedirectResult } from "firebase/auth";

// import {
//   auth,
//   createUserDocumentFromAuth,
//   signInWithGooglePopup,
//   signInAuthWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  createActionSignInGoogleAsync,
  createActionSignInEmailAndPasswordAsync,
} from "../../store/user/user.action";

const defaultSignInFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [signInFields, setSignInFields] = useState(defaultSignInFields);

  const { email, password } = signInFields;

  // const resetSignInFields = () => {
  //   setSignInFields(defaultSignInFields);
  // };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const signInWithGoogle = () => {
    dispatch(createActionSignInGoogleAsync(navigate));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createActionSignInEmailAndPasswordAsync(email, password, navigate)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignInFields({ ...signInFields, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />

        <div className="buttons-container">
          <CustomButton type="submit">Sign in</CustomButton>

          <CustomButton
            type="button"
            className="google-sign-in"
            onClick={signInWithGoogle}
          >
            sign in with google
          </CustomButton>

          {/* <CustomButton
          className="blue-background"
          onClick={signInWithGoogleRedirect}
        >
          Sign in with Google Redirect
        </CustomButton> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
