import React, { useState, useRef, useEffect } from 'react';
import './EmployerDashboardV2.css';
import { Button, Form, Container } from 'react-bootstrap';
import { FaChevronDown, FaSearch, FaPlus, FaEllipsisV, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaBriefcase, FaTrash } from 'react-icons/fa';
import CompetitionTypeDropdown from './CompetitionTypeDropdown';
import "./CompetitionWideCard.css";
// import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaChartBar, FaTrophy, FaRegBookmark } from "react-icons/fa";
import teamIcon from '../../Assests/Images/team-icon.png';
import statisticsIcon from '../../Assests/Images/staticis.png';
import trophyIcon from '../../Assests/Images/trophy.png';
import courseImg4 from '../../Assests/Images/course-4.png';
import courseImg5 from '../../Assests/Images/course-5.png';
import { useNavigate } from 'react-router-dom';
const competitionTypes = [
  'All',
  'Hiring Challenges',
  'Quizzes',
  'Hackathons',
  'Cultural Events'
];

const competitions = [
  {
    id: 1,
    title: 'UI/UX Design Challenge 2025',
    subtitle: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward design challenge to showcase your creative skills and win exciting reward..',
    status: 'Offline',
    location: 'Vidyavardhaka College of Engineering, Mysore, Karnataka, India',
    updateDate: 'Apr 11, 2025',
    registrationDeadline: '24 Apr 25, 11:59 PM IST',
    teamSize: '2 - 4 Members',
    level: 'Intermediate',
    logo: courseImg4,
    category: 'Hackathon',
    candidates: 0,
    createdAgo: '3m ago',
    active: true,
  },
  {
    id: 2,
    title: 'UI/UX Design Challenge 2025',
    subtitle: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward design challenge to showcase your creative skills and win exciting reward..',
    status: 'Online',
    location: 'Vidyavardhaka College of Engineering, Mysore, Karnataka, India',
    updateDate: 'Apr 11, 2025',
    registrationDeadline: '24 Apr 25, 11:59 PM IST',
    teamSize: '2 - 4 Members',
    level: 'Intermediate',
    logo: courseImg5,
    category: 'Hackathon',
    candidates: 0,
    createdAgo: '3m ago',
    active: true,
  },
];

const statusOptions = ['Active', 'Inactive', 'Closed'];

const ApplicationInsights = () => (
  <div className="insights-card-v2">
    <h4 className="insights-title-v2">Application Insights</h4>
    <div className="insights-divider" />
    <div className="insights-total-v2">
      <span className="insights-total-num-v2">210</span>
      <span className="insights-total-label-v2">Applicants</span>
    </div>
    <div className="insights-divider" />
    <div className="insights-breakdown-v2">
      <div className="insights-breakdown-row-v2"><span className="insights-breakdown-num-v2 active">114</span> <span className="insights-breakdown-label-v2">Active</span></div>
      <div className="insights-divider" />
      <div className="insights-breakdown-row-v2"><span className="insights-breakdown-num-v2 inactive">64</span> <span className="insights-breakdown-label-v2">Inactive</span></div>
      <div className="insights-divider" />
      <div className="insights-breakdown-row-v2"><span className="insights-breakdown-num-v2 closed">32</span> <span className="insights-breakdown-label-v2">Closed</span></div>
    </div>
    <div className="insights-divider" />
  </div>
);

// Define IconBlock component with new structure and class names
const IconBlock = ({ icon, label, value }) => (
  <div className="wide-card-detail-block-v2">
    <span className="wide-card-detail-icon-bg">{icon}</span>
    <div className="wide-card-detail-block-content">
      <div className="wide-card-detail-label-v2">{label}</div>
      <div className="wide-card-detail-value-v2">{value}</div>
    </div>
  </div>
);

