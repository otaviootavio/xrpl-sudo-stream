import { Wallet, Client, Transaction } from "xrpl";

export const WalletModel = {
  fromSeed: async (seed: string): Promise<Wallet> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const wallet = Wallet.fromSeed(seed);

    await client.disconnect();
    return wallet;
  },

  signTransaction: async (
    wallet: Wallet,
    transaction: Transaction
  ): Promise<{ tx_blob: string; hash: string }> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    await client.autofill(transaction);
    const { tx_blob, hash }: { tx_blob: string; hash: string } =
      await wallet.sign(transaction);

    await client.disconnect();
    return {
      tx_blob,
      hash,
    };
  },

  generate: async (): Promise<Wallet> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const wallet: Wallet = Wallet.generate();

    await client.disconnect();
    return wallet;
  },
};