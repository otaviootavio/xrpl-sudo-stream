import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import PublicHexDisplay from "./PublicHexDisplay";

interface IdenticonProps {
  classicAddress: string;
  setCurrentWallet: Dispatch<SetStateAction<WalletDataType | null>>;
  size?: number;
  thisWallet: WalletDataType;
}

const Identicon: React.FC<IdenticonProps> = ({
  thisWallet,
  setCurrentWallet,
  classicAddress,
  size = 64,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getColorFromPublicKey = (classicAddress: string): string => {
    const colorCode = classicAddress.slice(-3);
    return `#${colorCode.padEnd(6, "0")}`;
  };

  const color = getColorFromPublicKey(classicAddress);

  return (
    <div>
      <span onClick={() => setCurrentWallet(thisWallet)} style={{ marginRight: "10px", cursor: "pointer" }} >{classicAddress.slice(0, 6)}...</span>
      <PublicHexDisplay publicHex={classicAddress} />
    </div>
  );
};

export default Identicon;
