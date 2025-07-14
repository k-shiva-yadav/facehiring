import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ScreeningQuestions.css';

const ScreeningQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuestions = location.state?.questions || [
    { id: 1, text: 'Do you have experience with UI design tools like Figma or Sketch?', isRequired: true },
    { id: 2, text: 'Are you located in or willing to relocate to Hyderabad?', isRequired: true },
    { id: 3, text: 'How many years of experience do you have in UI design?', isRequired: true }
  ];
  const initialRejectionEnabled = location.state?.rejectionEnabled ?? true;
  const initialNotificationEmail = location.state?.notificationEmail || 'xyz@gmail.com';
  const initialApplicationManagement = location.state?.applicationManagement || 'On Facehiring';

  const [questions, setQuestions] = useState(initialQuestions);
  const [rejectionEnabled, setRejectionEnabled] = useState(initialRejectionEnabled);
  const [notificationEmail, setNotificationEmail] = useState(initialNotificationEmail);
  const [applicationManagement, setApplicationManagement] = useState(initialApplicationManagement);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleQuestionChange = (id, text) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId, text: '', isRequired: true }]);
    setEditingQuestion(newId);
    setEditedText('');
    setShowEditPopup(true);
  };

  const removeQuestion = (id) => {
    if (questions.length <= 3) {
      alert('You must have at least 3 screening questions');
      return;
    }
    setQuestions(questions.filter(q => q.id !== id));
  };

  const openEditPopup = (question) => {
    setEditingQuestion(question.id);
    setEditedText(question.text);
    setShowEditPopup(true);
  };

  const saveEditedQuestion = () => {
    if (editedText.trim() === '') {
      alert('Question cannot be empty');
      return;
    }
    handleQuestionChange(editingQuestion, editedText);
    setShowEditPopup(false);
  };

  const handleContinue = () => {
    const emptyQuestions = questions.filter(q => !q.text.trim());
    if (emptyQuestions.length > 0) {
      alert('Please fill in all screening questions');
      return;
    }
    navigate('/idealqualifications', { 
      state: { 
        questions,
        rejectionEnabled,
        notificationEmail,
        applicationManagement
      } 
    });
  };

  return (
    <div className="screening-container">
      <div className="card">
        <div className="progress-bar">
          <span className="progress-step active">Post job</span> — Find people — <span className="progress-step">Review applications</span>
        </div>

        <h2 className="title">Job settings</h2>
        <p className="subtitle">Your preferences determine how you evaluate and gather applications.</p>

        <div className="section">
          <h3 className="section-title">Screening questions</h3>
          <p className="section-note">
            <span className="highlight">None</span><br />
            We suggest adding at least three questions. Candidates must respond to each question.
          </p>

          <div className="questions-list">
            {questions.map((question) => (
              <div key={question.id} className="question-item">
                <p className="question-text">{question.text}</p>
                <div className="question-actions">
                  <button 
                    onClick={() => openEditPopup(question)}
                    className="edit-btn"
                    aria-label="Edit question"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                    </svg>
                  </button>
                  {questions.length > 3 && (
                    <button 
                      onClick={() => removeQuestion(question.id)}
                      className="remove-btn"
                      aria-label="Remove question"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addQuestion} 
            className="add-question-btn"
          >
            + Add a question
          </button>
        </div>

        <div className="section">
          <h3 className="section-title">Rejection settings</h3>
          <label className="toggle-group">
            <input
              type="checkbox"
              checked={rejectionEnabled}
              onChange={() => setRejectionEnabled(!rejectionEnabled)}
              className="toggle-checkbox"
            />
            <span className="toggle-text">
              <span className="highlight">Enabled</span><br />
              Automatically filter and decline applicants who don't provide suitable answers to essential screening questions.
            </span>
          </label>
        </div>

        <div className="section">
          <h3 className="section-title">Manage Applications</h3>
          <select
            value={applicationManagement}
            onChange={(e) => setApplicationManagement(e.target.value)}
            className="select-input"
          >
            <option value="On Facehiring">On Facehiring</option>
            <option value="Email Only">Email Only</option>
            <option value="Both">Both</option>
          </select>
          {applicationManagement === 'On Facehiring' && (
            <p className="notification-note">
              Application updates will be sent to {notificationEmail}
            </p>
          )}
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

        {showEditPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3 className="popup-title">Edit screening question</h3>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="popup-textarea"
                placeholder="Enter your question"
                rows="3"
              />
              <div className="popup-buttons">
                <button 
                  onClick={() => setShowEditPopup(false)}
                  className="popup-cancel-btn"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEditedQuestion}
                  className="popup-save-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ScreeningQuestions;