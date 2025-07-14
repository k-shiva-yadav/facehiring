import React from 'react';
import './sidebar.css';
import { FiUserPlus } from 'react-icons/fi';

const skillMatches = [
  {
    id: 1,
    name: 'Mohit Reddy',
    role: 'UI/UX Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Laxmi Seoni',
    role: 'UI/UX Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'Satish Mina',
    role: 'UI/UX Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 4,
    name: 'Alia Mithali',
    role: 'UI/UX Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/women/46.jpg',
  },
];

const invitations = [
  {
    id: 1,
    name: 'Keshav Mukarji',
    role: 'UI/UI Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    id: 2,
    name: 'Sai Devant',
    role: 'UI/UI Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    id: 3,
    name: 'Sunny Leli',
    role: 'UI/UI Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/women/35.jpg',
  },
  {
    id: 4,
    name: 'Priya Jha',
    role: 'UI/UI Design at ABC software Pvt. Ltd.',
    image: 'https://randomuser.me/api/portraits/women/36.jpg',
  },
];

const RightSidebar = () => {
  return (
    <>
      <div className="skill-matches-card">
        <div className="skill-matches-title">Skill matches</div>
        <div className="skill-matches-divider" />
        <ul className="skill-matches-list">
          {skillMatches.map((person) => (
            <li key={person.id} className="skill-matches-list-item">
              <img src={person.image} alt={person.name} className="skill-matches-avatar" />
              <div className="skill-matches-info">
                <div className="skill-matches-name">{person.name}</div>
                <div className="skill-matches-role">{person.role}</div>
                <button className="skill-matches-connect-btn">
                  <FiUserPlus className="skill-matches-connect-icon" /> Connect
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="skill-matches-divider" style={{ marginTop: 18, marginBottom: 0 }} />
        <div className="skill-matches-discover">Discover more</div>
      </div>
      {/* Request / Invitation Card */}
      <div className="invitation-card">
        <div className="invitation-title">
          Request / Invitation <span className="invitation-count">(26)</span>
        </div>
        <div className="invitation-divider" />
        <ul className="invitation-list">
          {invitations.map((person) => (
            <li key={person.id} className="invitation-list-item">
              <img src={person.image} alt={person.name} className="invitation-avatar" />
              <div className="invitation-info">
                <div className="invitation-name">{person.name}</div>
                <div className="invitation-role">{person.role}</div>
                <div className="invitation-btn-group">
                  <button className="invitation-accept-btn">Accept</button>
                  <button className="invitation-ignore-btn">Ignore</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="invitation-divider" style={{ marginTop: 18, marginBottom: 0 }} />
        <div className="invitation-discover">Discover more</div>
      </div>
    </>
  );
};

export default RightSidebar;