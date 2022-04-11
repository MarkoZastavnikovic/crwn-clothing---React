import React, { useState } from "react";
import "./sign-in.styles.scss";

// import { getRedirectResult } from "firebase/auth";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const defaultSignInFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [signInFields, setSignInFields] = useState(defaultSignInFields);

  const { email, password } = signInFields;

  const resetSignInFields = () => {
    setSignInFields(defaultSignInFields);
  };

  // console.log(signInFields);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        return;
      } else {
        alert("Something went wrong.");
        console.error(`MARZ: Google sign in problem (${err.message})`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Fill out the sign-in fields.");
      return;
    }

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);

      resetSignInFields();
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        alert("Either your email or password are wrong.");
      } else {
        console.error(`MARZ: sign in problem (${err.message})`);
      }
    }
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
            Google sign in
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
