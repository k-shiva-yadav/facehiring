import React from 'react';
import './HostCompetitionSection.css';

const HostCompetitionSection = () => {
  return (
    <div className="host-competition-section container-fluid py-4">
      <div className="row g-4">
        {/* Left: Host Competition Form */}
        <div className="col-lg-8 col-12">
          <div className="host-form-card p-4">
            <h2 className="host-title mb-3">Post New Competition</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Competition Title</label>
                <input type="text" className="form-control" placeholder="Enter competition title" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} placeholder="Describe your competition" />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option>Hackathon</option>
                  <option>Quiz</option>
                  <option>Design</option>
                  <option>Business</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Deadline</label>
                <input type="date" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        {/* Right: Application Insights */}
        <div className="col-lg-4 col-12">
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
        </div>
      </div>
    </div>
  );
};

export default HostCompetitionSection; 