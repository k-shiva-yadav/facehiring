import React, { useState } from 'react';
import './ConfirmEmail.css';

const ConfirmEmail = ({ onClose, onSendCode }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    onSendCode(email);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose} aria-label="Close popup">
          ×
        </button>
        <h3 className="popup-title">Confirm your company email address</h3>
        <div className="company-info">
          <img src="https://via.placeholder.com/40x40?text=XYZ" alt="Company Logo" className="company-logo" />
          <img src="https://via.placeholder.com/40x40?text=User" alt="User Avatar" className="user-avatar" />
        </div>
        <p className="description">
          To confirm you work with XYZ Company Pvt. Ltd., we’ll need to send a verification code to your company email address. Enter your company email address:*
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address (example@example.com)"
          className="email-input"
        />
        <ul className="notes-list">
          <li className="note-item">This email address will be added to your account</li>
          <li className="note-item">Your organization will see your email address is confirmed</li>
          <li className="note-item">We’ll ask permission before sharing any other information with your organization</li>
        </ul>
        <button className="send-code-btn" onClick={handleSendCode}>
          Send code
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmail;