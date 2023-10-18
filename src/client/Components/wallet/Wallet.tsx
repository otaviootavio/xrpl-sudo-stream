import React, { useEffect, useState } from 'react'
import WalletData from './WalletData';
import TransactionForm from './TransactionForm';

type Data = {
  publicKey: string,
  privateKey: string,
  classicAddress: string,
  seed: string,
}

const Wallet: React.FC = () => {
    const [walletData, setWalletData] = useState<Data | null>(null);
  
    useEffect(() => {
      fetch('http://localhost:3000/wallet/generate', {method: "GET"})
        .then(response => response.json())
        .then((data: Data) => {setWalletData(data)})
        .catch(error => console.error('Erro ao buscar mensagem:', error));
    }, []);
  
    return (
      <div>
        {walletData ? <WalletData data={walletData}/>  : "Carregando..." }
        <TransactionForm />
      </div>
    );
  };
  

export default Wallet