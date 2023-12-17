import React from "react";
import Wallet from "./wallet/Wallet";
import { UserProvider } from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { AccountProvider } from "../context/AccountContext";
import { Toaster } from "sonner";

export const Main: React.FC = () => {
  return (
    <main>
      <UserProvider>
        <AccountProvider>
          <Wallet />
          <Toaster richColors expand={true} />
        </AccountProvider>
      </UserProvider>
    </main>
  );
};
