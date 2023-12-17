import React, { createContext, useContext, useState } from "react";

interface IWalletDataType {
  account: WalletDataType | null;
  setAccount: React.Dispatch<React.SetStateAction<WalletDataType | null>>;
  accounts: WalletDataType[] | null;
  setAccounts: React.Dispatch<React.SetStateAction<WalletDataType[] | null>>;
}
const AccountContext = createContext<IWalletDataType>({
  account: null,
  setAccount: () => {},
  accounts: null,
  setAccounts: () => {},
});

const useAccountContext = () => useContext<IWalletDataType>(AccountContext);

const AccountProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [account, setAccount] = useState<WalletDataType | null>(null);
  const [accounts, setAccounts] = useState<WalletDataType[] | null>(null);

  //   const handleClick = async () => {
  //     if (!account) {
  //       const account: WalletDataType | null = await signInwithGoogle();
  //       setAccount(account);
  //     } else {
  //       await signOutGoogle();
  //       setAccount(null);
  //     }
  //   };

  //   useEffect(() => {
  //     onAuthStateChangeGoogle(setUser);
  //   }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        accounts,
        setAccounts,
      }}
    >
      <>{children}</>
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext, useAccountContext };
