import React, { useState } from 'react';
import './CategoryDropdown.css';
import { FaSearch } from 'react-icons/fa';
import xyz from '../../Assests/Images/xyz.png';

const categories = [
  'Architecture',
  'Article writing',
  'Arts',
  'Awards',
  'Business',
  'Business plan',
  'Camps',
  'Case study',
  'Cooking',
  'Data Analytics',
  // Add more as needed
];

const CategoryDropdown = ({ show, onClose }) => {
  const [search, setSearch] = useState('');

  if (!show) return null;

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="category-dropdown">
      <div className="dropdown-header">
        <span>Category</span>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-list">
        {filteredCategories.map(cat => (
          <div key={cat} className="category-item">
            <img src={xyz} alt="" className="category-icon" />
            <label htmlFor={`cat-${cat}`}>{cat}</label>
            <input type="checkbox" id={`cat-${cat}`} defaultChecked />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown; 