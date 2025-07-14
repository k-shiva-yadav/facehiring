import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JobDescription.css';

const JobDescription = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("User Interface Designer");
  const [companyName, setCompanyName] = useState("XYZ Software Company Pvt. Ltd.");
  const [location, setLocation] = useState("Hyderabad, Telangana, India");
  const [workMode, setWorkMode] = useState("On-site");
  const [tempLocation, setTempLocation] = useState(location); // temporary location while editing
  const [description, setDescription] = useState(`...`); // Set your initial HTML here

  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleContinue = () => {
    if (!description || description === '<p><br></p>') {
      alert('Please enter a job description');
      return;
    }
    navigate('/screeningquestions', { state: { description, jobTitle, companyName, location, workMode } });
  };

  return (
    <div className="job-description-page container-fluid min-vh-100 bg-light">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <p className="progress-text">
            Post job — <span className="gray">Find people</span> — <span className="gray">Review applications</span>
          </p>

          <h2 className="job-description-header">
            Facehiring has generated a job description based on your company profile.<br />
            Feel free to make any changes as needed.
          </h2>

          <div className="job-card p-4 bg-white rounded shadow-sm">
            <div className="job-card-header d-flex justify-content-between align-items-start">
              <div>
                <h3>{jobTitle}</h3>
                <p className="company-info">
                  {companyName} | Full-time | {location} ({workMode})
                </p>
              </div>
              <button className="edit-icon btn btn-link p-0" onClick={() => {
                setTempLocation(location); // load current location into temp input on popup open
                setShowEditPopup(true);
              }}>✏️</button>
            </div>

            <h4>Job description</h4>
            <p className="description-note">This description will be visible to all potential candidates.</p>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="quill-editor"
            />

            <div className="footer-buttons d-flex justify-content-between mt-4">
              <button onClick={() => navigate(-1)} className="btn btn-outline-secondary d-flex justify-content-end">Back</button>
              <button onClick={handleContinue} className="btn btn-primary d-flex justify-content-end">Continue</button>
            </div>
          </div>
        </div>
      </div>

      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <h3>Edit Job Details</h3>

            <label>Job Title</label>
            <input
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="form-control mb-3"
            />

            <label>Company Name</label>
            <input
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="form-control mb-3"
            />

            <label>Work Mode</label>
            <select
              value={workMode}
              onChange={e => setWorkMode(e.target.value)}
              className="form-select mb-3"
            >
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Other">Other</option>
            </select>

            <label>Location</label>
            <input
              type="text"
              value={tempLocation}
              onChange={e => setTempLocation(e.target.value)}
              placeholder="Enter location"
              className="form-control mb-3"
            />

            <div className="popup-actions d-flex justify-content-end">
              <button
                onClick={() => setShowEditPopup(false)}
                className="btn btn-secondary me-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save tempLocation into actual location state
                  setLocation(tempLocation.trim() || location); // fallback to current location if empty
                  setShowEditPopup(false);
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
