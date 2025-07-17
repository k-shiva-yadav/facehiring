import React from "react";
import { useAuthContext } from "../../Context/AuthContext";
import "./ProfilePage.css";
import ProfileCardModern from "./ProfileCardModern";
import ProfileMainModern from "./ProfileMainModern";
import VideoPitchCard from "./VideoPitchCard";

export default function ProfilePage() {
  const { user, loading } = useAuthContext();

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (!user) return <div style={{ padding: 40, textAlign: 'center' }}>No user data found.</div>;

  // Helper for safe access
  const get = (obj, path, fallback = "-") => {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : fallback), obj);
  };

  return (
    <div className="linkedin-home-wrapper" style={{ background: '#f3f6f8', minHeight: '100vh', width: '100vw' }}>
      <div className="linkedin-container profile-responsive-flex" style={{ display: 'flex', justifyContent: 'center', maxWidth: '100%', margin: '0 auto', padding: '24px 10px', gap: 20 }}>
        {/* Left Sidebar (Profile Card) */}
        <div className="linkedin-left-col" style={{ minWidth: 280, maxWidth: 320, flex: '0 0 320px' }}>
          <ProfileCardModern />
          <VideoPitchCard />
        </div>
        {/* Middle Content (Main Profile Details) */}
        <div className="linkedin-main-feed" style={{ flex: '1 1 0%', minWidth: 0, maxWidth: 936, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Basic Details */}
          <div className="basic-details-modern">
            <div className="basic-details-header-row">
              <span className="basic-details-title">Basic details</span>
            </div>
            <div className="basic-details-grid">
              <div className="basic-details-item">
                <div className="basic-details-label">AGE</div>
                <div className="basic-details-value">{user.age || '-'}</div>
              </div>
              <div className="basic-details-item">
                <div className="basic-details-label">YEARS OF EXPERIENCE</div>
                <div className="basic-details-value">{user.experience || '-'}</div>
              </div>
              <div className="basic-details-item">
                <div className="basic-details-label">MOBILE NO.</div>
                <div className="basic-details-value">{user.mobile || '-'}</div>
              </div>
              <div className="basic-details-item">
                <div className="basic-details-label">CTC</div>
                <div className="basic-details-value">{user.ctc || '-'}</div>
              </div>
              <div className="basic-details-item">
                <div className="basic-details-label">LOCATION</div>
                <div className="basic-details-value">{user.location || user.city || '-'}</div>
              </div>
              <div className="basic-details-item">
                <div className="basic-details-label">EMAIL</div>
                <div className="basic-details-value">{user.email || '-'}</div>
              </div>
            </div>
          </div>
          {/* Modern Main Content */}
          <ProfileMainModern user={user} />
          {/*
          // Old sections below are now replaced by ProfileMainModern
          <div className="profile-about card" ...>...</div>
          {user.topSkills && ...}
          {user.experiences && ...}
          {user.educations && ...}
          {user.streamSkills && ...}
          {user.certifications && ...}
          */}
        </div>
      </div>
    </div>
  );
}