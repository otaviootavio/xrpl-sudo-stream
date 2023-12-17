import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { useAccountContext } from "../../../context/AccountContext";
import { toast } from "sonner";

type Props = {};

const SaveWallet = (props: Props) => {
  const { user } = useUserContext();
  const { accounts: accounts } = useAccountContext();

  const handleSaveWallet = async () => {
    const token = await user?.getIdToken();
    if (!token || !user || !accounts) {
      return;
    }

    const walletSeeds: string[] = accounts?.map(
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
      const awaitResponse = fetch(curentUrl.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ walletSeeds: walletSeeds }),
      });

      toast.promise(awaitResponse, {
        loading: "Saving wallets...",
        success: () => {
          return `Successfully saved the wallets!`;
        },
        error: "It was not possible save the walles!",
      });

      const response = await awaitResponse;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Wallet saved successfully");
    } catch (error) {
      console.error("Error saving wallet:", error);
    }
  };

  return (
    <button
      onClick={async () => {
        await handleSaveWallet();
      }}
    >
      Save Wallets
    </button>
  );
};

export default SaveWallet;
