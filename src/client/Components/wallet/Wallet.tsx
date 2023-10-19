import React from 'react'
import WalletData from './WalletData';
import TransactionForm from './TransactionForm';
import SubmitForm from './SubmitForm';


const Wallet: React.FC = () => {
    
    return (
      <div>
        <WalletData />
        <TransactionForm />
        <SubmitForm />
      </div>
    );
  };
  

export default Wallet