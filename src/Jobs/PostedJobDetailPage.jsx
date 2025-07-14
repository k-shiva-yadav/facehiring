import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftSidebar from '../Components/Sidebar/LeftSidebar';
import companyLogo from '../Assests/Images/xyz.png';
import avatar1 from '../Assests/Images/profile-img1.png';
import avatar2 from '../Assests/Images/profile-img2.png';
import avatar3 from '../Assests/Images/profile-img3.png';
import { MdKeyboardArrowDown, MdEdit } from 'react-icons/md';

const statusOptions = [
  { label: 'Active', color: '#1ecb7b' },
  { label: 'Inactive', color: '#ff9f7f' },
  { label: 'Closed', color: '#e74c3c' },
];

const placeholderJob = {
  title: 'User Interface Designer',
  company: 'XYZ Company Pvt. Ltd.',
  location: 'Hyderabad, Telangana, India (On-site)',
  status: 'Active',
  created: '3m ago',
  candidates: 10,
  avatars: [avatar1, avatar2, avatar3],
};

const jobDetails = {
  description: `At TriTech Software & Services, we are dedicated to fostering a culture where unity and diversity thrive together. We value collaboration, understanding that our collective success is greater than the sum of our individual efforts. Our team starts with you, and we are committed to your success by providing consistent support and understanding the challenges you face. We specialize in Premium Tax, continually improving our skills and tools to offer a comprehensive support system year-round.\n\nThis is a full-time, on-site role for a User Interface Designer based in Nagpur. The User Interface Designer will be responsible for creating visual designs and mockups, developing user interfaces, and collaborating with the front-end development team. The role includes tasks focused on enhancing user experience (UX) by designing intuitive and effective user interfaces.`,
  qualifications: [
    'Proficiency in Visual Design and creating Mockups',
    'Experience in Front-End Development',
    'Strong skills in User Experience (UX) and User Interface Design',
    'Excellent communication and teamwork skills',
    "Bachelor's degree in Design, Computer Science, or related field",
    'Experience with design software like Adobe Creative Suite, Sketch, or Figma',
    'Knowledge of HTML, CSS, and JavaScript is a plus',
  ],
  industry: 'Software Development',
  employmentType: 'Full-time',
  applications: 10,
  views: 0,
};

const PostedJobDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get job id from URL
  const jobId = location.pathname.split('/')[2] || 0;
  // Use job from location.state or fallback to placeholder
  const job = (location.state && location.state.job) || placeholderJob;
  const [activeTab, setActiveTab] = useState('info');
  const [status, setStatus] = useState(job.status);
  const [openStatus, setOpenStatus] = useState(false);

  // Settings tab state
  const [goodFitAuto, setGoodFitAuto] = useState(true);
  const [notFitRejectEmail, setNotFitRejectEmail] = useState(true);
  const [notFitOutOfCountry, setNotFitOutOfCountry] = useState(false);
  const [notFitOutOfCountryEmail, setNotFitOutOfCountryEmail] = useState(false);
  const [notFitScreening, setNotFitScreening] = useState(true);
  const [rejectionPreview, setRejectionPreview] = useState(`Thank you for your interest in the User Interface Designer position at XYZ Company Pvt. Ltd. Hyderabad, Telangana, India. Unfortunately, TriTech Software & Services did not select your application to move forward in the hiring process.\n\nRegards,\nXYZ Company Pvt. Ltd.`);

  // Safely split description
  const descriptionParts = jobDetails.description.split('\n\n');
  const companyDescription = descriptionParts[0] || '';
  const roleDescription = descriptionParts[1] || '';

  return (
    <main className="jos-page-main-header">
      <div className="job-dashboard-container">
        <LeftSidebar />
        <div className="posted-dashboard-main">
          {/* Job Card (same as in PostedJobs) */}
          <div className="posted-job-card job-post-card-detail d-flex justify-content-between align-items-start flex-wrap" style={{ marginBottom: 0 }}>
            <div className="d-flex align-items-start">
              <img src={companyLogo} alt="Company Logo" className="company-logo" />
              <div className="job-info">
                <div className="job-title-row d-flex align-items-center" style={{ position: 'relative' }}>
                  <span className="job-title">{job.title}</span>
                </div>
                <div className="company-name">{job.company}</div>
                <div className="job-location">{job.location}</div>
                {job.candidates > 0 ? (
                  <div
                    className="candidates-applied d-flex align-items-center mt-1"
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate(`/job/${jobId}/candidates`)}
                  >
                    {job.avatars.map((avatar, i) => (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="candidate-avatar"
                        key={i}
                        onClick={e => { e.stopPropagation(); navigate(`/job/${jobId}/candidates`); }}
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
                  className={`status-btn ${status.toLowerCase()}`}
                  onClick={e => { e.stopPropagation(); setOpenStatus(!openStatus); }}
                  type="button"
                >
                  <span className="status-text" style={{ color: status === 'Active' ? '#1ecb7b' : status === 'Inactive' ? '#ff9f7f' : '#e74c3c' }}>{status}</span>
                  <MdKeyboardArrowDown className="dropdown-arrow" />
                </button>
                {openStatus && (
                  <div className="status-dropdown-menu">
                    {statusOptions.map((option, i) => (
                      <React.Fragment key={option.label}>
                        {i !== 0 && <div className="status-divider"></div>}
                        <button
                          className="status-dropdown-item"
                          style={{ color: option.color, fontWeight: status === option.label ? '700' : '500' }}
                          onClick={() => { setStatus(option.label); setOpenStatus(false); }}
                          disabled={status === option.label}
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

          {/* Tabs below the card */}
          <div className="job-detail-tabs job-detail-tabs-bar">
            <button className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>Job Info</button>
            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</button>
          </div>

          {/* Tab content below the tabs */}
          <div className="job-detail-view">
            {activeTab === 'info' && (
              <div className="job-detail-content job-detail-content-split">
                <div className="job-detail-main job-detail-card">
                  <div className="job-detail-header-row">
                    <h2>Job description</h2>
                    <MdEdit className="job-edit-icon" title="Edit" />
                  </div>
                  <div className="job-description-section">
                    <div className="job-description-left">
                      <div className="job-description-block">
                        <div className="job-description-title">Company Description</div>
                        <div className="job-description-text">{companyDescription}</div>
                      </div>
                      <div className="job-description-block">
                        <div className="job-description-title">Role Description</div>
                        <div className="job-description-text">{roleDescription}</div>
                      </div>
                      <div className="job-description-block">
                        <div className="job-description-title">Qualifications</div>
                        <ul className="job-qualifications-list">
                          {jobDetails.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="job-description-right">
                      <div className="job-info-label">Industry</div>
                      <div className="job-info-value">{jobDetails.industry}</div>
                      <div className="job-info-label">Employment Type</div>
                      <div className="job-info-value">{jobDetails.employmentType}</div>
                    </div>
                  </div>
                </div>
                <div className="job-performance-card job-detail-card">
                  <div className="job-performance-title">Job performance</div>
                  <div className="job-performance-metrics">
                    <div>
                      <div className="job-performance-value">{jobDetails.applications}</div>
                      <div className="job-performance-label">Applications</div>
                    </div>
                    <div>
                      <div className="job-performance-value">{jobDetails.views}</div>
                      <div className="job-performance-label">Views</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="job-detail-content job-detail-content-split">
                <div className="job-detail-main job-detail-card">
                  <h2 className="settings-main-title">Save time by automating your hiring workflow</h2>
                  <div className="settings-section-title">Good fit automations</div>
                  <div className="settings-row settings-row-bordered">
                    <div className="settings-label-desc">
                      <div className="settings-label">Rate applicants you messaged as "Good fit"</div>
                      <div className="settings-desc">When you message an unrated applicant using LinkedIn messaging, LinkedIn will auto-rate them as a "Good fit" on your behalf.</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={goodFitAuto} onChange={() => setGoodFitAuto(v => !v)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="settings-section-title" style={{marginTop:24}}>Not a fit automations</div>
                  <div className="settings-row settings-row-bordered">
                    <div className="settings-label-desc">
                      <div className="settings-label">Send rejection emails to applicants you rated as "Not a fit"</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notFitRejectEmail} onChange={() => setNotFitRejectEmail(v => !v)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="settings-row settings-row-bordered">
                    <div className="settings-label-desc">
                      <div className="settings-label">Rate applicants who are out-of-country as "Not a fit"</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notFitOutOfCountry} onChange={() => setNotFitOutOfCountry(v => !v)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="settings-row settings-row-bordered">
                    <div className="settings-label-desc">
                      <div className="settings-label">Send rejection emails</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notFitOutOfCountryEmail} onChange={() => setNotFitOutOfCountryEmail(v => !v)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="settings-row settings-row-bordered">
                    <div className="settings-label-desc">
                      <div className="settings-label">Rate applicants who don't meet required screening criteria as "Not a fit"</div>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={notFitScreening} onChange={() => setNotFitScreening(v => !v)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="settings-section-title" style={{marginTop:24}}>Rejection email preview</div>
                  <div className="settings-desc" style={{marginBottom:8}}>Applicants will receive this message from LinkedIn 3 calendar days after rated as "Not a fit". Should you change your mind, change their rating before the message is sent.</div>
                  <div className="settings-label" style={{marginBottom:4}}>Preview<span style={{color:'red'}}>*</span></div>
                  <textarea
                    className="settings-textarea"
                    value={rejectionPreview}
                    onChange={e => setRejectionPreview(e.target.value)}
                    maxLength={3000}
                    rows={4}
                  />
                  <div className="settings-charcount">{rejectionPreview.length}/3000</div>
                </div>
                <div className="job-performance-card job-detail-card">
                  <div className="job-performance-title">Job performance</div>
                  <div className="job-performance-metrics">
                    <div>
                      <div className="job-performance-value">{jobDetails.applications}</div>
                      <div className="job-performance-label">Applications</div>
                    </div>
                    <div>
                      <div className="job-performance-value">{jobDetails.views}</div>
                      <div className="job-performance-label">Views</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <button className="back-to-list-btn" onClick={() => navigate(-1)}>Back to Job List</button> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostedJobDetailPage; 