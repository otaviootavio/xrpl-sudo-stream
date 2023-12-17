import React, { useState } from "react";
import { TxResponse } from "xrpl";
import { useAccountContext } from "../../context/AccountContext";
import { toast } from "sonner";

type FormData = {
  seed: string;
  amount: string;
  destination: string;
};

type Props = {};

const TransactionForm = (props: Props) => {
  const { account, setAccount } = useAccountContext();

  const [formData, setFormData] = useState<FormData>({
    seed: account?.seed || "",
    amount: "",
    destination: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const currentPath: Location = window.location;
      const currentUrl: URL = new URL(currentPath.href + "wallet/payment");
      const { seed, amount, destination } = formData;

      toast.message("Transaction was submitted", {
        description: `Amount: ${amount} XRP`,
      });

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
      toast.success("Transaction was a success!");
    } catch (error) {
      toast.error("An error occurred on transaction!");
      console.error(error);
    }
  };

  return (
    <aside>
      <h2>Payments</h2>
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
      <button onClick={handleSubmit}>{"Submit"}</button>
    </aside>
  );
};

export default TransactionForm;
