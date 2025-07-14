import React from 'react';
import './CompetitionListCard.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaTrophy, FaRegBookmark } from 'react-icons/fa';

const CompetitionListCard = ({ competition, onRegister }) => {
  // Always show a non-zero price if not provided
  const displayPrice = competition.price && Number(competition.price) > 0 ? competition.price : (competition.isFree ? 499 : 899);

  return (
    <div className="competition-list-card">
      <div className="clc-logo">
        <img src={competition.logo || ''} alt="Logo" />
      </div>
      <div className="clc-main">
        <div className="clc-header">
          <div className="clc-title-row">
            <h3 className="clc-title">{competition.title}</h3>
            <span className={`clc-status ${competition.isOnline ? 'online' : 'offline'}`}>{competition.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
          <span className="clc-category">{competition.category || competition.type || 'Hackathon'}</span>
        </div>
        <div className="clc-desc">{competition.description}</div>
        <div className="clc-meta clc-meta-stacked">
          <div className="clc-meta-college"><FaMapMarkerAlt /> {competition.location || 'Vidyavardhaka College of Engineering, Mysore, Karnataka, India'}</div>
          <div className="clc-meta-date"><FaCalendarAlt /> Updates On: {competition.updateDate || 'Apr 11, 2025'}</div>
        </div>
        <div className="clc-details-row clc-details-icons-row">
          <div className="clc-detail-icon-col">
            <FaCalendarAlt className="clc-detail-icon" />
            <div className="clc-detail-label">Deadline</div>
            <div className="clc-detail-value">{competition.deadline || 'Apr 25'}</div>
          </div>
          <div className="clc-detail-icon-col">
            <FaTrophy className="clc-detail-icon" />
            <div className="clc-detail-label">Prize</div>
            <div className="clc-detail-value">{competition.prize || '10,000'}</div>
          </div>
          <div className="clc-detail-icon-col">
            <FaChartBar className="clc-detail-icon" />
            <div className="clc-detail-label">Level</div>
            <div className="clc-detail-value">{competition.level || 'Intermediate'}</div>
          </div>
        </div>
        <div className="clc-cash-row">
          <div className="clc-cash-badge"><FaTrophy /> Cash price: <b>₹ {competition.prize || '80,000'}</b></div>
        </div>
      </div>
      <div className="clc-actions">
        <div className="clc-register-row">
          <div className="clc-bookmark"><FaRegBookmark /></div>
          <div className="clc-price-register-group">
            <div className="clc-price">₹ {displayPrice}</div>
            <button className="clc-register-btn" onClick={() => onRegister && onRegister(competition)}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionListCard; 