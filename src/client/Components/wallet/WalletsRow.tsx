import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserContext } from "../user/UserContext";

type Props = {
  setCurrentWallet: Dispatch<SetStateAction<WalletDataType | null>>;
  setWalletList: Dispatch<SetStateAction<WalletDataType[] | null>>;
  walletList: WalletDataType[] | null;
  currentWallet: WalletDataType | null;
};

const WalletsRow = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  const fetchNewWalletData = async () => {
    setIsLoading(true);
    const currentPath: Location = window.location;
    const curentUrl: URL = new URL(currentPath.href + "wallet/generate");

    await fetch(curentUrl.href, { method: "GET" })
      .then((response) => response.json())
      .then((data: WalletDataType) => {
        props.walletList?.length == 0 ? props.setCurrentWallet(data) : "";

        props.setWalletList((walletList) => [...(walletList || []), data]);
        setIsLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar mensagem:", error));
  };
  const handleDeleteAllWallets = async () => {
    const token = await user?.getIdToken();
    if (!token || !user || !props.walletList) {
      return;
    }

    const currentPath = window.location;
    const curentUrl = new URL(
      `${currentPath.origin}/users/${user.uid}/wallets`
    );

    try {
      const response = await fetch(curentUrl.href, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Wallet deleted successfully");
      fetchWallets();
    } catch (error) {
      console.error("Error deleting wallet:", error);
    }
  };

  const handleSaveWallet = async () => {
    const token = await user?.getIdToken();
    if (!token || !user || !props.walletList) {
      return;
    }

    const walletSeeds: string[] = props.walletList?.map(
      (wallet: WalletDataType): string => {
        return wallet.seed;
      }
    );
    if (!walletSeeds) {
      return;
    }

    const currentPath = window.location;
    const curentUrl = new URL(
      `${currentPath.origin}/users/${user.uid}/wallets`
    );

    try {
      const response = await fetch(curentUrl.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ walletSeeds: walletSeeds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Wallet saved successfully");
    } catch (error) {
      console.error("Error saving wallet:", error);
    }
  };

  const fetchWallets = async () => {
    const token = await user?.getIdToken();

    if (!token || !user) {
      props.setWalletList(null);
      return;
    }

    const baseUrl = window.location;
    const fullUrl = new URL(`${baseUrl.origin}/users/${user.uid}/wallets`);
    if (!user?.uid) return;

    try {
      const response = await fetch(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      props.setWalletList(data.wallets);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [user]);

  return (
    <header>
      <p>
        {props.walletList?.map((e) =>
          e == props.currentWallet ? (
            <a onClick={() => props.setCurrentWallet(e)} key={e.publicKey}>
              <b>... {e.seed.slice(-5)}</b>
            </a>
          ) : (
            <a onClick={() => props.setCurrentWallet(e)} key={e.publicKey}>
              <i>... {e.seed.slice(-5)}</i>
            </a>
          )
        )}
        <a
          onClick={() => {
            fetchNewWalletData();
          }}
        >
          <i>{isLoading ? "Loading..." : "New wallet"}</i>
        </a>
        <button
          onClick={async () => {
            await handleSaveWallet();
          }}
        >
          Save Wallets
        </button>{" "}
        {"  "}
        <button
          onClick={async () => {
            await handleDeleteAllWallets();
          }}
        >
          Delete All
        </button>
      </p>
    </header>
  );
};

export default WalletsRow;
