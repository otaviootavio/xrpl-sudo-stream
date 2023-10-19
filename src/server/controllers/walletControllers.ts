import { Request, Response } from "express";
import { WalletModel } from "../models/walletModels";
import {  SubmitRequest, SubmitResponse, Transaction, TxResponse, Wallet } from "xrpl";
import { validateBaseTransaction } from "xrpl/dist/npm/models/transactions/common";

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
        seed,
        transaction,
      }: { seed: string; transaction: Transaction } = req.body;
      const { tx_blob, hash }: { tx_blob: string; hash: string } =
        await WalletModel.signTransaction(seed, transaction);
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
      const wallet: Wallet = await WalletModel.generate();
      res.json(wallet);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ error: `Failed to generate wallet: ${errorMessage}` });
    }
  },
  
  submitSignedTransaction: async (_req: Request, res: Response) => {
    try {

      const txResponse: TxResponse = await WalletModel.submitTxBlob(_req.body.tx_blob);
      res.json(txResponse);
      
    } catch (error) {
      const errorMessage = (error as Error).message;
      res
        .status(500)
        .json({ error: `Failed to submit signed transaction: ${errorMessage}` });
    }
  },
};
