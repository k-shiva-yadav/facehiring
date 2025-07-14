import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6 || !/^\d{6}$/.test(fullCode)) {
      alert('Please enter a valid 6-digit code');
      return;
    }
    navigate('/review-job', { state: location.state });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3 className="popup-title">Verify your email</h3>
        <div className="company-info">
          <img src="https://via.placeholder.com/40x40?text=XYZ" alt="Company Logo" className="company-logo" />
          <img src="https://via.placeholder.com/40x40?text=User" alt="User Avatar" className="user-avatar" />
        </div>
        <p className="description">
          Please check your email for a message with the verification code. Your code is 6 numbers long.
        </p>
        <label className="code-label">Enter the code:*</label>
        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              maxLength="1"
              className="code-input"
            />
          ))}
        </div>
        <button className="verify-btn" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;