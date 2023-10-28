import React, { useState } from "react";
import WalletData from "./WalletData";
import TransactionForm from "./TransactionForm";
import SubmitForm from "./SubmitForm";
import WalletsRow from "./WalletsRow";

const Wallet: React.FC = () => {
  const [currentWallet, setCurrentWallet] = useState<WalletDataType>({
    publicKey: "0",
    privateKey: "0",
    classicAddress: "0",
    seed: "0",
  });

  const [walletList, setWalletList] = useState<WalletDataType[]>([]);

  return (
    <div>
      <WalletsRow
        walletList={walletList}
        setWalletList={setWalletList}
        setCurrentWallet={setCurrentWallet}
      />
      <WalletData currentWallet={currentWallet} />
      <TransactionForm />
      <SubmitForm />
    </div>
  );
};

export default Wallet;
