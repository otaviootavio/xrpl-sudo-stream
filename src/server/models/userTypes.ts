// TODO

import { Wallet } from "xrpl";

// UPDATE USER MODEL
export type User = {
    uid: string;
    email: string;
    phoneNumber: string;
    emailVerified?: boolean;
    password?: string;
    displayName?: string;
    photoURL?: string;
    disabled?: boolean;
    wallets?: Wallet[];
  };
  