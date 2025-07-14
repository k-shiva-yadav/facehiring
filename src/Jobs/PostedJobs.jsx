import React, { useState, useRef, useEffect, useCallback } from 'react';
import './PostedJobs.css';
import './JobDashboard.css';
import LeftSidebar from '../Components/Sidebar/LeftSidebar';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import { FiTrash2 } from 'react-icons/fi';
import companyLogo from '../Assests/Images/xyz.png';
import avatar1 from '../Assests/Images/profile-img1.png';
import avatar2 from '../Assests/Images/profile-img2.png';
import avatar3 from '../Assests/Images/profile-img3.png';
import { useNavigate } from 'react-router-dom';

const initialJobs = [
  {
    title: 'User Interface Designer',
    company: 'XYZ Company Pvt. Ltd.',
    location: 'Hyderabad, Telangana, India (On-site)',
    status: 'Active',
    created: '3m ago',
    candidates: 0,
    avatars: [],
  },
  {
    title: 'Android Developer',
    company: 'XYZ Company Pvt. Ltd.',
    location: 'Hyderabad, Telangana, India (On-site)',
    status: 'Active',
    created: '10m ago',
    candidates: 10,
    avatars: [avatar1, avatar2, avatar3],
  },
  {
    title: 'Full Stack Developer',
    company: 'XYZ Company Pvt. Ltd.',
    location: 'Hyderabad, Telangana, India (On-site)',
    status: 'Active',
    created: '1hr ago',
    candidates: 0,
    avatars: [],
  },
  {
    title: 'IOS Developer',
    company: 'XYZ Company Pvt. Ltd.',
    location: 'Hyderabad, Telangana, India (On-site)',
    status: 'Active',
    created: '2hr ago',
    candidates: 0,
    avatars: [],
  },
];

const statusOptions = [
  { label: 'Active', color: '#1ecb7b' },
  { label: 'Inactive', color: '#ff9f7f' },
  { label: 'Closed', color: '#e74c3c' },
];

// Remove JobDetailView from this file. Instead, navigate to a new JobDetailPage when a job card is clicked.

const PostedJobs = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const [openStatusIdx, setOpenStatusIdx] = useState(null);
  const menuRef = useRef();
  const statusRef = useRef();
  const [selectedJobIdx, setSelectedJobIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIdx(null);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setOpenStatusIdx(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusChange = (idx, newStatus) => {
    setJobs(jobs => jobs.map((job, i) => i === idx ? { ...job, status: newStatus } : job));
    setOpenStatusIdx(null);
  };

  const handleStatusDropdown = (job, e) => {
    // Optionally, you can show the dropdown here or reuse the status dropdown logic
  };

  if (selectedJobIdx !== null) {
    // This part of the logic is now handled by the router, so we can remove it.
    // The JobDetailView component is removed, so we don't need to return it here.
  }

  return (
    <main className="jos-page-main-header">
      <div className="job-dashboard-container">
        <LeftSidebar />
        <div className='dashboard-main'>
          <div className="posted-jobs-container">
            <div className="posted-jobs-header d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h2 className="posted-jobs-title">Posted Jobs</h2>
                <div className="posted-jobs-subtitle">Here's all job list</div>
              </div>
              <form className="search-bar d-flex align-items-center">
                <div className="search-input-container">
                  <FaSearch className="posted-search-icon" />
                  <input type="text" className="form-control search-input" placeholder="Search" />
                </div>
                <button className="search-btn" type="submit">
                  <b>Search</b>
                </button>
              </form>
            </div>
            <div className="posted-jobs-list">
              {jobs.map((job, idx) => (
                <div
                  className="posted-job-card d-flex justify-content-between align-items-start flex-wrap"
                  key={idx}
                  onClick={() => navigate(`/posted-job/${idx}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-start">
                    <img src={companyLogo} alt="Company Logo" className="company-logo" />
                    <div className="job-info">
                      <div className="job-title-row d-flex align-items-center" style={{ position: 'relative' }}>
                        <span className="job-title">{job.title}</span>
                        <button
                          className="three-dots-btn"
                          onClick={e => { e.stopPropagation(); setOpenMenuIdx(openMenuIdx === idx ? null : idx); }}
                          aria-label="Open job menu"
                          type="button"
                        >
                          &#8942;
                        </button>
                        {openMenuIdx === idx && (
                          <div className="job-menu-dropdown" ref={menuRef} onClick={e => e.stopPropagation()}>
                            <button className="dropdown-item">
                              <HiOutlineBriefcase className="dropdown-icon" />
                              Edit job
                            </button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item delete">
                              <FiTrash2 className="dropdown-icon" />
                              Delete job
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="company-name">{job.company}</div>
                      <div className="job-location">{job.location}</div>
                      {job.candidates > 0 ? (
                        <div
                          className="candidates-applied d-flex align-items-center mt-1"
                          style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={e => { e.stopPropagation(); navigate(`/job/${idx}/candidates`); }}
                        >
                          {job.avatars.map((avatar, i) => (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="candidate-avatar"
                              key={i}
                              onClick={e => { e.stopPropagation(); navigate(`/job/${idx}/candidates`); }}
                              style={{ cursor: 'pointer' }}
                            />
                          ))}
                          <span className="candidates-count ms-2">{job.candidates} Candidates Applied</span>
                        </div>
                      ) : (
                        <div className="candidates-applied mt-1">0 Candidates Applied</div>
                      )}
                    </div>
                  </div>
                  <div className="job-meta d-flex flex-column align-items-end">
                    <div style={{ position: 'relative' }}>
                      <button
                        className={`status-btn ${jobs[idx].status.toLowerCase()}`}
                        onClick={e => { e.stopPropagation(); setOpenStatusIdx(openStatusIdx === idx ? null : idx); }}
                        type="button"
                      >
                        <span className="status-text" style={{ color: jobs[idx].status === 'Active' ? '#1ecb7b' : jobs[idx].status === 'Inactive' ? '#ff9f7f' : '#e74c3c' }}>{jobs[idx].status}</span>
                        <MdKeyboardArrowDown className="dropdown-arrow" />
                      </button>
                      {openStatusIdx === idx && (
                        <div className="status-dropdown-menu" ref={statusRef} onClick={e => e.stopPropagation()}>
                          {statusOptions.map((option, i) => (
                            <React.Fragment key={option.label}>
                              {i !== 0 && <div className="status-divider"></div>}
                              <button
                                className="status-dropdown-item"
                                style={{ color: option.color, fontWeight: jobs[idx].status === option.label ? '700' : '500' }}
                                onClick={() => handleStatusChange(idx, option.label)}
                                disabled={jobs[idx].status === option.label}
                              >
                                {option.label}
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="created-time mt-2">Created {job.created}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="show-all-row d-flex justify-content-end">
              <button className="show-all-btn">Show all</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostedJobs; 