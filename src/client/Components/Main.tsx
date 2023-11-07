import React from "react";
import Wallet from "./wallet/Wallet";
import User from "./user/User";

export const Main: React.FC = () => {
  return (
    <main>
        <User />
        <Wallet />
    </main>
  );
};
