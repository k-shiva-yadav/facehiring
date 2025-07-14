import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmEmail from './ConfirmEmail';
import './IdealQualifications.css';

const IdealQualifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMustHaveQualifications = location.state?.mustHaveQualifications || [
    '0-2 years of experience in user interface design',
    'Must be located in commutable distance to Hyderabad, Telangana, India'
  ];
  const initialPreferredQualifications = location.state?.preferredQualifications || [];

  const [mustHaveQualifications, setMustHaveQualifications] = useState(initialMustHaveQualifications);
  const [newMustHave, setNewMustHave] = useState('');
  const [preferredQualifications, setPreferredQualifications] = useState(initialPreferredQualifications);
  const [newPreferred, setNewPreferred] = useState('');
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleContinue = () => {
    setShowConfirmEmail(true);
  };

  const handleEmailConfirmed = (email) => {
    setShowConfirmEmail(false);
    navigate('/verify-email', { 
      state: { 
        email,
        mustHaveQualifications,
        preferredQualifications,
        questions: location.state?.questions,
        rejectionEnabled: location.state?.rejectionEnabled,
        notificationEmail: location.state?.notificationEmail,
        applicationManagement: location.state?.applicationManagement
      } 
    });
  };

  const addMustHave = () => {
    if (newMustHave.trim()) {
      setMustHaveQualifications([...mustHaveQualifications, newMustHave.trim()]);
      setNewMustHave('');
    }
  };

  const removeMustHave = (index) => {
    const updated = [...mustHaveQualifications];
    updated.splice(index, 1);
    setMustHaveQualifications(updated);
  };

  const addPreferred = () => {
    if (newPreferred.trim()) {
      setPreferredQualifications([...preferredQualifications, newPreferred.trim()]);
      setNewPreferred('');
    }
  };

  const removePreferred = (index) => {
    const updated = [...preferredQualifications];
    updated.splice(index, 1);
    setPreferredQualifications(updated);
  };

  return (
    <div className="qualifications-container">
      <div className="card">
        <div className="">
          <span className="">Post job</span> — Find people — <span className="">Review applications</span>
        </div>

        <h2 className="title">I've drafted qualifications to sort your applicants.</h2>
        <p className="subtitle">
          Feel free to add anything else you're looking for. These won't be seen by job seekers.
        </p>

        <div className="section">
          <h3 className="section-title">Ideal qualifications</h3>

          <div className="subsection">
            <h4 className="subsection-title">Must-have qualifications</h4>
            <p className="subsection-description">
              Your applicants must have these qualifications to be considered for the role.
            </p>
            <ul className="qualifications-list">
              {mustHaveQualifications.map((qual, index) => (
                <li key={index} className="qualification-item">
                  <span className="qualification-text">• {qual}</span>
                  <button 
                    onClick={() => removeMustHave(index)}
                    className="remove-btn"
                    aria-label="Remove qualification"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="add-qualification">
              <input
                type="text"
                value={newMustHave}
                onChange={(e) => setNewMustHave(e.target.value)}
                placeholder="Add a must-have qualification"
                className="qualification-input"
              />
              <button 
                onClick={addMustHave} 
                className="add-btn"
              >
                Add
              </button>
            </div>
          </div>

          <div className="subsection">
            <h4 className="subsection-title">Preferred qualifications</h4>
            <p className="subsection-description">
              Your applicants don't need to have these qualifications, but you prefer to hire someone with them.
            </p>
            {preferredQualifications.length > 0 ? (
              <ul className="qualifications-list">
                {preferredQualifications.map((qual, index) => (
                  <li key={index} className="qualification-item">
                    <span className="qualification-text">• {qual}</span>
                    <button 
                      onClick={() => removePreferred(index)}
                      className="remove-btn"
                      aria-label="Remove qualification"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-qualifications">You have no preferred qualifications</p>
            )}
            <div className="add-qualification">
              <input
                type="text"
                value={newPreferred}
                onChange={(e) => setNewPreferred(e.target.value)}
                placeholder="Add a preferred qualification"
                className="qualification-input"
              />
              <button 
                onClick={addPreferred} 
                className="add-btn"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            Back
          </button>
          <button 
            onClick={handleContinue} 
            className="continue-button"
          >
            Continue
          </button>
        </div>
      </div>

      {showConfirmEmail && (
        <ConfirmEmail 
          onClose={() => setShowConfirmEmail(false)} 
          onSendCode={handleEmailConfirmed}
        />
      )}
    </div>
  );
};

export default IdealQualifications;