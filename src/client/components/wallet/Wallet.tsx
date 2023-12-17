import React from "react";
import WalletData from "./WalletData";
import TransactionForm from "./TransactionForm";
import WalletsRow from "./WalletsRow";
import { useAccountContext } from "../../context/AccountContext";

const Wallet: React.FC = () => {
  const { account, setAccount } = useAccountContext();

  return (
    <div>
      <section>
        <WalletsRow />
        {account && <WalletData />}
        {account && <TransactionForm />}
      </section>
    </div>
  );
};

export default Wallet;
