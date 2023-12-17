import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import PublicHexDisplay from "./PublicHexDisplay";
import { useAccountContext } from "../../context/AccountContext";

interface IdenticonProps {
  classicAddress: string;
  size?: number;
  thisWallet: WalletDataType;
}

const Identicon: React.FC<IdenticonProps> = ({
  thisWallet,
  classicAddress,
  size = 64,
}) => {
  const { account, setAccount } = useAccountContext();

  return (
    <>
      <span
        onClick={() => {
          setAccount(thisWallet);
        }}
        style={{ marginRight: "10px", cursor: "pointer" }}
      >
        {classicAddress.slice(0, 6)}...
      </span>
      <PublicHexDisplay publicHex={classicAddress} />
    </>
  );
};

export default Identicon;
