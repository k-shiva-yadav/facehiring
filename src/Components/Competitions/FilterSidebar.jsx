import React from 'react';
import './FilterSidebar.css';
import { FaTimes } from 'react-icons/fa';

const FilterSidebar = ({ isOpen, onClose }) => {
  const filterSections = [
    {
      title: 'Short by :',
      options: [
        { label: 'Prizes (High to Low)', name: 'sort_prize_desc' },
        { label: 'Prizes (Low to High)', name: 'sort_prize_asc' },
        { label: 'Days Left (High to Low)', name: 'sort_days_desc' },
        { label: 'Days Left (Low to High)', name: 'sort_days_asc' },
      ],
      type: 'checkbox'
    },
    {
      title: 'Status :',
      options: [
        { label: 'Live', name: 'status_live' },
        { label: 'Expired', name: 'status_expired' },
        { label: 'Closed', name: 'status_closed' },
        { label: 'Recent', name: 'status_recent' },
      ],
      type: 'checkbox'
    },
    {
      title: 'Event :',
      options: [
        { label: 'Online', name: 'event_online' },
        { label: 'Offline', name: 'event_offline' },
      ],
      type: 'checkbox'
    },
    {
      title: 'Team size :',
      options: [
        { label: '1', name: 'team_1' },
        { label: '2', name: 'team_2' },
        { label: '3', name: 'team_3' },
        { label: '3+', name: 'team_3plus' },
      ],
      type: 'checkbox'
    },
    {
      title: 'Payment :',
      options: [
        { label: 'Paid', name: 'payment_paid' },
        { label: 'Free', name: 'payment_free' },
      ],
      type: 'checkbox'
    },
    {
      title: 'User type :',
      options: [
        { label: 'Professional', name: 'user_professional' },
        { label: 'Startups', name: 'user_startups' },
        { label: 'School Students', name: 'user_school' },
        { label: 'College Students', name: 'user_college' },
      ],
      type: 'checkbox'
    }
  ];

  return (
    <>
      <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h3>Filter</h3>
          <button onClick={onClose} className="close-btn"><FaTimes /></button>
        </div>
        <div className="filter-body">
          {filterSections.map((section, index) => (
            <div key={index} className="filter-section">
              <h4>{section.title}</h4>
              <div className="filter-options">
                {section.options.map((option, idx) => (
                  <div key={idx} className="filter-option">
                    <input type="checkbox" id={option.name} name={option.name} defaultChecked />
                    <label htmlFor={option.name}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
};

export default FilterSidebar; 