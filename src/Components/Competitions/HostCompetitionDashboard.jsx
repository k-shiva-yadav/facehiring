import React from 'react';
import CompetitionWideCard from './CompetitionWideCard';
import './CompetitionWideCard.css';
import './EmployerDashboardSection.css';
import './HostCompetitionDashboard.css';
import { Button, Form } from 'react-bootstrap';
import { FaPlus, FaSearch, FaChevronDown } from 'react-icons/fa';

// Dummy data for competitions
const competitions = [
  {
    id: 1,
    title: 'UI/UX Design Challenge 2025',
    subtitle: 'Industry-led design challenge',
    status: 'OFFLINE',
    description: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward design challenge to showcase your creative skills and win exciting reward..',
    location: 'Vidyavardhaka College of Engineering, Mysore, Karnataka, India',
    updateDate: 'Apr 11, 2025',
    registrationDeadline: '24 Apr 25, 11:59 PM IST',
    teamSize: '2 - 4 Members',
    level: 'Intermediate',
    cashPrize: '80,000',
    logo: 'https://via.placeholder.com/80x80.png?text=LOGO+TEXT+HERE',
    category: 'Hackathon',
    candidates: 0,
    createdAgo: '3m ago',
    active: true,
  },
  {
    id: 2,
    title: 'UI/UX Design Challenge 2025',
    subtitle: 'Industry-led design challenge',
    status: 'ONLINE',
    description: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward design challenge to showcase your creative skills and win exciting reward..',
    location: 'Vidyavardhaka College of Engineering, Mysore, Karnataka, India',
    updateDate: 'Apr 11, 2025',
    registrationDeadline: '24 Apr 25, 11:59 PM IST',
    teamSize: '2 - 4 Members',
    level: 'Intermediate',
    cashPrize: '80,000',
    logo: 'https://via.placeholder.com/80x80.png?text=VOIDDUMMY',
    category: 'Hackathon',
    candidates: 0,
    createdAgo: '3m ago',
    active: true,
  },
];

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

const HostCompetitionDashboard = () => {
  return (
    <div className="host-dashboard-container">
      <div className="host-dashboard-header">
        <div className="host-dashboard-welcome">
          <h2>Welcome, Employer!</h2>
        </div>
        <Button className="post-new-competition-btn">
          <FaPlus style={{ marginRight: 8 }} /> Post New Competition
        </Button>
      </div>
      <div className="host-dashboard-content">
        <div className="host-dashboard-left">
          <div className="host-dashboard-searchbar">
            <div className="host-dashboard-searchbar-heading">Competitions</div>
            <div className="host-dashboard-searchbar-row">
              <Form.Select className="host-dashboard-dropdown" defaultValue="Competitions">
                <option>Competitions</option>
                <option>Hackathons</option>
                <option>Quizzes</option>
              </Form.Select>
              <Form.Control className="host-dashboard-search-input" type="text" placeholder="Search" />
              <Button className="host-dashboard-search-btn"><FaSearch /></Button>
            </div>
          </div>
          <div className="host-dashboard-competition-list">
            {competitions.map((comp) => (
              <div key={comp.id} className="host-dashboard-competition-card">
                <CompetitionWideCard
                  title={comp.title}
                  subtitle={comp.subtitle}
                  status={comp.status}
                  logo={comp.logo}
                  description={comp.description}
                  location={comp.location}
                  updateDate={comp.updateDate}
                  registrationDeadline={comp.registrationDeadline}
                  teamSize={comp.teamSize}
                  level={comp.level}
                  cashPrize={comp.cashPrize}
                  category={comp.category}
                  // Add more props as needed for the wide card
                />
                <div className="host-dashboard-card-footer">
                  <span>{comp.candidates} Candidates Applied</span>
                  <span className="host-dashboard-card-status">
                    <Form.Select size="sm" defaultValue={comp.active ? 'Active' : 'Inactive'}>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Closed</option>
                    </Form.Select>
                  </span>
                  <span className="host-dashboard-card-created">Created {comp.createdAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="host-dashboard-right">
          <ApplicationInsights />
        </div>
      </div>
    </div>
  );
};

export default HostCompetitionDashboard; 