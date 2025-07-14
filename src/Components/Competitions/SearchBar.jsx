import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaSearch, FaChevronDown, FaFilter, FaPlus } from 'react-icons/fa';
import CompetitionTypeDropdown from './CompetitionTypeDropdown';
import CategoryDropdown from './CategoryDropdown';

const SearchBar = ({ onFilterClick, onHostClick }) => {
  const [showCompetitionsDropdown, setShowCompetitionsDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const competitionsDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const competitionsButtonRef = useRef(null);
  const categoryButtonRef = useRef(null);

  const handleToggleCompetitionsDropdown = () => {
    setShowCompetitionsDropdown(prev => !prev);
    setShowCategoryDropdown(false);
  };

  const handleToggleCategoryDropdown = () => {
    console.log('Category button clicked');
    setShowCategoryDropdown(prev => !prev);
    setShowCompetitionsDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (competitionsButtonRef.current && competitionsButtonRef.current.contains(event.target)) ||
        (categoryButtonRef.current && categoryButtonRef.current.contains(event.target))
      ) {
        return;
      }

      if (
        competitionsDropdownRef.current &&
        !competitionsDropdownRef.current.contains(event.target)
      ) {
        setShowCompetitionsDropdown(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="competitions-search-bar">
      <Row className="w-100 align-items-center gx-2">
        <Col lg={4} md={12} className="mb-2 mb-lg-0">
          <div className="search-input-group">
            <FaSearch className="search-icon" />
            <Form.Control
              type="text"
              placeholder="competition name, category, company"
              className="search-input"
            />
            <Button variant="primary" className="search-button">Search</Button>
          </div>
        </Col>
        <Col lg={6} md={8} xs={12} className="mb-2 mb-lg-0">
          <Row className="gx-2">
            <Col>
              <div className="dropdown-container" ref={competitionsDropdownRef}>
                <Button ref={competitionsButtonRef} variant="outline-secondary" className="filter-dropdown-btn w-100" onClick={() => { console.log('Competitions button clicked'); handleToggleCompetitionsDropdown(); }}>
                  Competitions <FaChevronDown />
                </Button>
                <CompetitionTypeDropdown show={showCompetitionsDropdown} />
              </div>
            </Col>
            <Col>
              <div className="dropdown-container" ref={categoryDropdownRef}>
                <Button ref={categoryButtonRef} variant="outline-secondary" className="filter-dropdown-btn w-100" onClick={() => { console.log('Category button clicked'); handleToggleCategoryDropdown(); }}>
                  Category <FaChevronDown />
                </Button>
                <CategoryDropdown show={showCategoryDropdown} onClose={() => setShowCategoryDropdown(false)} />
              </div>
            </Col>
            <Col>
              <Button variant="outline-secondary" className="filter-dropdown-btn w-100" onClick={() => { console.log('Filters button clicked'); onFilterClick(); }}>
                <FaFilter style={{ marginRight: '5px' }} />
                Filters <FaChevronDown />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={2} md={4} xs={12}>
          <Button variant="outline-primary" className="host-competition-btn w-100" onClick={onHostClick}>
          <svg  className='host-button' style={{ marginRight: '5px'}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.92 4.956L3.45 3.473M12.759 4.956L14.229 3.473M3.449 14.353L4.919 12.869M8.839 2.979V1M2.959 8.913H1M14.875 14.836L18.689 13.33C18.781 13.2932 18.8599 13.2296 18.9155 13.1475C18.971 13.0655 19.0007 12.9686 19.0007 12.8695C19.0007 12.7704 18.971 12.6735 18.9155 12.5915C18.8599 12.5094 18.781 12.4458 18.689 12.409L9.524 8.794C9.43478 8.75947 9.33742 8.7517 9.24385 8.77165C9.15028 8.7916 9.06456 8.8384 8.99718 8.90631C8.92979 8.97423 8.88367 9.06031 8.86446 9.15404C8.84524 9.24776 8.85377 9.34505 8.889 9.434L12.471 18.685C12.633 19.105 13.221 19.105 13.383 18.685L14.875 14.836Z" stroke="#3C5898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
            Host a Competition
          </Button>
        </Col>
      </Row>
    </div>
  );
};

SearchBar.defaultProps = {
  onFilterClick: () => {},
  onHostClick: () => {},
};

export default SearchBar; 