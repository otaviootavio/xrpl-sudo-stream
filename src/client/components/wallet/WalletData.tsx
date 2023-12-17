import React, { useEffect, useState } from "react";
import CopyableText from "./metadatas/CopyableText";
import SecretData from "./metadatas/SecretData";
import { useAccountContext } from "../../context/AccountContext";

type Props = {};

const WalletData = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountBalances, setAccountBalances] = useState<
    Array<{ value: string; currency: string; issuer?: string }>
  >([]);
  const { account } = useAccountContext();

  const fetchAddressBallance = async (signal: AbortSignal) => {
    const currentPath: Location = window.location;
    const curentUrl: URL = new URL(currentPath.href + "wallet/balances");
    setIsLoading(true);

    await fetch(curentUrl.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: account?.classicAddress }),
    })
      .then((response) => response.json())
      .then(
        (
          data: Array<{
            value: string;
            currency: string;
            issuer?: string | undefined;
          }>
        ) => {
          if (signal.aborted) return;
          setAccountBalances(data);
          setIsLoading(false);
        }
      )
      .catch((error) => console.error("Erro ao buscar mensagem:", error));
  };

  useEffect(() => {
    if (!account) return;
    // When changing between wallets, the data
    // arrives with delay. This cancel de data fetch

    const abortController: AbortController = new AbortController();
    const signal: AbortSignal = abortController.signal;
    setIsLoading(true);

    fetchAddressBallance(signal);

    return () => {
      abortController.abort();
    };
  }, [account?.classicAddress]);

  return (
    <>
      <aside>
        <h2>Account data</h2>
        {account && (
          <>
            <CopyableText
              text={account.classicAddress}
              label="Account Address"
            />
            <CopyableText text={account.publicKey} label="Public Key" />
            <SecretData text={account.privateKey} label="Private Key" />
            <SecretData text={account.seed} label="Seed" />
          </>
        )}
      </aside>
      <aside>
        <h2>Account ballance</h2>
        {isLoading
          ? "Loading..."
          : accountBalances.map((e, index) => (
              <div key={index}>
                <b>{e.currency}:</b> {e.value}
              </div>
            ))}
      </aside>
    </>
  );
};

export default WalletData;
