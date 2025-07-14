import React from 'react';
import './TeamRegistrationSection.css';
import { FaUserFriends, FaPen } from 'react-icons/fa';

const TeamRegistrationSection = ({ competition, onBack, onNext }) => {
  return (
    <div className="team-registration-section container-fluid py-4">
      <div className="team-header d-flex align-items-center mb-3">
        <img src={competition.logo} alt="Logo" className="team-logo me-3" />
        <h2 className="team-title m-0">{competition.title}</h2>
      </div>
      <div className="team-tab mb-4">My Team</div>
      <div className="team-form-area">
        <div className="mb-4">
          <label className="team-label">Team Name<span className="text-danger">*</span></label>
          <input type="text" className="form-control team-input" placeholder="Enter your team name" />
        </div>
        <div className="team-mates-label mb-2"><FaUserFriends className="me-2" />Teammates (1/4)</div>
        <div className="team-mates-grid d-flex gap-4 mb-5">
          <div className="team-member-card">
            <div className="team-member-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ranbir Mehra" />
              <FaPen className="edit-icon" />
            </div>
            <div className="team-member-name">Ranbir Mehra</div>
          </div>
          <div className="team-add-card">
            <div className="team-add-plus">+</div>
            <div className="team-add-label">Add 2nd Member</div>
          </div>
        </div>
      </div>
      <div className="team-actions d-flex justify-content-between mt-5">
        <button className="team-btn team-btn-back" onClick={onBack}>Back</button>
        <button className="team-btn team-btn-next" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default TeamRegistrationSection; 