import React, { useState } from "react";

type Props = {
  response: {
    tx_blob: string;
    hash: string;
  };
};

const SubmitForm = (props: Props) => {
  const [data, setData] = useState<string>("");

  const submitSignedTransaction = async () => {
    try {
      const response = await fetch("http://localhost:3000/wallet/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: "submit",
          tx_blob: props.response.tx_blob,
        }),
      });

      const result = await response.json();
      setData(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="my-5"
    >
      <label>
        tx_blob: <input readOnly type="text" value={props.response.tx_blob} />
      </label>
      <label>
        hash: <input readOnly type="text" value={props.response.hash} />
      </label>
      <button onClick={submitSignedTransaction}>Submit</button>
      <textarea
        style={{
          height: "1000px",
        }}
        value={data}
        readOnly
      />
    </form>
  );
};

export default SubmitForm;
