import React from 'react';
import './CompetitionCard.css';
import { FaCalendarAlt, FaTrophy, FaChartBar, FaClock, FaUsers, FaBookmark } from 'react-icons/fa';
import uxImage from '../../Assests/Images/UX.avif';
import logoPlaceholder from '../../Assests/Images/xyz.png';

const CompetitionCard = ({ competition }) => {
  const {
    title,
    subtitle,
    description,
    deadline,
    prize,
    level,
    daysLeft,
    applied,
    isFree,
    isOnline,
  } = competition;

  // Use a real image if available, otherwise a placeholder
  const cardImage = competition.image === '/images/competition1.png' ? uxImage : uxImage;

  return (
    <div className="competition-card">
      <div className="card-banner">
        <img src={cardImage} alt={title} className="banner-img" />
        <div className="card-logo">
          <img src={logoPlaceholder} alt="Company Logo" />
        </div>
        {isFree && <div className="free-badge">Free</div>}
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <div className="card-subtitle">
          <h4>{subtitle}</h4>
          {isOnline && <span className="online-badge">ONLINE</span>}
        </div>
        <p className="card-description">{description}</p>
        <div className="card-details">
          <div className="detail-item">
            <FaCalendarAlt className="detail-icon" />
            <p>Deadline</p>
            <span>{deadline}</span>
          </div>
          <div className="detail-item">
            <FaTrophy className="detail-icon" />
            <p>Prize</p>
            <span>{prize}</span>
          </div>
          <div className="detail-item">
            <FaChartBar className="detail-icon" />
            <p>Level</p>
            <span>{level}</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="footer-info">
          <span><FaClock /> {daysLeft} days left</span>
          <span><FaUsers /> {applied} Applied</span>
          <span><FaBookmark /> Save</span>
        </div>
        <button className="participate-btn">Participate</button>
      </div>
    </div>
  );
};

export default CompetitionCard; 