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
      setIsLoading(false);
    }
  };

  return (
    <>
      <aside>
        <label>tx_blob: </label>
        <input
          type="text"
          value={txBlob}
          onChange={(e) => {
            setTxBlob(e.target.value);
          }}
        />
        <button disabled={isLoading} onClick={submitSignedTransaction}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <textarea style={{ height: "100px" }} value={submitResponse} readOnly />
      </aside>
    </>
  );
};

export default SubmitForm;
