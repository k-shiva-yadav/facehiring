import React from "react";
import "./VideoPitchCard.css";

export default function VideoPitchCard() {
  return (
    <div className="vpc-card">
      <div className="vpc-header-row">
        <span className="vpc-title">My Video Pitch</span>
        <button className="vpc-add-btn">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="9" fill="#3C5898"/><path d="M9 5v8M5 9h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add now
        </button>
      </div>
      <div className="vpc-content-row">
        <div className="vpc-video-icon-box">
          <span className="vpc-video-icon">
            {/* Video SVG with plus badge */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="#e0e7ff"/>
              <g>
                <rect x="12" y="16" width="20" height="16" rx="4" fill="#3C5898"/>
                <rect x="28" y="20" width="8" height="8" rx="2" fill="#3C5898"/>
                <circle cx="20" cy="24" r="3" fill="#fff"/>
                <circle cx="36" cy="36" r="10" fill="#3C5898"/>
                <path d="M36 32v8M32 36h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </g>
            </svg>
          </span>
          <div className="vpc-add-video-label">Add video</div>
        </div>
        <div className="vpc-text-content">
          <div className="vpc-main-text">Improve your matches and hiring chances by 50% by adding a video pitch</div>
          <div className="vpc-sub-text">Recruiters prefer candidates with a video pitch</div>
          <a href="#" className="vpc-link">How it helps</a>
        </div>
      </div>
    </div>
  );
} 