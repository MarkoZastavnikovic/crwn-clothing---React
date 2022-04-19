import React, { useState } from "react";
import "./sign-in.styles.scss";

import { useNavigate } from "react-router-dom";

// import { getRedirectResult } from "firebase/auth";

import {
  signInWithGooglePopup,
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

  // const resetSignInFields = () => {
  //   setSignInFields(defaultSignInFields);
  // };

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

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();

      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        return;
      } else {
        console.error(`MARZ: Google sign in problem (${err.message})`);
        alert(`Something went wrong. (Error code: ${err.code})`);
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
      await signInAuthWithEmailAndPassword(email, password);

      // resetSignInFields();

      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        alert("Either your email or password are wrong.");
      } else {
        console.error(`MARZ: sign in problem (${err.message})`);
        alert(`Something went wrong. (Error code: ${err.code})`);
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
