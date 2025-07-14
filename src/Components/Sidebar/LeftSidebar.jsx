import React from 'react';
import './sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiGrid } from 'react-icons/fi';
import { HiOutlineBriefcase } from 'react-icons/hi2';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  return (
    <aside className="dashboard-sidebar">
      <div
        className={`sidebar-section${routerLocation.pathname === '/job-dashboard' ? ' active' : ''}`}
        onClick={() => navigate('/job-dashboard')}
      >
        <span className="sidebar-icon">
          <FiGrid />
        </span>
        <span className="sidebar-text">Overview</span>
      </div>
      <div
        className={`sidebar-section${(routerLocation.pathname === '/posted-jobs' || routerLocation.pathname.startsWith('/posted-job/') || routerLocation.pathname.startsWith('/job/')) ? ' active' : ''}`}
        onClick={() => navigate('/posted-jobs')}
      >
        <span className="sidebar-icon">
          <HiOutlineBriefcase />
        </span>
        <span className="sidebar-text">Posted Jobs</span>
      </div>
    </aside>
  );
};

export default LeftSidebar;
