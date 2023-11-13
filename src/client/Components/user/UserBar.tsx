import React, {
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChangeGoogle,
  signInwithGoogle,
  signOutGoogle,
} from "../auth/GoogleAuth";
import { User, onAuthStateChanged } from "firebase/auth";

type Props = {};

const UserBar = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const handleClick = async () => {
    if (!user) {
      const user: User | null = await signInwithGoogle();
      setUser(user);
    } else {
      await signOutGoogle();
      setUser(null);
      // fetchUserId();
    }
  };

  useEffect(() => {
    onAuthStateChangeGoogle(setUser);
  }, []);

  return (
    <>
      <nav>
        <ul>
          <span>{user ? user.displayName : ""}</span>
          <a onClick={handleClick}>{user ? "Logout!" : "Login"}</a>
          {/* ADD USER DETAILS COMPONENT */}
        </ul>
      </nav>
    </>
  );
};

export default UserBar;
