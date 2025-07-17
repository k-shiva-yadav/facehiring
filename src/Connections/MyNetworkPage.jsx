import React from 'react';
import ManageNetwork from './ManageNetwork';
import NetworkMainSection from './NetworkMainSection';

const MyNetworkPage = () => {
  return (
    <div style={{ background: '#f3f6f8', minHeight: '100vh', width: '100vw' }}>
      <div
        className="network-flex-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '24px 10px',
          gap: 20,
        }}
      >
        {/* Left Sidebar */}
        <div className="network-sidebar" style={{ minWidth: 280, maxWidth: 320, flex: '0 0 320px' }}>
          <ManageNetwork />
        </div>
        {/* Main Content */}
        <div className="network-main-content" style={{ flex: '1 1 0%', minWidth: 0, maxWidth: 936, width: '100%' }}>
          <NetworkMainSection />
        </div>
      </div>
      <style>{`
        @media (max-width: 769px) {
          .network-flex-container {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .network-sidebar, .network-main-content {
            min-width: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            flex: none !important;
          }
          .network-sidebar {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default MyNetworkPage;
