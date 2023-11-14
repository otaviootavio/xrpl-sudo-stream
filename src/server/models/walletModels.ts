import { Wallet, Client, Transaction, TxResponse } from "xrpl";

export const WalletModel = {
  fromSeed: async (seed: string): Promise<Wallet> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const wallet = Wallet.fromSeed(seed);

    await client.disconnect();
    return wallet;
  },

  signTransaction: async (
    seed: string,
    transaction: Transaction
  ): Promise<{ tx_blob: string; hash: string }> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const wallet: Wallet = Wallet.fromSeed(seed);  
    const preparedTx: Transaction = await client.autofill(transaction);
    const {tx_blob, hash}: {tx_blob: string, hash: string} = await wallet.sign(preparedTx);

    await client.disconnect();
    return {tx_blob, hash};
  },

  generate: async (): Promise<Wallet> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const wallet: Wallet = Wallet.generate();
    await client.fundWallet(wallet)
    await client.disconnect();
    return wallet;
  },

  getBalances: async (address: string): Promise<Array<{ value: string; currency: string; issuer?: string | undefined }>> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    const balanceData: Array<{ value: string; currency: string; issuer?: string | undefined }> = await client.getBalances(address)
    await client.disconnect();
    return balanceData;
  },

  submitTxBlob: async (txBlob: string): Promise<TxResponse> => {
    const client: Client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    const response: TxResponse = await client.submitAndWait(txBlob)
    await client.disconnect();
    return response;
  },
};
