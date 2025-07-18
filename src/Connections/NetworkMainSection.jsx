import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import "./NetworkMainSection.css";

export default function NetworkMainSection() {
  const [tab, setTab] = useState("received");
  const {
    networkData,
    respondToRequest,
    cancelRequest,
    sendConnectionRequest,
    fetchConnections,
    fetchRecommendations,
    fetchPendingRequests,
    user
  } = useAuthContext();

  // Helper for formatting image URLs (fallback)
  const formatImageUrl = (url) => {
    if (!url) return "https://placehold.co/150x150";
    if (url.startsWith("http")) return url;
    return `https://facehiringapi.codingster.in/DisplayImages/Images/${url}`;
  };

  // Received Tab: Pending Requests
  const receivedRequests = networkData.pendingRequests || [];
  // Sent Tab: Sent Requests
  const sentRequests = networkData.sentRequests || [];
  // Recent Connections
  const recentConnections = networkData.connections || [];
  // Recommendations/People You May Know
  const recommendations = networkData.recommendations || [];

  return (
    <div className="nm-main-content">
      {/* Tabs */}
      <div className="nm-tabs-row">
        <button className={`nm-tab-btn${tab === "received" ? " active" : ""}`} onClick={() => setTab("received")}>Received</button>
        <button className={`nm-tab-btn${tab === "sent" ? " active" : ""}`} onClick={() => setTab("sent")}>Sent</button>
      </div>

      {/* Received Tab Content */}
      {tab === "received" && (
        <>
          <div className="nm-section-header-row">
            <span className="nm-section-header">You have <span className="nm-blue-link">{receivedRequests.length} new connection{receivedRequests.length !== 1 ? 's' : ''}</span></span>
            <a href="#" className="nm-show-all-link">Show all</a>
          </div>
          <div className="nm-connection-cards">
            {receivedRequests.length === 0 && <div style={{padding: 24, color: '#888'}}>No new connection requests.</div>}
            {receivedRequests.map((req, idx) => (
              <div className="nm-connection-card" key={req.id || idx}>
                <img src={formatImageUrl(req.user?.imageFile)} alt={req.user?.fullName || 'User'} className="nm-avatar" />
                <div className="nm-conn-info">
                  <div className="nm-conn-name-row">
                    <span className="nm-conn-name">{req.user?.fullName || req.user?.firstName + ' ' + req.user?.lastName || 'User'}</span>
                    <span className="nm-conn-role">{req.user?.designation || req.user?.title || '-'}</span>
                    <a href="#" className="nm-conn-link">{req.user?.connectionsCount || 0} connections</a>
                  </div>
                </div>
                <div className="nm-conn-divider" />
                <div className="nm-conn-message">{req.message || "You have a new connection request."}</div>
                <div className="nm-conn-actions">
                  <button className="nm-btn nm-btn-primary" onClick={() => respondToRequest(req.id, true)}>Accept</button>
                  <button className="nm-btn nm-btn-outline" onClick={() => respondToRequest(req.id, false)}>Ignore</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sent Tab Content */}
      {tab === "sent" && (
        <>
          <div className="nm-section-header-row">
            <span className="nm-section-header">Request sent</span>
            <a href="#" className="nm-show-all-link">Show all</a>
          </div>
          <div className="nm-connection-cards">
            {sentRequests.length === 0 && <div style={{padding: 24, color: '#888'}}>No sent requests.</div>}
            {sentRequests.map((req, idx) => (
              <div className="nm-connection-card nm-sent-request-card" key={req.id || idx}>
                <img src={formatImageUrl(req.user?.imageFile)} alt={req.user?.fullName || 'User'} className="nm-avatar" />
                <div className="nm-conn-info">
                  <div className="nm-conn-name-row">
                    <span className="nm-conn-name">{req.user?.fullName || req.user?.firstName + ' ' + req.user?.lastName || 'User'}</span>
                    <span className="nm-conn-role">{req.user?.designation || req.user?.title || '-'}</span>
                    <a href="#" className="nm-conn-link">{req.user?.connectionsCount || 0} connections</a>
                  </div>
                </div>
                <div className="nm-conn-divider" />
                <div className="nm-conn-message nm-sent-message">If you cancel the request now, you won’t be able to resend it to this person for up to 3 weeks.</div>
                <div className="nm-conn-actions nm-sent-actions">
                  <button className="nm-btn nm-btn-outline nm-pending-btn" disabled>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4 }}><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      Pending
                    </span>
                  </button>
                  <button className="nm-btn nm-btn-primary" onClick={() => cancelRequest(req.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Recent Connections Section */}
      <div className="nm-section-header-row" style={{ marginTop: 36 }}>
        <span className="nm-section-header">Recent connections</span>
        <a href="#" className="nm-show-all-link">Show all</a>
      </div>
      <div className="nm-recent-grid">
        {recentConnections.length === 0 && <div style={{padding: 24, color: '#888'}}>No recent connections.</div>}
        {recentConnections.map((conn, idx) => (
          <div className="nm-recent-card" key={conn.id || idx}>
            <img src={formatImageUrl(conn.user?.imageFile)} alt={conn.user?.fullName || 'User'} className="nm-avatar" />
            <div className="nm-recent-info">
              <span className="nm-recent-name">{conn.user?.fullName || conn.user?.firstName + ' ' + conn.user?.lastName || 'User'}</span>
              <span className="nm-recent-role">{conn.user?.designation || conn.user?.title || '-'}</span>
              <span className="nm-recent-time">{conn.connectedOn ? new Date(conn.connectedOn).toLocaleDateString() : '-'}</span>
            </div>
            <button className="nm-btn nm-btn-outline">Message</button>
          </div>
        ))}
      </div>

      {/* Skill Matches Section */}
      <div className="nm-section-header-row" style={{ marginTop: 36 }}>
        <span className="nm-section-header">Skill matches</span>
        <a href="#" className="nm-show-all-link">Show all</a>
      </div>
      <div className="nm-skill-matches-grid">
        {recommendations.length === 0 && <div style={{padding: 24, color: '#888'}}>No recommendations found.</div>}
        {recommendations.map((rec, idx) => (
          <div className="nm-skill-card-modern" key={rec.id || idx}>
            <div className="nm-skill-banner-wrap">
              <img src={rec.banner || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"} alt="banner" className="nm-skill-banner" />
              <img src={formatImageUrl(rec.imageFile)} alt={rec.fullName || 'User'} className="nm-skill-avatar" />
            </div>
            <div className="nm-skill-card-content">
              <div className="nm-skill-name-modern">{rec.fullName || rec.firstName + ' ' + rec.lastName || 'User'}</div>
              <div className="nm-skill-role-modern">{rec.designation || rec.title || '-'}</div>
              <div className="nm-skill-company-modern">
                <span className="nm-skill-briefcase">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="12" rx="3" stroke="#888" strokeWidth="1.5"/><path d="M7 7V5a3 3 0 0 1 6 0v2" stroke="#888" strokeWidth="1.5"/></svg>
                </span>
                {rec.companyName || '-'}
              </div>
              <button className="nm-btn nm-btn-outline nm-skill-connect-btn" onClick={() => sendConnectionRequest(user?.id, rec.id)}>
                <span className="nm-skill-connect-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 16v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1" stroke="#3C5898" strokeWidth="1.5"/><circle cx="12" cy="8" r="4" stroke="#3C5898" strokeWidth="1.5"/><path d="M19 10v2m0 0v2m0-2h2m-2 0h-2" stroke="#3C5898" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}