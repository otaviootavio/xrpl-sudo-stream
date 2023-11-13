import React from "react";
import Wallet from "./wallet/Wallet";
import UserBar from "./user/UserBar";

export const Main: React.FC = () => {
  
  return (
    <main>
        <UserBar />
        <Wallet />
    </main>
  );
};
