import React from "react";
import Wallet from "./wallet/Wallet";
import { UserProvider } from "./user/UserContext";

export const Main: React.FC = () => {
  
  return (
    <main>
        <UserProvider>
          <Wallet />
        </UserProvider>
    </main>
  );
};
