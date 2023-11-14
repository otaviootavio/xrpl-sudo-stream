import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChangeGoogle,
  signInwithGoogle,
  signOutGoogle,
} from "../auth/GoogleAuth";
import { User } from "firebase/auth";

interface IUserContext {
  user: User | null;
}
const UserContext = createContext<IUserContext>({ user: null});

const useUserContext = () => useContext<IUserContext>(UserContext);

const UserProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const handleClick = async () => {
    if (!user) {
      const user: User | null = await signInwithGoogle();
      const token: string = (await user?.getIdToken()) || "";
      setUser(user);
      setToken(token);
    } else {
      await signOutGoogle();
      setUser(null);
    }
  };

  useEffect(() => {
    onAuthStateChangeGoogle(setUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      <nav>
        <ul>
          <span>{user ? user.displayName : ""}</span>
          <a onClick={handleClick}>{user ? "Logout!" : "Login"}</a>
          {/* ADD USER DETAILS COMPONENT */}
        </ul>
      </nav>
      <div>{children}</div>
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext, useUserContext };
