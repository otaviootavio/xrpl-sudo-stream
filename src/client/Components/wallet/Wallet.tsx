import React, { useState } from "react";
import WalletData from "./WalletData";
import TransactionForm from "./TransactionForm";
import SubmitForm from "./SubmitForm";
import WalletsRow from "./WalletsRow";

const Wallet: React.FC = () => {
  const [currentWallet, setCurrentWallet] = useState<WalletDataType>({
    publicKey: "",
    privateKey: "",
    classicAddress: "",
    seed: "",
  });

  const [walletList, setWalletList] = useState<WalletDataType[]>([]);

  if (walletList.length == 0)
    return (
      <div>
        <WalletsRow
          walletList={walletList}
          setWalletList={setWalletList}
          setCurrentWallet={setCurrentWallet}
          currentWallet={currentWallet}
        />
      </div>
    );

  return (
    <div>
      <WalletsRow
        currentWallet={currentWallet}
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
