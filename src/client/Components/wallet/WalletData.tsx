import React, { useEffect, useState } from "react";

type WalletData = {
  publicKey: string;
  privateKey: string;
  classicAddress: string;
  seed: string;
};

const WalletData = () => {
  const [walletData, setWalletData] = useState<WalletData>({
    publicKey: "",
    privateKey: "",
    classicAddress: "",
    seed: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWalletData = async () => {
    setIsLoading(true);
    const currentPath: Location = window.location;
    const curentUrl: URL = new URL(currentPath.href + "wallet/generate");

    await fetch(curentUrl.href, { method: "GET" })
      .then((response) => response.json())
      .then((data: WalletData) => {
        setWalletData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar mensagem:", error));
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label>
        classicAddress{" "}
        <input readOnly type="text" value={walletData?.classicAddress} />
      </label>
      <label>
        privateKey <input readOnly type="text" value={walletData?.privateKey} />
      </label>
      <label>
        publicKey <input readOnly type="text" value={walletData?.publicKey} />
      </label>
      <label>
        seed <input readOnly type="text" value={walletData?.seed} />
      </label>
      <button disabled={isLoading} onClick={fetchWalletData}>
        {isLoading ? "Loading" : "Update"}
      </button>
    </form>
  );
};

export default WalletData;
