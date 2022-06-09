import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfUeBmDov1tnT6zW4AMML2BkcJzrQ5ZGo",
  authDomain: "crwn-clothing-db-2b35d.firebaseapp.com",
  projectId: "crwn-clothing-db-2b35d",
  storageBucket: "crwn-clothing-db-2b35d.appspot.com",
  messagingSenderId: "291976852026",
  appId: "1:291976852026:web:c194c32d315fb186037b03",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  try {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
  } catch (err) {
    console.error(`MARZ: Adding collections and documents (${err.message})`);
    throw err;
  }
};

export const getCategoriesAndDocuments = async () => {
  try {
    // throw new Error("ERROR TEST");

    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    // const categoryMap =

    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

    // reduce((acc, docSnapshot) => {
    //   const { title, items, routeName } = docSnapshot.data();
    //   acc[title.toLowerCase()] = { title, items, routeName };
    //   return acc;
    // }, {});

    // return categoryMap;
  } catch (err) {
    console.error(`MARZ: Getting documents (${err.message})`);
    throw err;
  }
};

export const createUserDocumentFromAuth = async (userAuth, displayNameUser) => {
  try {
    // throw new Error("ERROR TEST");

    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      await setDoc(userDocRef, {
        displayName: displayName
          ? displayName
          : displayNameUser
          ? displayNameUser
          : email.split("@")[0],
        email,
        createdAt,
      });
    }

    return userDocRef;
  } catch (err) {
    console.error(`MARZ: Creating user document (${err.message})`);
    throw err;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const signInAuthWithEmailAndPassword = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const updateProfileDisplayName = async (user, displayName) =>
  await updateProfile(user, { displayName: displayName });
