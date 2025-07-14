import React from 'react';
import './sidebar.css';
import { FiBriefcase, FiMapPin, FiVideo, FiBookmark, FiChevronRight } from 'react-icons/fi';

const ProfileSidebar = () => {
  return (
    <>
      <div className="profile-sidebar-card">
        {/* Banner and Profile Image */}
        <div className="profile-sidebar-banner-wrap">
          <img
            className="profile-sidebar-banner"
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Banner"
          />
          <img
            className="profile-sidebar-avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
          />
        </div>
        {/* Name, Title, Company, Location */}
        <div className="profile-sidebar-info">
          <div className="profile-sidebar-name">Ranbhir Mehra</div>
          <div className="profile-sidebar-title">UI/UX Designer</div>
          <div className="profile-sidebar-company">
            <FiBriefcase className="profile-sidebar-icon" /> XYZ software company Ltd.
          </div>
          <div className="profile-sidebar-location">
            <FiMapPin className="profile-sidebar-icon" /> Hyderabad, Telangana
          </div>
        </div>
        {/* Video Pitch Button */}
        <div className="profile-sidebar-videopitch-wrap">
          <button className="profile-sidebar-videopitch-btn">
            <FiVideo className="profile-sidebar-videopitch-icon" /> My Video Pitch
          </button>
        </div>
        <div className="profile-sidebar-divider" />
        {/* Analytics Section */}
        <div className="profile-sidebar-analytics-wrap">
          <a href="#" className="profile-sidebar-analytics-link">View all analytics</a>
          <div className="profile-sidebar-analytics-grid profile-sidebar-analytics-grid-bordered">
            <div className="profile-sidebar-analytics-item">
              <div className="profile-sidebar-analytics-label">Profile Viewers</div>
              <div className="profile-sidebar-analytics-value">350</div>
            </div>
            <div className="profile-sidebar-analytics-item">
              <div className="profile-sidebar-analytics-label">Post Impressions</div>
              <div className="profile-sidebar-analytics-value">1200</div>
            </div>
            <div className="profile-sidebar-analytics-item">
              <div className="profile-sidebar-analytics-label">Followers</div>
              <div className="profile-sidebar-analytics-value">12k</div>
            </div>
            <div className="profile-sidebar-analytics-item">
              <div className="profile-sidebar-analytics-label">Search Appearances</div>
              <div className="profile-sidebar-analytics-value">800</div>
            </div>
          </div>
        </div>
        <div className="profile-sidebar-divider" />
        {/* View Profile Button */}
        <div className="profile-sidebar-viewprofile-wrap">
          <button className="profile-sidebar-viewprofile-btn">View Profile</button>
        </div>
      </div>
      {/* Saved Items Card */}
      <div className="profile-sidebar-saved-items-card">
        <div className="profile-sidebar-saved-items-content">
          <FiBookmark className="profile-sidebar-saved-items-icon" />
          <span className="profile-sidebar-saved-items-text">Saved items</span>
          <FiChevronRight className="profile-sidebar-saved-items-arrow" />
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar; 