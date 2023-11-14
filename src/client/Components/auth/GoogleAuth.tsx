import React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
  UserCredential,
  User,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config.json";


const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
await setPersistence(auth, browserSessionPersistence);
const provider: GoogleAuthProvider = new GoogleAuthProvider();

const signInwithGoogle =
  async function signInwithGoogle(): Promise<User | null> {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);

      // TODO
      // THIS MIGHT BE USEFUL
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      const user: User = result.user;
      return user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      return null;
    }
  };

const signOutGoogle = async () => {
  signOut(auth);
};

const onAuthStateChangeGoogle = (setState: React.Dispatch<React.SetStateAction<User | null>>) => {
  onAuthStateChanged(auth, setState)
}

export { signOutGoogle, signInwithGoogle, onAuthStateChangeGoogle };
