import React from 'react';
import ManageNetwork from './ManageNetwork';
import NetworkMainSection from './NetworkMainSection';

const MyNetworkPage = () => {
  return (





    <div style={{ backgroundColor: '#f3f6f8', minHeight: '100vh' }} >
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-3">
          <ManageNetwork />
        </div>
        <div className="col-md-8 mb-3">
          <NetworkMainSection />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyNetworkPage;
