import { createAction } from "../../utils/reducer/reducer.utils";

import { USER_ACTION_TYPES } from "./user.types";

import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateProfileDisplayName,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

export const createActionSetCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const createActionSetDisplayName = (displayName) =>
  createAction(USER_ACTION_TYPES.SET_DISPLAY_NAME, displayName);

export const createActionSignUpAsync =
  (displayName, email, password, confirmPassword, navigate) =>
  async (dispatch) => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (!displayName || !email || !password) {
        alert("Fill out the sign-in fields.");
        return;
      }

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, displayName);
      await updateProfileDisplayName(user, displayName);
      dispatch(
        createActionSetDisplayName(
          auth.currentUser?.displayName ? auth.currentUser.displayName : null
        )
      );

      // resetFormFields();

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use.");
      } else {
        console.error(`MARZ: sign up problem (${err.message})`);
        alert(`Something went wrong. (Error code: ${err.code})`);
      }
    }
  };

export const createActionSignInGoogleAsync = (navigate) => async () => {
  try {
    await signInWithGooglePopup();
    await createUserDocumentFromAuth(auth.currentUser);

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

export const createActionSignInEmailAndPasswordAsync =
  (email, password, navigate) => async () => {
    try {
      if (!email || !password) {
        alert("Fill out the sign-in fields.");
        return;
      }

      await signInAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(auth.currentUser);

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

export const createActionSignOutAsync = (navigate) => async () => {
  try {
    await signOutUser();

    navigate("/");
  } catch (err) {
    console.error(`MARZ: Sign out problem (${err.message})`);
    alert(`Something went wrong. (Error code: ${err.code})`);
  }
};
