import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import PublicKeyDisplay from "./PublicKeyDisplay";

interface IdenticonProps {
  publicKey: string;
  setCurrentWallet: Dispatch<SetStateAction<WalletDataType | null>>;
  size?: number;
  thisWallet: WalletDataType;
}

const Identicon: React.FC<IdenticonProps> = ({
  thisWallet,
  setCurrentWallet,
  publicKey,
  size = 64,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getColorFromPublicKey = (publicKey: string): string => {
    const colorCode = publicKey.slice(-3);
    return `#${colorCode.padEnd(6, "0")}`;
  };

  const color = getColorFromPublicKey(publicKey);

  return (
    <div>
      <span onClick={() => setCurrentWallet(thisWallet)} style={{ marginRight: "10px", cursor: "pointer" }} >{publicKey.slice(0, 6)}...</span>
      <PublicKeyDisplay publicKey={publicKey} />
    </div>
  );
};

export default Identicon;
