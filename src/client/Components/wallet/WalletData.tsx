import React, { useEffect, useState } from "react";

type Props = {
  currentWallet: WalletDataType;
};

const WalletData = (props: Props) => {
  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
      </form>
    </section>
  );
};

export default WalletData;
