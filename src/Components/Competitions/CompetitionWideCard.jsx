import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompetitionWideCard.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaTrophy, FaRegBookmark } from "react-icons/fa";
import teamIcon from '../../Assests/Images/team-icon.png';
import statisticsIcon from '../../Assests/Images/staticis.png';
import trophyIcon from '../../Assests/Images/trophy.png';

const IconBlock = ({ icon, label, value }) => (
  <div className="wide-card-detail-block-v2">
    <span className="wide-card-detail-icon-bg">{icon}</span>
    <div className="wide-card-detail-block-content">
      <div className="wide-card-detail-label-v2">{label}</div>
      <div className="wide-card-detail-value-v2">{value}</div>
    </div>
  </div>
);

const CompetitionWideCard = (props) => {
  const navigate = useNavigate();
  const {
    id,
    logo,
    title,
    subtitle,
    status, // "ONLINE" or "OFFLINE"
    description,
    location,
    updateDate,
    registrationDeadline,
    teamSize,
    level,
    cashPrize,
    price,
    category,
    onRegister,
  } = props;

  return (
    <div className="wide-card-v2">
      {/* Category pill top right */}
      <div className="wide-card-category-pill-v2">{category}</div>
      {/* Logo and main content */}
      <div className="wide-card-left-v2">
        <div className="wide-card-logo-v2">
          <img src={logo} alt="Logo" />
        </div>
        <div className="wide-card-main-v2">
          <div className="wide-card-title-row-v2">
            <span className="wide-card-title-v2">{title}</span>
            <span className={`wide-card-status-pill-v2 ${status === "ONLINE" ? "online" : "offline"}`}>{status}</span>
          </div>
          {subtitle && <div className="wide-card-subtitle-v2">{subtitle}</div>}
          <div className="wide-card-desc-v2">{description}</div>
          <div className="wide-card-meta-v2">
            <div className="wide-card-meta-location-v2"><FaMapMarkerAlt /> {location}</div>
            <div className="wide-card-meta-date-v2"><FaCalendarAlt /> Updates On: {updateDate}</div>
          </div>
          <div className="wide-card-details-row-v2">
            <IconBlock
              icon={<img src="https://img.icons8.com/color/48/000000/calendar--v1.png" alt="calendar" className="wide-card-detail-icon-img" />}
              label="Registration Deadline:"
              value={registrationDeadline}
            />
            <IconBlock
              icon={<img src={teamIcon} alt="team" className="wide-card-detail-icon-img" />}
              label="Team Size"
              value={teamSize}
            />
            <IconBlock
              icon={<img src={statisticsIcon} alt="level" className="wide-card-detail-icon-img" />}
              label="Level"
              value={level}
            />
          </div>
          {/* Cash prize section */}
          <div className="wide-card-cash-v2">
            <img src={trophyIcon} alt="trophy" className="wide-card-trophy-icon-v2" />
            <span>Cash price: <b>₹ {cashPrize}</b></span>
          </div>
        </div>
      </div>
      {/* Bookmark and Register section */}
      <div className="wide-card-actions-v2">
        <div className="wide-card-bookmark-container-v2">
          <FaRegBookmark className="wide-card-bookmark-v2" />
        </div>
        <div className="wide-card-register-group-v2">
          <span className="wide-card-price-v2">₹ {price}</span>
          <span className="wide-card-divider-v2" />
          <button className="wide-card-register-btn-v2" onClick={() => onRegister ? onRegister() : navigate('/competition/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetitionWideCard; 