const HostCompetitionPage = () => {
  // Dropdown logic copied from SearchBar
  const [showCompetitionsDropdown, setShowCompetitionsDropdown] = useState(false);
  const competitionsDropdownRef = useRef(null);
  const competitionsButtonRef = useRef(null);

  // Status dropdown state for each competition
  const [statusDropdownOpen, setStatusDropdownOpen] = useState({});
  // const [competitionsData, setCompetitionsData] = useState(competitions);
  const [competitionsData, setCompetitionsData] = useState([]);


  // Menu dropdown state for each competition
  const [menuDropdownOpen, setMenuDropdownOpen] = useState({});

  const navigate = useNavigate();

  const handleToggleCompetitionsDropdown = () => {
    setShowCompetitionsDropdown(prev => !prev);
  };

  useEffect(() => {
  const fetchCompetitions = async () => {
    try {
      const response = await fetch('https://facehiringapi.codingster.in/api/Competition/GetAll'); // Replace with your actual URL
      const data = await response.json();
      console.log('Fetched competitions:', data); // ✅ To console the fetched data
      setCompetitionsData(data.data || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  fetchCompetitions();
}, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        competitionsButtonRef.current && competitionsButtonRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        competitionsDropdownRef.current &&
        !competitionsDropdownRef.current.contains(event.target)
      ) {
        setShowCompetitionsDropdown(false);
      }
      // Close all status dropdowns if clicked outside
      Object.keys(statusDropdownOpen).forEach(id => {
        const dropdown = document.getElementById(`status-dropdown-${id}`);
        const btn = document.getElementById(`status-btn-${id}`);
        if (dropdown && !dropdown.contains(event.target) && btn && !btn.contains(event.target)) {
          setStatusDropdownOpen(prev => ({ ...prev, [id]: false }));
        }
      });
      // Close all menu dropdowns if clicked outside
      Object.keys(menuDropdownOpen).forEach(id => {
        const dropdown = document.getElementById(`menu-dropdown-${id}`);
        const btn = document.getElementById(`menu-btn-${id}`);
        if (dropdown && !dropdown.contains(event.target) && btn && !btn.contains(event.target)) {
          setMenuDropdownOpen(prev => ({ ...prev, [id]: false }));
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [statusDropdownOpen, menuDropdownOpen]);

  const handleStatusBtnClick = (id) => {
    setStatusDropdownOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStatusSelect = (id, status) => {
    setCompetitionsData(prev => prev.map(comp => comp.id === id ? { ...comp, status } : comp));
    setStatusDropdownOpen(prev => ({ ...prev, [id]: false }));
  };

  const handleMenuBtnClick = (id) => {
    setMenuDropdownOpen(prev => {
      // Close all others, open only this one
      const newState = {};
      Object.keys(prev).forEach(key => { newState[key] = false; });
      newState[id] = !prev[id];
      return newState;
    });
  };

  return (
    <div className="dashboard-v2-container">
     
      <div className="dashboard-v2-content">
        {/* Left Side */}
        <div className="dashboard-v2-left">
          {/* Header Row inside left */}
          <div className="dashboard-v2-header-row">
            <div className="dashboard-v2-header-left">Welcome, Employer!</div>
            <Button className="dashboard-v2-post-btn" onClick={() => navigate('/post-competition')}>
            <svg style={{ marginRight: '5px'}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.92 4.956L3.45 3.473M12.759 4.956L14.229 3.473M3.449 14.353L4.919 12.869M8.839 2.979V1M2.959 8.913H1M14.875 14.836L18.689 13.33C18.781 13.2932 18.8599 13.2296 18.9155 13.1475C18.971 13.0655 19.0007 12.9686 19.0007 12.8695C19.0007 12.7704 18.971 12.6735 18.9155 12.5915C18.8599 12.5094 18.781 12.4458 18.689 12.409L9.524 8.794C9.43478 8.75947 9.33742 8.7517 9.24385 8.77165C9.15028 8.7916 9.06456 8.8384 8.99718 8.90631C8.92979 8.97423 8.88367 9.06031 8.86446 9.15404C8.84524 9.24776 8.85377 9.34505 8.889 9.434L12.471 18.685C12.633 19.105 13.221 19.105 13.383 18.685L14.875 14.836Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
               Post New Competition
            </Button>
          </div>
          {/* Second Row: Heading, Subtitle, Dropdown, Search */}
          <div className="dashboard-v2-topbar-row">
            <div className="dashboard-v2-topbar-left">
              <div className="dashboard-v2-heading">Competitions</div>
              <div className="dashboard-v2-subtitle">Here's all competition list</div>
            </div>
            <div className="dashboard-v2-topbar-right">
              <div className="dropdown-container" ref={competitionsDropdownRef}>
                <Button ref={competitionsButtonRef} variant="outline-secondary" className="filter-dropdown-btn dashboard-v2-dropdown-btn" onClick={handleToggleCompetitionsDropdown}>
                  Competitions <FaChevronDown />
                </Button>
                <CompetitionTypeDropdown show={showCompetitionsDropdown} />
              </div>
              <div className="dashboard-v2-search-group">
                <FaSearch className="dashboard-v2-search-icon" />
                <Form.Control className="dashboard-v2-search-input" type="text" placeholder="Search" />
                <Button className="dashboard-v2-search-btn">Search</Button>
              </div>
            </div>
          </div>
          {/* Competition Card */}
          <div className="dashboard-v2-competition-list">
            {competitionsData.map((comp) => (
              <div key={comp.id} className="dashboard-v2-competition-card">
                <div className="dashboard-v2-card-main-row">
                  {/* Image and badge */}
                  <div className="dashboard-v2-card-img-col">
                    <img src={comp.logo} alt="Logo" className="dashboard-v2-card-logo" />
                    <div className="dashboard-v2-card-badge">{comp.category}</div>
                  </div>
                  {/* Main content */}
                  <div className="dashboard-v2-card-content">
                    <div className="dashboard-v2-card-title-row">
                      <span className="dashboard-v2-card-title">{comp.title}</span>
                      <span className={`dashboard-v2-card-status-pill ${comp.status === 'ONLINE' ? 'online' : 'offline'}`}>{comp.status}</span>
                      {/* <span className="dashboard-v2-card-menu" id={`menu-btn-${comp.id}`} onClick={() => handleMenuBtnClick(comp.id)}><FaEllipsisV />
                      {menuDropdownOpen[comp.id] && (
                        <div className="dashboard-v2-card-menu-dropdown" id={`menu-dropdown-${comp.id}`}> 
                          <div className="dashboard-v2-card-menu-item">
                            <FaBriefcase className="dashboard-v2-card-menu-icon" /> Edit competition
                          </div>
                          <div className="dashboard-v2-card-menu-divider" />
                          <div className="dashboard-v2-card-menu-item delete">
                            <FaTrash className="dashboard-v2-card-menu-icon" /> Delete competition
                          </div>
                        </div>
                      )}
                      </span> */}
                      <div className="dashboard-v2-card-menu" id={`menu-btn-${comp.id}`} onClick={() => handleMenuBtnClick(comp.id)}>
  <FaEllipsisV />
  {menuDropdownOpen[comp.id] && (
    <div className="dashboard-v2-card-menu-dropdown" id={`menu-dropdown-${comp.id}`}> 
      <div className="dashboard-v2-card-menu-item">
        <FaBriefcase className="dashboard-v2-card-menu-icon" /> Edit competition
      </div>
      <div className="dashboard-v2-card-menu-divider" />
      <div className="dashboard-v2-card-menu-item delete">
        <FaTrash className="dashboard-v2-card-menu-icon" /> Delete competition
      </div>
    </div>
  )}
</div>

                    </div>
                    <div className="dashboard-v2-card-desc">{comp.subtitle}</div>
                    <div className="dashboard-v2-card-meta-row">
                      <span className="dashboard-v2-card-meta-location"><FaMapMarkerAlt style={{marginRight: 4}} /> {comp.location}</span>
                    </div>
                    <div className="dashboard-v2-card-meta-row">
                      <span className="dashboard-v2-card-meta-date"><FaCalendarAlt style={{marginRight: 4}} /> Updates On: {comp.updateDate}</span>
                    </div>
                    <div className="dashboard-v2-card-details-row">
                      <IconBlock
                        icon={<img src="https://img.icons8.com/color/48/000000/calendar--v1.png" alt="calendar" className="wide-card-detail-icon-img" />}
                        label="Deadline:"
                        value={comp.registrationDeadline}
                      />
                      <IconBlock
                        icon={<img src={teamIcon} alt="team" className="wide-card-detail-icon-img" />}
                        label="Team Size"
                        value={comp.teamSize}
                      />
                      <IconBlock
                        icon={<img src={statisticsIcon} alt="level" className="wide-card-detail-icon-img" />}
                        label="Level"
                        value={comp.level}
                      />
                    </div>
                  </div>
                  {/* Status dropdown */}
                  <div className="dashboard-v2-card-status-col">
                    <div className="dashboard-v2-status-dropdown-wrapper">
                      <button
                        id={`status-btn-${comp.id}`}
                        // className={`dashboard-v2-status-btn ${comp.status.toLowerCase()}`}
                        className={`dashboard-v2-status-btn ${(comp.status || '').toLowerCase()}`}
                        onClick={() => handleStatusBtnClick(comp.id)}
                        type="button"
                      >
                        <span className="dashboard-v2-status-btn-label">{comp.status}</span>
                        <FaChevronDown className="dashboard-v2-status-btn-chevron" />
                      </button>
                      {statusDropdownOpen[comp.id] && (
                        <div id={`status-dropdown-${comp.id}`} className="dashboard-v2-status-dropdown">
                          {statusOptions.map(option => (
                            <div
                              key={option}
                              className={`dashboard-v2-status-option ${option.toLowerCase()}`}
                              onClick={() => handleStatusSelect(comp.id, option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Card footer: Candidates and Created */}
                <div className="dashboard-v2-card-footer-row">
                  <div className="dashboard-v2-card-candidates">
                    <div className="candidate-avatars">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Candidate 1" className="candidate-avatar" />
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Candidate 2" className="candidate-avatar" />
                      <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Candidate 3" className="candidate-avatar" />
                    </div>
                    <span className="candidates-applied-text">{comp.candidates} Candidates Applied</span>
                  </div>
                  <span className="dashboard-v2-card-created">Created {comp.createdAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side: Application Insights */}
        <div className="dashboard-v2-right">
          <ApplicationInsights />
        </div>
      </div>
      
    </div>
  );
};

export default HostCompetitionPage; 