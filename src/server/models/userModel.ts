import { getAuth, UserRecord } from "firebase-admin/auth";
import { User } from "./userTypes";
import { app } from "../firebase";
import {
  getFirestore,
  Firestore,
  FieldValue,
  WriteResult,
  DocumentSnapshot,
} from "firebase-admin/firestore";
import { Wallet } from "xrpl";
import { WalletModel } from "./walletModels";

const db: Firestore = getFirestore(app);

export const userModel = {
  deleteUserWallets: async (userData: UserRecord): Promise<WriteResult> => {
    const docRef = db.collection("users").doc(userData.uid);
    const writeResult: WriteResult = await docRef.delete();
    return writeResult;
  },
  getWalletsFromUser: async (userData: UserRecord): Promise<Wallet[]> => {
    const docRef = db.collection("users").doc(userData.uid);
    const documentSnapshot: DocumentSnapshot = await docRef.get();

    const walletSeeds: string[] = documentSnapshot.get("wallet");
    if (!walletSeeds) return [];

    const wallets: Wallet[] = await Promise.all(
      walletSeeds.map(async (seed: string): Promise<Wallet> => {
        return await WalletModel.fromSeed(seed);
      })
    );
    return wallets;
  },
  addWalletToUser: async (
    userData: UserRecord,
    wallet: Wallet
  ): Promise<WriteResult> => {
    const docRef = db.collection("users").doc(userData.uid);
    const writeResult: WriteResult = await docRef.set(
      {
        wallet: FieldValue.arrayUnion(wallet.seed),
      },
      { merge: true }
    );
    return writeResult;
  },
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
  },
  getUserByUID: async (userUid: string): Promise<UserRecord> => {
    return getAuth(app).getUser(userUid);
  },
};
