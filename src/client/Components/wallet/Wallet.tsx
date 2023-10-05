import React, { useEffect, useState } from 'react'

const Wallet: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
  
    useEffect(() => {
      fetch('http://localhost:3000/hello')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error('Erro ao buscar mensagem:', error));
    }, []);
  
    return (
      <div>
        {message ? message : 'Carregando...'}
      </div>
    );
  };
  

export default Wallet