import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {};

const User = (props: Props) => {
  const [userId, setUserId] = useState<string>("");

  const handleClick = () => {
    if (userId) {
      localStorage.removeItem("userId");
      setUserId("");
    } else {
      fetchUserId();
    }
  };

  const fetchUserId = async () => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserId(data.uid);
        sessionStorage.setItem("userId", userId);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    const sessionUserId = sessionStorage.getItem("userId");

    if (sessionUserId != null) {
      setUserId(sessionUserId);
    }

    fetchUserId();
  }, [setUserId]);

  return (
    <>
      <nav>
        <ul>
          <a onClick={handleClick}>{userId ? "Logout!" : "Login"}</a>
          <li>{userId}</li>
        </ul>
      </nav>
    </>
  );
};

export default User;
