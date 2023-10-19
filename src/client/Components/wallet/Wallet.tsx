import React from 'react'
import WalletData from './WalletData';
import TransactionForm from './TransactionForm';


const Wallet: React.FC = () => {
    
    return (
      <div>
        {<WalletData /> }
        <TransactionForm />
      </div>
    );
  };
  

export default Wallet