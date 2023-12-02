import React, { useEffect, useState } from "react";
import CopyableText from "./metadatas/CopyableText";
import SecretData from "./metadatas/SecretData";

type Props = {
  currentWallet: WalletDataType | null;
};

const WalletData = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountBalances, setAccountBalances] = useState<
    Array<{ value: string; currency: string; issuer?: string }>
  >([]);

  const fetchAddressBallance = async (signal: AbortSignal) => {
    const currentPath: Location = window.location;
    const curentUrl: URL = new URL(currentPath.href + "wallet/balances");
    setIsLoading(true);

    await fetch(curentUrl.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: props.currentWallet?.classicAddress }),
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
    if(!props.currentWallet) return;
    // When changing between wallets, the data
    // arrives with delay. This cancel de data fetch

    const abortController: AbortController = new AbortController();
    const signal: AbortSignal = abortController.signal;
    setIsLoading(true);

    fetchAddressBallance(signal);

    return () => {
      abortController.abort();
    };
  }, [props.currentWallet]);

  return (
    <>
      <aside>
        <h2>Account data</h2>
        {props.currentWallet && (
          <>
            <CopyableText text={props.currentWallet.classicAddress} label="Account Address" />
            <CopyableText text={props.currentWallet.publicKey} label="Public Key" />
            <SecretData text={props.currentWallet.privateKey} label="Private Key" />
            <SecretData text={props.currentWallet.seed} label="Seed" />
          </>
        )}
      </aside>
      <aside>
        {isLoading ? "Loading..." : accountBalances.map((e, index) => (
          <div key={index}>
            {e.currency} {e.value}
          </div>
        ))}
      </aside>
    </>
  );
};

export default WalletData;
