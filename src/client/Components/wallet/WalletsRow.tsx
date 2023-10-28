import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setCurrentWallet: Dispatch<SetStateAction<WalletDataType>>;
  setWalletList: Dispatch<SetStateAction<WalletDataType[]>>;
  walletList: WalletDataType[];
};

const WalletsRow = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNewWalletData = async () => {
    setIsLoading(true);
    const currentPath: Location = window.location;
    const curentUrl: URL = new URL(currentPath.href + "wallet/generate");

    await fetch(curentUrl.href, { method: "GET" })
      .then((response) => response.json())
      .then((data: WalletDataType) => {
        props.setWalletList((walletList) => [...walletList, data]);
        setIsLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar mensagem:", error));
  };

  return (
    <header>
      <p>
        {props.walletList.map((e) => (
          <a onClick={() => props.setCurrentWallet(e)} key={e.publicKey}>
            <i>{e.seed}</i>
          </a>
        ))}
        <a
          onClick={() => {
            fetchNewWalletData();
          }}
        >
          <i>{isLoading ? "Loading..." : "New wallet"}</i>
        </a>
      </p>
    </header>
  );
};

export default WalletsRow;
