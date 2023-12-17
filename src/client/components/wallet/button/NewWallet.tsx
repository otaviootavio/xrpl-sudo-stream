import React from "react";
import { useAccountContext } from "../../../context/AccountContext";
import { useUserContext } from "../../../context/UserContext";
import { toast } from "sonner";

type Props = {};

const NewWallet = (props: Props) => {
  const { setAccount, accounts, setAccounts } = useAccountContext();

  const fetchNewWalletData = async () => {
    const currentPath: Location = window.location;
    const curentUrl: URL = new URL(currentPath.href + "wallet/generate");

    const promiseWallet = fetch(curentUrl.href, { method: "GET" })
      .then((response) => response.json())
      .then((data: WalletDataType) => {
        accounts?.length == 0 ? setAccount(data) : "";
        setAccounts((walletList) => [...(walletList || []), data]);
      })
      .catch((error) => console.error("Erro ao buscar mensagem:", error));

    toast.promise(promiseWallet, {
      loading: "Creating new wallet...",
      success: () => {
        return `Successfully created wallet!`;
      },
      error: "It was not possible to create a new wallet!",
    });
  };

  return (
    <button
      onClick={() => {
        fetchNewWalletData();
      }}
    >
      <i>{"New wallet"}</i>
    </button>
  );
};

export default NewWallet;
