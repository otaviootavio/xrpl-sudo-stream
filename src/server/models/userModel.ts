import { getAuth, UserRecord } from "firebase-admin/auth";
import { User } from "./userTypes";
import { credential, initializeApp, ServiceAccount } from "firebase-admin";
import firebaseCredentials from "../util/firebase-credentials.json";
import firebaseConfig from "../util/firebase-config.json";
import admin from 'firebase-admin';

const serviceAccount = firebaseCredentials as ServiceAccount;

const app = admin.initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: firebaseConfig.authDomain,
});

export const userModel = {
  createNewUser: async (userData: User): Promise<UserRecord> => {
    return getAuth(app).createUser({
      uid: userData.uid,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });
  },
  updateUser: async (
    uid: string,
    userData: Partial<User>
  ): Promise<UserRecord> => {
    return getAuth(app).updateUser(uid, userData);
  },
  deleteUser: async (uid: string): Promise<void> => {
    return getAuth(app).deleteUser(uid);
  },
  listAllUsers: async (nextPageToken?: string): Promise<UserRecord[]> => {
    let allUsers: UserRecord[] = [];
    let pageToken = nextPageToken;

    do {
      const listUsersResult = await getAuth(app).listUsers(10, pageToken);
      allUsers = [...allUsers, ...listUsersResult.users];
      pageToken = listUsersResult.pageToken;
    } while (pageToken);

    return allUsers;
  }
};
