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
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
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
};

export const createUserDocumentFromAuth = async (userAuth, displayNameUser) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName
          ? displayName
          : displayNameUser
          ? displayNameUser
          : email.split("@")[0],
        email,
        createdAt,
      });
    } catch (error) {
      console.error(`MARZ: Creating user (${error.message})`);
    }
  }

  return userDocRef;
};

export const creatAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
