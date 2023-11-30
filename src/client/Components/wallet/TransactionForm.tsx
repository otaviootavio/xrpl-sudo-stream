import React, { useState } from "react";
import { toast } from "react-toastify";
import { TxResponse } from "xrpl";

type FormData = {
  seed: string;
  amount: string;
  destination: string;
};

type APIResponse = {
  tx_blob: string;
  hash: string;
};

type Props = {
  currentWallet: WalletDataType;
};

const TransactionForm = (props: Props) => {
  const [formData, setFormData] = useState<FormData>({
    seed: props.currentWallet.seed,
    amount: "",
    destination: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [response, setResponse] = useState<TxResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      const currentPath: Location = window.location;
      const currentUrl: URL = new URL(currentPath.href + "wallet/payment");
      const { seed, amount, destination } = formData;
      console.log([seed, amount, destination]);

      const res = await fetch(currentUrl.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seed: seed,
          amount: `${amount}000000`,
          destination: destination,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to complete the transaction.");
      }

      const data: TxResponse = await res.json();
      setResponse(data);
      setIsLoading(false);
      toast("Sucess!");
    } catch (error) {
      console.error(error);
      toast.error("Error!");
      setIsLoading(false);
    }
  };

  return (
    <aside>
      <label>
        Amount (XRP):
        <input
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              amount: e.target.value,
            }))
          }
          placeholder="Amount"
        />
      </label>

      <label>
        Destination:
        <input
          type="text"
          value={formData.destination}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              destination: e.target.value,
            }))
          }
          placeholder="Destination"
        />
      </label>
      <button disabled={isLoading} onClick={handleSubmit}>
        {!isLoading ? "Submit" : "Loading"}
      </button>
    </aside>
  );
};

export default TransactionForm;
