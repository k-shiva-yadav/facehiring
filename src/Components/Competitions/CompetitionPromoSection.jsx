import React from 'react';
import './CompetitionPromoSection.css';
import hiringImg from '../../Assests/Images/job-banner.png'; // Use your own images or placeholders
import podiumImg from '../../Assests/Images/team-success.jpg';
import hiringIcon from '../../Assests/Images/hiring.png';
import hackathonIcon from '../../Assests/Images/hackthon.png';
import academicIcon from '../../Assests/Images/academic.png';

const CompetitionPromoSection = () => {
  return (
    <div className="competition-promo-section container-fluid py-4">
      <div className="row g-4">
        {/* Left Large Card */}
        <div className="col-lg-6 col-12 left-large-promo-section">
          <div className="promo-card promo-hiring d-flex flex-column flex-md-row align-items-center justify-content-between p-4 h-100">
            <img src={hiringImg} alt="We are hiring" className="promo-img mb-3 mb-md-0" style={{maxWidth: 360}} />
            <div className="flex-grow-1 ms-md-4 text-center text-md-start">
              <div className="promo-title mb-2">WE ARE HIRING</div>
              <div className="promo-subtitle mb-3">Looking to hire top talent?<br/>Host a competition!</div>
              <button className="promo-btn">Get Started</button>
            </div>
          </div>
        </div>
        {/* Right Small Cards */}
        <div className="col-lg-6 col-12 left-large-promo-section">
          <div className="row g-3 mb-3">
            <div className="col-md-4 col-12">
              <div className="mini-card text-center p-3">
                <img src={hiringIcon} alt="Hiring" className="mini-icon mb-2" />
                <div className='set-aced-text'>Hiring</div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="mini-card-2 text-center p-3">
                <img src={hackathonIcon} alt="Hackathons" className="mini-icon mb-2" />
                <div className='set-aced-text'>Hackathons</div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="mini-card-3 text-center p-3">
                <img src={academicIcon} alt="Academic" className="mini-icon mb-2" />
                <div className='set-aced-text'>Academic</div>
              </div>
            </div>
          </div>
          <div className="promo-card promo-showcase d-flex flex-column flex-md-row align-items-center justify-content-between p-4">
            <img src={podiumImg} alt="Showcase skills" className="promo-img mb-3 mb-md-0" style={{maxWidth: 240, height: 177}} />
            <div className="flex-grow-1 ms-md-4 text-center text-md-start">
              <div className="promo-subtitle">Want to showcase your skills?</div>
              <div className="promo-subtitle-small mb-2">Join a competition!</div>
              <button className="promo-btn btn-explore">Explore Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPromoSection; 