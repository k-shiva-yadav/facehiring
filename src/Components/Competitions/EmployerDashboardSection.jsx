import React from 'react';
import CompetitionListCard from './CompetitionListCard';
import './EmployerDashboardSection.css';

const ApplicationInsights = () => (
  <div className="insights-card p-4">
    <h4 className="insights-title mb-4">Application Insights</h4>
    <div className="insights-total mb-3">
      <span className="insights-total-num">210</span>
      <span className="insights-total-label">Applicants</span>
    </div>
    <div className="insights-breakdown">
      <div className="insights-breakdown-row"><span className="insights-breakdown-num active">114</span> <span className="insights-breakdown-label">Active</span></div>
      <div className="insights-breakdown-row"><span className="insights-breakdown-num inactive">64</span> <span className="insights-breakdown-label">Inactive</span></div>
      <div className="insights-breakdown-row"><span className="insights-breakdown-num closed">32</span> <span className="insights-breakdown-label">Closed</span></div>
    </div>
  </div>
);

const EmployerDashboardSection = ({ competitions, onRegister }) => {
  return (
    <div className="employer-dashboard-section container-fluid py-4">
      <div className="row g-4">
        {/* Left: Competition Cards */}
        <div className="col-lg-8 col-12">
          <h2 className="dashboard-title mb-2">Competitions</h2>
          <div className="dashboard-subtitle mb-4">Here's all competition list</div>
          {competitions.map(comp => (
            <CompetitionListCard key={comp.id} competition={comp} onRegister={onRegister} />
          ))}
        </div>
        {/* Right: Application Insights */}
        <div className="col-lg-4 col-12">
          <ApplicationInsights />
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardSection; 