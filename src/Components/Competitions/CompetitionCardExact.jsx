import React from 'react';
import './CompetitionCardExact.css';
import { FaRegCalendarAlt, FaTrophy, FaChartBar, FaRegClock, FaUsers, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';
import burstImg from '../../Assests/Images/burst.png';

const CompetitionCardExact = ({
  title = 'UI/UX DESIGN CHALLENGE',
  subtitle = 'UI/UX Design Challenge 2025',
  isOnline = true,
  description = 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward.',
  deadline = 'Apr 25',
  prize = '10,000',
  level = 'Intermediate',
  daysLeft = 2,
  isFree = true,
  price = '', // if not free, show price in badge
  bannerImg = 'https://via.placeholder.com/600x120?text=Banner+Image',
  logoImg = 'https://via.placeholder.com/80x80?text=Logo',
  saved = false,
  onToggleSave = () => {},
  applied = false,
  onParticipate = () => {},
  ...rest
}) => {
  return (
    <div className="ccard-exact-icons">
      <div className="ccard-banner-row-icons">
        <img src={bannerImg} alt="Banner" className="ccard-banner-img-icons" />
        
        <div className="ccard-logo-burst-wrap-icons">
          <div className="ccard-logo-circle-icons">
            <img src={logoImg} alt="Logo" className="ccard-logo-img-icons" />
          </div>
          <div className="ccard-burst-badge-icons">
            <img src={burstImg} alt="badge" className="ccard-burst-img" />
            <span className="ccard-burst-text">{isFree ? 'Free' : price}</span>
          </div>
        </div>
      </div>
      <div className="ccard-content-icons">
        <div className="ccard-title-row-icons">
          <span className="ccard-subtitle-icons">{subtitle}</span>
          {isOnline && <span className="ccard-online-badge-icons">ONLINE</span>}
        </div>
        <div className="ccard-desc-icons">{description}</div>
        <div className="ccard-details-row-icons">
          <div className="ccard-detail-icons">
            <FaRegCalendarAlt className="ccard-icon-icons ccard-icon-calendar" />
            <div>
            <div className="ccard-detail-label-icons">Deadline</div>
            <div className="ccard-detail-value-icons">{deadline}</div>
            </div>
          </div>
          <div className="ccard-detail-icons">
            <FaTrophy className="ccard-icon-icons ccard-icon-trophy" />
            <div>
            <div className="ccard-detail-label-icons">Prize</div>
            <div className="ccard-detail-value-icons">{prize}</div>
            </div>
          </div>
          <div className="ccard-detail-icons">
            <FaChartBar className="ccard-icon-icons ccard-icon-level" />
            <div>
            <div className="ccard-detail-label-icons">Level</div>
            <div className="ccard-detail-value-icons">{level}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ccard-footer-icons">
        <div className="ccard-footer-left-icons">
          <span className="ccard-footer-item-icons"><FaRegClock className="ccard-footer-icon-icons ccard-footer-clock" /> {daysLeft} days left</span>
          <span className="ccard-footer-item-icons"><FaUsers className="ccard-footer-icon-icons ccard-footer-users" /> {applied} Applied</span>
          <span className="ccard-footer-item-icons ccard-footer-save" onClick={onToggleSave} style={{cursor:'pointer', color: saved ? '#3c5898' : undefined, fontWeight: saved ? 700 : 500}}>
            {saved ? <FaBookmark className="ccard-footer-icon-icons ccard-footer-bookmark" style={{color: '#3C5898'}} /> : <FaRegBookmark className="ccard-footer-icon-icons ccard-footer-bookmark" />} {saved ? 'Saved' : 'Save'}
          </span>
        </div>
        <button
          className="ccard-participate-btn-icons"
          style={applied ? { background: '#f8f9fa', color: '#0BA02C', border: '1.5px solid #0BA02C', fontWeight: 700, cursor: 'default', display: 'flex', alignItems: 'center', gap: '8px' } : {}}
          disabled={applied}
          onClick={applied ? undefined : onParticipate}
        >
          {applied ? (
            <>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 6}}>
                <path d="M20.1673 10.1567V11C20.1662 12.9768 19.5261 14.9002 18.3425 16.4834C17.159 18.0666 15.4953 19.2248 13.5997 19.7853C11.7041 20.3457 9.67814 20.2784 7.82391 19.5934C5.96969 18.9084 4.38658 17.6423 3.3107 15.984C2.23481 14.3257 1.72379 12.3641 1.85385 10.3917C1.98392 8.41922 2.74809 6.54167 4.03241 5.03902C5.31672 3.53637 7.05237 2.48914 8.98049 2.05351C10.9086 1.61787 12.9259 1.81718 14.7315 2.62171" stroke="#0BA02C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.1667 3.6665L11 12.8423L8.25 10.0923" stroke="#0BA02C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Applied
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.92 4.956L3.45 3.473M12.759 4.956L14.229 3.473M3.449 14.353L4.919 12.869M8.839 2.979V1M2.959 8.913H1M14.875 14.836L18.689 13.33C18.781 13.2932 18.8599 13.2296 18.9155 13.1475C18.971 13.0655 19.0007 12.9686 19.0007 12.8695C19.0007 12.7704 18.971 12.6735 18.9155 12.5915C18.8599 12.5094 18.781 12.4458 18.689 12.409L9.524 8.794C9.43478 8.75947 9.33742 8.7517 9.24385 8.77165C9.15028 8.7916 9.06456 8.8384 8.99718 8.90631C8.92979 8.97423 8.88367 9.06031 8.86446 9.15404C8.84524 9.24776 8.85377 9.34505 8.889 9.434L12.471 18.685C12.633 19.105 13.221 19.105 13.383 18.685L14.875 14.836Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg> Participate
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompetitionCardExact; 