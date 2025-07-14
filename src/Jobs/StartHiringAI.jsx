import React from 'react';
import './StartHiringAI.css';
import { Bold, Italic, List, ListOrdered, Edit, CheckCircle } from "lucide-react";
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const StartHiringAI = () => {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/job-settings');
  };

  return (
<>
    

   


    <div className='start-hiring-bg'>
      <div className="start-hiring-container">
        <div className="start-hiring-container-inn">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb-nav">
            <span className="breadcrumb-step active">Post job</span>
            <span className="breadcrumb-divider"> — </span>
            <span className="breadcrumb-step">Find people</span>
            <span className="breadcrumb-divider"> — </span>
            <span className="breadcrumb-step">Review applications</span>
          </nav>

          {/* Page Title */}
          <div className="page-title">Facehiring has generated a job description based on your company profile. <br />Feel free to make any changes as needed.</div>

          <div className="content-card" style={{ position: 'relative' }}>
            {/* Edit Icon in Top-Right */}
            <button className="edit-icon-top" aria-label="Edit job title">
              <FiEdit2 size={16} />
            </button>
            {/* Job Title Section */}
            <div className="job-title-block">
              <h3 className="job-title">User Interface Designer</h3>
              <p className="company-info">
                <CheckCircle style={{ width: "20px", height: "20px", color: "#28a745", marginRight: "8px" }} />
                XYZ Software Company Pvt. Ltd. | Full time | Hyderabad, Telangana, India (On-site)
              </p>
            </div>

            {/* Job Description Section */}
            <div className="section-title">Job description</div>
            <div className="section-subtitle">This description will be visible to all potential candidates.</div>

            {/* Editor Toolbar */}
            <div className="editor-toolbar">
              <button className="editor-btn">
                <Bold style={{ width: "16px", height: "16px" }} />
              </button>
              <button className="editor-btn">
                <Italic style={{ width: "16px", height: "16px" }} />
              </button>
              <button className="editor-btn">
                <List style={{ width: "16px", height: "16px" }} />
              </button>
              <button className="editor-btn">
                <ListOrdered style={{ width: "16px", height: "16px" }} />
              </button>
              <a href="#" className="clear-draft">
                Clear draft
              </a>
            </div>

            {/* Job Description Content */}
            <div className="job-description-editor">
              <div className="job-content">
                <h4>Company Description</h4>
                <p>
                  At XYZ Software Company Pvt. Ltd., we foster a culture where unity and diversity coexist, valuing
                  collaboration to create a strong, supportive environment. We are dedicated to understanding and
                  addressing the challenges you face, continually striving for excellence. Specializing in Premium Tax
                  services, our mission is to enhance our skills and tools to provide you with comprehensive support.
                </p>

                <h4>Job Description</h4>
                <p>
                  This is a full-time, on-site role located in Hyderabad for a User Interface Designer. The User
                  Interface Designer will be responsible for creating visually appealing designs, developing mockups,
                  and ensuring excellent user experience (UX). The role also involves user interface (UI) design and
                  collaboration with front-end developers to implement effective and user-friendly designs.
                </p>

                <h4>Qualifications</h4>
                <ul>
                  <li>Proficiency in Visual Design and creating Mockups</li>
                  <li>Experience in User Experience (UX) and User Interface (UI) Design</li>
                  <li>Front-End Development skills</li>
                  <li>Strong attention to detail and creativity</li>
                  <li>Ability to work collaboratively in an on-site environment</li>
                  <li>Experience with design tools such as Sketch, Adobe XD, or Figma is a plus</li>
                  <li>{"Bachelor's degree in Design, Computer Science, or related field"}</li>
                </ul>
              </div>
            </div>

            <div className="word-count">1204/10,000</div>
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <a href="#" className="btn-back" onClick={handleBack}>
              Back
            </a>
            <a href="#" className="btn-continue" onClick={handleContinue}>
              Continue
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StartHiringAI; 