import React from "react";
import Wallet from "./wallet/Wallet";
import { UserProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountProvider } from "../context/AccountContext";

export const Main: React.FC = () => {
  return (
    <main>
      <UserProvider>
        <AccountProvider>
          <Wallet />
          <ToastContainer />
        </AccountProvider>
      </UserProvider>
    </main>
  );
};
