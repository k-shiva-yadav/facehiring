import React, { useEffect, useRef } from 'react';
import './JobDashboard.css';
import { Chart } from 'chart.js/auto';
import LeftSidebar from '../Components/Sidebar/LeftSidebar';

const data = [
  { name: 'Shortlisted', value: 942, color: '#3C5898' },
  { name: 'Hired', value: 25, color: '#FF9F7F' },
  { name: 'Rejected', value: 2452, color: '#BFE6F7' },
];

const summary = [
  { title: 'Total Job Posts', value: 550, change: '+10.44%', positive: true },
  { title: 'Total Application', value: 5140, change: '+20.54%', positive: true },
  { title: 'No. of Vacancy', value: 320, change: '+31.64%', positive: true },
  { title: 'No. of Hirings', value: 140, change: '-04.11%', positive: false },
];

const jobs = [
  { title: 'UI UX Designer', category: 'Full Time', openings: 12, applications: 135, status: 'Active' },
  { title: 'Full Stack Dev', category: 'Full Time', openings: 8, applications: 100, status: 'Inactive' },
  { title: 'DevOps', category: 'Internship', openings: 12, applications: 5, status: 'Active' },
  { title: 'Android Dev', category: 'Full Time', openings: 4, applications: 45, status: 'Active' },
  { title: 'IOS Developer', category: 'Full Time', openings: 18, applications: 96, status: 'Inactive' },
];

const JobDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Shortlisted', 'Hired', 'Rejected'],
          datasets: [{
            data: [942, 500, 2452],
            backgroundColor: ['#2e4b84', '#f9a885', '#95dee3'],
            borderWidth: 6,
            hoverOffset: 6,
            cutout: '68%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.parsed}`;
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <main className="jos-page-main-header">
    <div className="job-dashboard-container">
      <LeftSidebar />
      <div className="dashboard-main">
        <div className="dashboard-summary-row">
          {summary.map((item, idx) => (
            <div className="dashboard-summary-card" key={idx}>
              <div className="summary-title">{item.title}</div>
              <div className="summary-value">{item.value}</div>
              <div className={`summary-change ${item.positive ? 'positive' : 'negative'}`}>{item.change}</div>
              <div className="summary-desc">Than last month</div>
            </div>
          ))}
        </div>
        <div className="dashboard-content-row">
          <div className="dashboard-chart-card">
            <div className="dashboard-card-title">Application Responses <span className="download-report">Download Report</span></div>
            <div className="chart-container">
              <canvas ref={chartRef}></canvas>
            </div>
            <div className="labels">
              <div>
                <div className="label shortlisted">Shortlisted</div>
                <div className="value shortlisted">942</div>
              </div>
              <div>
                <div className="label hired">Hired</div>
                <div className="value hired">500</div>
              </div>
              <div>
                <div className="label rejected">Rejected</div>
                <div className="value rejected">2,452</div>
              </div>
            </div>
          </div>
          <div className="dashboard-table-card">
            <div className="dashboard-card-title">Recent Job Posts</div>
            <div className="table-responsive">
              <table className="dashboard-table table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Category</th>
                    <th>Openings</th>
                    <th>Applications</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, idx) => (
                    <tr key={idx}>
                      <td>{job.title}</td>
                      <td>{job.category}</td>
                      <td>{job.openings.toString().padStart(2, '0')}</td>
                      <td>{job.applications.toString().padStart(2, '0')}</td>
                      <td>
                        <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};

export default JobDashboard; 