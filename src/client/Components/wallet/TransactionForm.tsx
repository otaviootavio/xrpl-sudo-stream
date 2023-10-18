import React, { useState } from "react";

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
    seed: "sEdVQ6fte9nECzrboSeVzwmpLmJCdAM",
    transaction: {
      TransactionType: "Payment",
      Account: "r4JiVkDfLSTLqGFVMkuoEYR1n6qj84gSqb",
      Amount: "200",
      Destination: "r4JiVkDfLSTLqGFVMkuoEYR1n6qj84gSqb",
    },
  });

  const [response, setResponse] = useState<APIResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/wallet/sign", {
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

        <button type="submit">Submit</button>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <form className="my-5">
          <label>tx_blob: <input readOnly type="text" value={response.tx_blob} /></label>
          <label>hash: <input readOnly type="text" value={response.hash} /></label>
        </form>
      )}
    </div>
  );
};

export default TransactionForm;
