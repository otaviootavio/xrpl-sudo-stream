import React, { useState } from "react";
import WalletData from "./WalletData";
import TransactionForm from "./TransactionForm";
import WalletsRow from "./WalletsRow";

const Wallet: React.FC = () => {
  const [currentWallet, setCurrentWallet] = useState<WalletDataType | null>(null);
  const [walletList, setWalletList] = useState<WalletDataType[] | null>(null);

  return (
    <div>
      <section>
        <WalletsRow
          currentWallet={currentWallet}
          walletList={walletList}
          setWalletList={setWalletList}
          setCurrentWallet={setCurrentWallet}
        />
        <hr />
        <WalletData currentWallet={currentWallet} />
        {currentWallet && <TransactionForm  key={currentWallet.seed} currentWallet={currentWallet}/>}
      </section>
      <hr />
    </div>
  );
};

export default Wallet;
