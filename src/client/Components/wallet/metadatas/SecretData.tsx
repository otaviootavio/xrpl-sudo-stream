import React, { useState } from 'react';
import './SecretData.css';
import { AiTwotoneEye, AiTwotoneEyeInvisible } from 'react-icons/ai';

interface SecretDataProps {
  text: string;
  label: string;
}

const SecretData: React.FC<SecretDataProps> = ({ text, label }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="secret-data">
      <label>{label}</label>
      <div className="input-container">
        <input readOnly type={isVisible ? "text" : "password"} value={text} />
        <span onClick={() => setIsVisible(!isVisible)} className="toggle-visibility">
          {isVisible ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
        </span>
      </div>
    </div>
  );
};

export default SecretData;