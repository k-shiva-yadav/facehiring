import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import './PostJob.css';

// Import images for the "How it works" section
import step1Image from '../Assests/Images/7cbd367b0942f7893b0786746caee441e66d9bdb.png';
import step2Image from '../Assests/Images/cdd436e02c3af2eb55520282559df26c67e74746.jpg';
import step3Image from '../Assests/Images/a0b428451f41f17732fa32c213873e3d56168dab.png';
import step4Image from '../Assests/Images/95.png'; // Number 1
import step5Image from '../Assests/Images/96.png'; // Number 2
import step6Image from '../Assests/Images/97.png'; // Number 3

const PostJob = () => {
  const { user } = useAuthContext();
  const userName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Profile'
    : 'Profile';
  const [jobTitle, setJobTitle] = useState('');
  const navigate = useNavigate();

  const handleStartHiring = () => {
    navigate('/start-hiring-ai');
  };

  const handleBeginWithDescription = () => {
    if (jobTitle.trim() === '') {
      alert('Please enter a job title before proceeding');
      return;
    }
    navigate('/job-description', { state: { jobTitle } });
  };

  return (
    <div className="post-job-page">
      <div className='post-job-container'>
      <div className="post-job-container-inn">
        {/* Greeting Section */}
        <h1 className="greeting-text">
          Hi {userName},
        </h1>
        <h2 className="subtitle-text">
          Find the perfect candidate with Facehiring
        </h2>

        {/* Benefits and Form Section */}
        <div className="benefits-form-section">
          {/* Benefits List */}
          <div className="benefits-list">
            <h3 className="benefits-heading">
              How Facehiring helps you:
            </h3>
            <ul className="benefits-items">
              <li className="benefit-item">
                <span className="bullet-point">•</span>
                Speed up job posting with AI-generated descriptions.
              </li>
              <li className="benefit-item">
                <span className="bullet-point">•</span>
                Quickly filter applicants based on your preferences.
              </li>
              <li className="benefit-item">
                <span className="bullet-point">•</span>
                Connect with up to 25 qualified professionals daily on Facehiring.
              </li>
            </ul>
          </div>

          {/* Job Posting Form */}
          <div className="form-container">
            <label className="form-label">
              Job title <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter the position you're hiring for"
              className="job-title-input"
              required
            />
            <div className="button-group">
              <button
                onClick={handleStartHiring}
                className="primary-button" 
                style={{borderRadius: "30px"}}
              >
                Start hiring with AI
              </button>
              <button
                onClick={handleBeginWithDescription}
                className="secondary-button" 
                style={{borderRadius: "30px"}}
                disabled={!jobTitle.trim()}
              >
                Begin with my job description
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* How It Works Section */}
        <div className="how-it-works-section">
          <h3 className="how-it-works-heading">
            How it works
          </h3>
          <p className="how-it-works-subtitle">
            Let's work together to make hiring simple and effective.
          </p>
          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-item">
              <img src={step1Image} alt="Step 1" className="step-icon" />
              <h4 className="step-heading">
                <img src={step4Image} alt="Number 1" className="step-number-icon" />
                Post a Job
              </h4>
              <p className="step-description">
                Facehiring will create a job post draft for you to review.
              </p>
            </div>
            {/* Step 2 */}
            <div className="step-item">
              <img src={step2Image} alt="Step 2" className="step-icon" />
              <h4 className="step-heading">
                <img src={step5Image} alt="Number 2" className="step-number-icon" />
                Find Candidates
              </h4>
              <p className="step-description">
                We'll identify and suggest qualified professionals who match your requirements.
              </p>
            </div>
            {/* Step 3 */}
            <div className="step-item">
              <img src={step3Image} alt="Step 3" className="step-icon" />
              <h4 className="step-heading">
                <img src={step6Image} alt="Number 3" className="step-number-icon" />
                Review Applications
              </h4>
              <p className="step-description">
                Sort and evaluate applicants based on their skills and qualifications effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PostJob;