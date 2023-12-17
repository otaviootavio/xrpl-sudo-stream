import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { useAccountContext } from "../../../context/AccountContext";
import { toast } from "sonner";

type Props = {};

const DeleteAll = (props: Props) => {
  const { user } = useUserContext();
  const { accounts, setAccounts } = useAccountContext();

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
      const awaitResponse = fetch(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      const data = await response.json();
      setAccounts(data.wallets);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const handleDeleteAllWallets = async () => {
    const token = await user?.getIdToken();
    if (!token || !user || !accounts) {
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

  return (
    <button
      onClick={async () => {
        await handleDeleteAllWallets();
      }}
    >
      Delete All
    </button>
  );
};

export default DeleteAll;
