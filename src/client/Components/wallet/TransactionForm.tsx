import React, { useState } from "react";
import SubmitForm from "./SubmitForm";

// Types
type Transaction = {
  TransactionType: string;
  Account: string;
  Amount: string;
  Destination: string;
};

type FormData = {
  seed: string;
  transaction: Transaction;
};

type APIResponse = {
  tx_blob: string;
  hash: string;
};

const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    seed: "",
    transaction: {
      TransactionType: "",
      Account: "",
      Amount: "",
      Destination: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [response, setResponse] = useState<APIResponse>({
    tx_blob: "",
    hash: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const currentPath: Location = window.location;
      const currentUrl: URL = new URL(currentPath.href + "wallet/sign");

      const res = await fetch(currentUrl.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to complete the transaction.");
      }

      const data = await res.json();
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Seed:
          <input
            type="text"
            value={formData.seed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, seed: e.target.value }))
            }
            placeholder="Seed"
          />
        </label>
        <label>
          Transaction Type:
          <input
            type="text"
            value={formData.transaction.TransactionType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                transaction: {
                  ...prev.transaction,
                  TransactionType: e.target.value,
                },
              }))
            }
            placeholder="Transaction Type"
          />
        </label>
        <label>
          Account:
          <input
            type="text"
            value={formData.transaction.Account}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                transaction: { ...prev.transaction, Account: e.target.value },
              }))
            }
            placeholder="Account"
          />
        </label>

        <label>
          Amount:
          <input
            type="text"
            value={formData.transaction.Amount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                transaction: { ...prev.transaction, Amount: e.target.value },
              }))
            }
            placeholder="Amount"
          />
        </label>

        <label>
          Destination:
          <input
            type="text"
            value={formData.transaction.Destination}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                transaction: {
                  ...prev.transaction,
                  Destination: e.target.value,
                },
              }))
            }
            placeholder="Destination"
          />
        </label>
        <button disabled={isLoading} type="submit">
          Submit
        </button>
        <textarea
          style={{
            height: "100px",
          }}
          value={JSON.stringify(response)}
          readOnly
        />
      </form>
    </div>
  );
};

export default TransactionForm;
