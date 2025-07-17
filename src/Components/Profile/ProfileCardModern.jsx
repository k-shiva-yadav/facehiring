import React from "react";
import "./ProfileCardModern.css";

const bannerUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // Placeholder banner
const profileUrl = "https://randomuser.me/api/portraits/men/32.jpg"; // Placeholder profile

export default function ProfileCardModern() {
  return (
    <div className="pcm-card">
      <div className="pcm-banner-container">
        <img src={bannerUrl} alt="Banner" className="pcm-banner-img" />
        <span className="pcm-camera-icon">
          {/* Camera SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5m0-1.5A5 5 0 1 0 17 12a5 5 0 0 0-5-5Zm6.5 1.5h-1.1l-.7-1.4A2 2 0 0 0 14.9 5h-5.8a2 2 0 0 0-1.8 1.1l-.7 1.4H5.5A1.5 1.5 0 0 0 4 9v8a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 17V9a1.5 1.5 0 0 0-1.5-1.5ZM12 17a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z" fill="#3C5898"/></svg>
        </span>
        <img src={profileUrl} alt="Profile" className="pcm-profile-img" />
      </div>
      <div className="pcm-content">
        <div className="pcm-name-row">
          <span className="pcm-name">Ranbhir Mehra</span>
          <span className="pcm-edit-icon">
            {/* Pencil SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14.846 2.94a2.25 2.25 0 0 1 3.182 3.183l-1.06 1.06-3.183-3.182 1.06-1.06Zm-2.12 2.12-8.01 8.01a1 1 0 0 0-.263.465l-1 3.5a.5.5 0 0 0 .617.617l3.5-1a1 1 0 0 0 .465-.263l8.01-8.01-3.182-3.182Z" fill="#3C5898"/></svg>
          </span>
        </div>
        <div className="pcm-title">UI/UX Designer</div>
        <div className="pcm-section pcm-section-bordered pcm-about">
          <div className="pcm-section-header">
            <span>About</span>
            <span className="pcm-edit-icon">
              {/* Pencil SVG */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M14.846 2.94a2.25 2.25 0 0 1 3.182 3.183l-1.06 1.06-3.183-3.182 1.06-1.06Zm-2.12 2.12-8.01 8.01a1 1 0 0 0-.263.465l-1 3.5a.5.5 0 0 0 .617.617l3.5-1a1 1 0 0 0 .465-.263l8.01-8.01-3.182-3.182Z" fill="#888"/></svg>
            </span>
          </div>
          <div className="pcm-about-text">
            Passionate UI/UX Designer with over 2+ years of experience specializing in Human-Computer Interaction (HCI) and creating compelling user interfaces. Expertise conducting competitive and user research, users, and translating insights into effective wire frames. Compelling user interfaces converting fidelity to high fidelity.
          </div>
        </div>
        <div className="pcm-section pcm-skills">
          <div className="pcm-section-header">Top 3 Skills</div>
          <div className="pcm-skills-list">
            <span className="pcm-skill-badge">Wireframe</span>
            <span className="pcm-skill-badge">High fidelity</span>
            <span className="pcm-skill-badge">Prototype</span>
          </div>
        </div>
      </div>
    </div>
  );
} 