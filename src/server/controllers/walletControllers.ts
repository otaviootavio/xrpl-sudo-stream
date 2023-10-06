import { Request, Response } from "express";
import { WalletModel } from "../models/walletModels";
import { Client, Transaction, Wallet } from "xrpl";

const client: Client = new Client("wss://s.altnet.rippletest.net:51233");

export const walletController = {
  createFromSeed: async (req: Request, res: Response) => {
    try {
      const { seed }: { seed: string } = req.body;
      const wallet: Wallet = await WalletModel.fromSeed(seed);
      res.json(wallet);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ error: `Failed to create wallet from seed: ${errorMessage}` });
    }
  },

  signTransaction: async (req: Request, res: Response) => {
    try {
      const {
        wallet,
        transaction,
      }: { wallet: Wallet; transaction: Transaction } = req.body;
      const { tx_blob, hash }: { tx_blob: string; hash: string } =
        await WalletModel.signTransaction(wallet, transaction);
      res.json({ tx_blob, hash });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ error: `Failed to sign transaction: ${errorMessage}` });
    }
  },

  generateWallet: async (_req: Request, res: Response) => {
    try {
      const wallet = await WalletModel.generate();
      res.json(wallet);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ error: `Failed to generate wallet: ${errorMessage}` });
    }
  },
};
