import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import CompetitionWideCard from './CompetitionWideCard';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';

const ViewAllCompetitionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Expecting competitions and activeTab to be passed via location.state
  const { competitions = [], activeTab = 'suggested' } = location.state || {};
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  

  return (
    <>
    
    <Container fluid className='searchbar-main-border'>
      <div className='search-bar-main-top-header'>
        <div className='search-bar-below-small-header'>
          <SearchBar  onFilterClick={() => setIsFilterOpen(true)} onHostClick={() => navigate('/host-competition')} />
        </div>
      </div>
      </Container>
      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <div className='view-all-competitions-page'>
      <Container fluid>
      <div className='view-all-main-header'>
      <div className="view-all-list">
        {competitions.length === 0 ? (
          <p>No competitions found.</p>
        ) : (
          competitions.map(comp => (
            <CompetitionWideCard
              key={comp.id}
              logo={comp.logo}
              title={comp.title}
              subtitle={comp.subtitle}
              status={comp.isOnline ? "ONLINE" : "OFFLINE"}
              description={comp.description}
              location={comp.location || "Vidyavardhaka College of Engineering, Mysore, Karnataka, India"}
              updateDate={comp.updateDate || "Apr 11, 2025"}
              registrationDeadline={comp.registrationDeadline || "24 Apr 25, 11:59 PM IST"}
              teamSize={comp.teamSize || "2 - 4 Members"}
              level={comp.level}
              cashPrize={comp.cashPrize || "80,000"}
              price={comp.price || "899"}
              category={comp.category || "Hackathon"}
              onRegister={() => navigate('/competition/register')}
            />
          ))
        )}
      </div>
      </div>
      </Container>
      </div>
      
    
    </>
  );
};

export default ViewAllCompetitionsPage; 