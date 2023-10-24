import React, { useState } from "react";
import { decode } from "xrpl";

const SubmitForm = () => {
  const [submitResponse, setSubmitResponse] = useState<string>("");
  const [txBlob, setTxBlob] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const submitSignedTransaction = async () => {
    try {
      setIsLoading(true);
      const currentPath: Location = window.location;
      const currentUrl: URL = new URL(currentPath.href + "wallet/submit");

      const response = await fetch(currentUrl.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: "submit",
          tx_blob: txBlob,
        }),
      });
      const result = await response.json();

      setSubmitResponse(JSON.stringify(result, null, 2));
      setIsLoading(false);
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
        tx_blob:{" "}
        <input
          type="text"
          value={txBlob}
          onChange={(e) => {
            setTxBlob(e.target.value);
          }}
        />
      </label>
      <button disabled={isLoading} onClick={submitSignedTransaction}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <textarea
        style={{
          height: "1000px",
        }}
        value={submitResponse}
        readOnly
      />
    </form>
  );
};

export default SubmitForm;
