import { credential, initializeApp, ServiceAccount } from "firebase-admin";
import firebaseCredentials from "./util/firebase-credentials.json";
import firebaseConfig from "./util/firebase-config.json";
import admin from "firebase-admin";
import { cert } from "firebase-admin/app";

const serviceAccount = firebaseCredentials as ServiceAccount;

const app = admin.initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: firebaseConfig.authDomain,
});

export { app };
