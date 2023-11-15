import { credential, initializeApp, ServiceAccount } from "firebase-admin";
import firebaseCredentials from "../../firebase-credentials.json";
import firebaseConfig from "../../firebase-config.json";
import admin from "firebase-admin";

const serviceAccount = firebaseCredentials as ServiceAccount;

const app = admin.initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: firebaseConfig.authDomain,
});

export { app };
