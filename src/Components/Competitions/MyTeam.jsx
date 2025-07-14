import React, { useState } from 'react';
import CompetitionPaymentSection from './CompetitionPaymentSection';
import './MyTeam.css';
import Container from 'react-bootstrap/Container';

const socialIcons = {
  facebook: 'https://img.icons8.com/color/32/000000/facebook-new.png',
  whatsapp: 'https://img.icons8.com/color/32/000000/whatsapp.png',
  gmail: 'https://img.icons8.com/color/32/000000/gmail-new.png',
  x: 'https://img.icons8.com/ios-filled/32/000000/twitterx--v2.png',
};

const dummyCompetition = {
  logo: 'https://img.icons8.com/color/96/000000/idea.png',
  title: 'UI/UX Design Challenge 2025',
  price: 899,
};

const MyTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return <CompetitionPaymentSection competition={dummyCompetition} onBack={() => setShowPayment(false)} />;
  }

  return (
    <>
    <div className="my-team-container">
      <Container fluid>
      <div className='competition-details-inner-container'>
      <div className='team-main-header-bg'>
      {/* Header */}
      <div className="my-team-header">
        <img src="https://img.icons8.com/color/96/000000/idea.png" alt="Logo" className="my-team-logo" />
        <span className="my-team-title">UI/UX Design Challenge 2025</span>
      </div>
      {/* Blue Tab */}
      <div className="my-team-tab">
        My Team
      </div>
      {/* Content */}
      <div className="my-team-content">
        {/* Team Name */}
        <div className="team-name-section">
          <label className="team-name-label">
            Team Name<span style={{ color: 'red', marginLeft: 4 }}>*</span>
          </label>
          <input type="text" placeholder="Enter your team name" className="team-name-input" />
        </div>
        {/* Teammates */}
        <div className="teammates-section">
          <span style={{ fontSize: 20 }}>👥</span> Teammates <span style={{ color: '#3C5898', fontWeight: 600 }}>(1/4)</span>
        </div>
        <div className="teammates-cards">
          {/* Member Card */}
          <div className="member-card">
            <div style={{ position: 'relative', width: 64, height: 64, marginBottom: 10 }}>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ranbir Mehra" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }} />
              <span style={{ position: 'absolute', top: 0, right: -10, background: '#fff', borderRadius: '50%', padding: 3, fontSize: 14, color: '#3C5898', border: '1px solid #d9d9d9', cursor: 'pointer' }}>✎</span>
            </div>
            <div style={{ fontWeight: 500, fontSize: 16, color: '#222', textAlign: 'center' }}>Ranbir Mehra</div>
          </div>
          {/* Add Member Card */}
          <div className="add-member-card" onClick={() => setShowModal(true)}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>+</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginTop: 6 }}>Add 2nd Member</div>
          </div>
        </div>
        {/* Buttons */}
        <div className="my-team-buttons">
          <button style={{ minWidth: 120, padding: '12px 0', borderRadius: 24, fontSize: 18, fontWeight: 600, border: 'none', background: '#fff', color: '#3C5898', border: '1.5px solid #d9d9d9', boxShadow: '0 2px 8px rgba(44,62,80,0.04)', cursor: 'pointer' }}>Back</button>
          <button style={{ minWidth: 120, padding: '12px 0', borderRadius: 24, fontSize: 18, fontWeight: 600, border: 'none', background: '#3C5898', color: '#fff', boxShadow: '0 2px 8px rgba(44,62,80,0.08)', cursor: 'pointer' }} onClick={() => setShowPayment(true)}>Next</button>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Participate Details</h2>
            <div className="modal-search-section">
              <label className="modal-label">Search your teammate</label>
              <div className="modal-search-box">
                <span style={{ color: '#3C5898', fontSize: 20, marginRight: 8 }}>&#128269;</span>
                <input type="text" placeholder="Participate name" className="modal-search-input" />
                <button className="modal-search-btn">Search</button>
              </div>
            </div>
            {/* Divider with Or */}
            <div className="modal-divider">
              <div className="modal-divider-line" />
              <span className="modal-divider-text">Or</span>
              <div className="modal-divider-line" />
            </div>
            {/* Share section */}
            <div className="modal-share-section">
              <div className="modal-label">Share with your teammate</div>
              <div className="copy-link-box">
                <span style={{ fontSize: 20 }}>&#128279;</span> Copy link
              </div>
            </div>
            <div className="modal-social-buttons">
              <button className="social-btn" style={{ color: '#1877f3' }}>
                <img src={socialIcons.facebook} alt="Facebook" /> Facebook
              </button>
              <button className="social-btn" style={{ color: '#25d366' }}>
                <img src={socialIcons.whatsapp} alt="Whatsapp" /> Whatsapp
              </button>
            </div>
            <div className="modal-social-buttons">
              <button className="social-btn" style={{ color: '#ea4335' }}>
                <img src={socialIcons.gmail} alt="Gmail" /> Gmail
              </button>
              <button className="social-btn" style={{ color: '#222' }}>
                <img src={socialIcons.x} alt="X" /> X
              </button>
            </div>
            {/* Modal Buttons */}
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)} className="modal-btn modal-btn-cancel">Cancel</button>
              <button className="modal-btn modal-btn-add">Add</button>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
      </Container>
    </div>
    </>
  );
};

export default MyTeam; 