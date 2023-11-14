import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import { User } from "../models/userTypes";
import { UserRecord } from "firebase-admin/auth";
import { WalletModel } from "../models/walletModels";
import { Wallet } from "xrpl";
import { DocumentSnapshot, WriteResult } from "firebase-admin/firestore";

export const userController = {
  deleteWalletsFromUser: async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      const user: UserRecord = await userModel.getUserByUID(uid);
      await userModel.deleteUserWallets(user);
      res.status(200).json({message: "Deletion was successful"});
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  getWalletsFromUser: async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      const user: UserRecord = await userModel.getUserByUID(uid);
      const wallets: Wallet[] = await userModel.getWalletsFromUser(user);
      res.status(200).json({ wallets: wallets });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  addWalletsToUser: async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      const walletsSeed: string[] = req.body.walletSeeds;

      if (!Array.isArray(walletsSeed)) {
        return res.status(400).json({ error: "Invalid walletSeed format" });
      }

      const writeResults: WriteResult[] = await Promise.all(
        walletsSeed.map(async (walletSeed: string) => {
          const wallet: Wallet = await WalletModel.fromSeed(walletSeed);
          const user: UserRecord = await userModel.getUserByUID(uid);
          return userModel.addWalletToUser(user, wallet);
        })
      );

      const lastWriteResult: WriteResult =
        writeResults[writeResults.length - 1];

      res.status(200).json({ timeStamp: lastWriteResult.writeTime });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  createNewUser: async (req: Request, res: Response) => {
    try {
      const userRecord = await userModel.createNewUser(req.body as User);
      res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  updateUser: async (req: Request, res: Response) => {
    const { uid } = req.params;
    try {
      const userRecord = await userModel.updateUser(uid, req.body);
      res.status(200).json(userRecord.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { uid } = req.params;
    try {
      await userModel.deleteUser(uid);
      res.status(200).json({ message: "Successfully deleted user" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  listAllUsers: async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      const users = await userModel.listAllUsers();
      res.status(200).json(users.map((user) => user.toJSON()));
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  getUserByUID: async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;
      const user = await userModel.getUserByUID(uid);
      res.status(200).json(user.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
};
