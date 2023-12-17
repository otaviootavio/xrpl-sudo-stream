import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import Identicon from "./Identicon";
import { useAccountContext } from "../../context/AccountContext";
import SaveWallet from "./button/SaveWallets";
import DeleteAll from "./button/DeleteAll";
import NewWallet from "./button/NewWallet";

type Props = {};

const WalletsRow = (props: Props) => {
  const { user } = useUserContext();
  const { account, accounts, setAccounts } = useAccountContext();
  const [isLoadingWalletList, setIsLoadingWalletList] =
    useState<boolean>(false);

  const fetchWallets = async () => {
    const token = await user?.getIdToken();

    if (!token || !user) {
      setAccounts(null);
      return;
    }

    const baseUrl = window.location;
    const fullUrl = new URL(`${baseUrl.origin}/users/${user.uid}/wallets`);
    if (!user?.uid) return;

    try {
      setIsLoadingWalletList(true);
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
      setAccounts(data.wallets);
      setIsLoadingWalletList(false);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [user?.uid]);

  return (
    <header>
      <>
        <NewWallet />
        <SaveWallet />
        <DeleteAll />
        <div>
          {accounts?.map((e) =>
            e == account ? (
              <a key={e.classicAddress}>
                <b>
                  <Identicon thisWallet={e} classicAddress={e.classicAddress} />
                </b>
              </a>
            ) : (
              <a key={e.publicKey}>
                <i>
                  <Identicon thisWallet={e} classicAddress={e.classicAddress} />
                </i>
              </a>
            )
          )}
        </div>
      </>
    </header>
  );
};

export default WalletsRow;
