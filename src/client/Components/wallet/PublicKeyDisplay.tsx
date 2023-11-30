import React, { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";

interface PublicKeyDisplayProps {
  publicKey: string;
}

const PublicKeyDisplay: React.FC<PublicKeyDisplayProps> = ({ publicKey }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div style={{cursor: "pointer"}} onClick={copyToClipboard}>
      <p>{copied ? "Copied!" : "Copy"} <AiOutlinePaperClip /></p>
    </div>
  );
};

export default PublicKeyDisplay;
