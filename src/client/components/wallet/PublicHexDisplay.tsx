import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePaperClip } from "react-icons/ai";

interface PublicKeyDisplayProps {
  publicHex: string;
}

const PublicHexDisplay: React.FC<PublicKeyDisplayProps> = ({ publicHex }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicHex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <span style={{cursor: "pointer"}} onClick={copyToClipboard}>
      <span>{copied ? <AiOutlineCheckCircle /> : <AiOutlinePaperClip />} </span>
    </span>
  );
};

export default PublicHexDisplay;
