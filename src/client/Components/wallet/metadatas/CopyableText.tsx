import React, { useState } from 'react';
import './CopyableText.css';
import { AiOutlineCheckCircle, AiOutlinePaperClip } from 'react-icons/ai';

interface CopyableTextProps {
  text: string;
  label: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="copyable-text">
      <label>{label}</label>
      <div className="input-container">
        <input readOnly type="text" value={text} />
        <span onClick={copyToClipboard} className="copy-button">
          {copied ? <AiOutlineCheckCircle /> : <AiOutlinePaperClip />}
        </span>
      </div>
    </div>
  );
};

export default CopyableText;
