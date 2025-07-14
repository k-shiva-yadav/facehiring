import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './FileSubmission.css';
import './breadcrumb.css';
import { Container } from 'react-bootstrap';

const FileSubmission = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleBoxClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      setShowSuccess(true);
      setSelectedFile(null);
    }
  };

  const handleDone = () => {
    setShowSuccess(false);
    navigate('/competition/1/leaderboard');
  };

  return (
    <div className="competition-file-submission-container">
      <Container fluid>
        <div className="competition-details-inner-container">
          <div className="breadcrumb-container">
            Home &gt; Competitions &gt; UI/UX Design Challenge 2025 &gt; Technical assessment &gt; <b>File submission</b>
          </div>
          <div className="file-submission-container">
            <div className="file-submission-card">
              <h2>File Submission</h2>
              <form onSubmit={handleSubmit}>
                <div
                  className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
                  onClick={handleBoxClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept=".pdf,.ppt,.pptx,.doc,.docx"
                  />
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="upload" className="drop-zone-icon" />
                  <div className="drop-zone-text">
                    {selectedFile ? selectedFile.name : 'Upload file'}
                  </div>
                  <div className="drop-zone-hint">
                    PDF, PPT, DOC, etc.
                  </div>
                </div>
                <div style={{ color: "#888", marginBottom: 16 }}>Or drag and drop file</div>
                <div style={{ fontWeight: 500, marginBottom: 24 }}>Submission Deadline: <span style={{ color: '#222' }}>02:15:21</span></div>
                <button
                  type="submit"
                  className={`submit-btn ${selectedFile ? 'active' : ''}`}
                  disabled={!selectedFile}
                >
                  Submit Now
                </button>
              </form>
            </div>

            {showSuccess && (
              <div className="success-modal-overlay">
                <div className="success-modal-content">
                  <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="success" className="success-modal-icon" />
                  </div>
                  <h2 style={{ margin: "0 0 12px 0" }}>Submission Successful</h2>
                  <div style={{ marginBottom: 24 }}>Your solution has been submitted.</div>
                  <button
                    onClick={handleDone}
                    style={{
                      background: "#fff",
                      color: "#3b5998",
                      border: "none",
                      borderRadius: 20,
                      padding: "10px 36px",
                      fontSize: 18,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FileSubmission; 