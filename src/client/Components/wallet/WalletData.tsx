import React, { useEffect, useState } from "react";

type Props = {
  currentWallet: WalletDataType;
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
      body: JSON.stringify({ address: props.currentWallet.classicAddress }),
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
    <section>
      <aside>
        <label>
          classicAddress{" "}
          <input
            readOnly
            type="text"
            value={props.currentWallet?.classicAddress}
          />
        </label>
        <label>
          privateKey{" "}
          <input readOnly type="text" value={props.currentWallet?.privateKey} />
        </label>
        <label>
          publicKey{" "}
          <input readOnly type="text" value={props.currentWallet?.publicKey} />
        </label>
        <label>
          seed <input readOnly type="text" value={props.currentWallet?.seed} />
        </label>
      </aside>
      <aside>
        {isLoading
          ? "Loading..."
          : Array.isArray(accountBalances) &&
            accountBalances.map((e) => (
              <div key={props.currentWallet.publicKey}>
                {e.currency} {e.value}
              </div>
            ))}
      </aside>
    </section>
  );
};

export default WalletData;
