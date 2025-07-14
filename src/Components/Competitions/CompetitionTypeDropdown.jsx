import React from 'react';
import './CompetitionTypeDropdown.css';

const competitionTypes = [
  'All',
  'Hiring Challenges',
  'Quizzes',
  'Hackathons',
  'Cultural Events'
];

const CompetitionTypeDropdown = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="competition-type-dropdown">
      {competitionTypes.map(type => (
        <div key={type} className="dropdown-item">
          <label htmlFor={`type-${type}`}>{type}</label>
          <input type="checkbox" id={`type-${type}`} name={`type-${type}`} defaultChecked />
        </div>
      ))}
    </div>
  );
};

export default CompetitionTypeDropdown; 