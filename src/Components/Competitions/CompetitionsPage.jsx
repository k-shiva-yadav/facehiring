import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './CompetitionsPage.css';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import CompetitionPromoSection from './CompetitionPromoSection';
import FeaturedCompetitionsCarousel from './FeaturedCompetitionsCarousel';
import HostCompetitionSection from './HostCompetitionSection';
import HostCompetitionDashboard from './HostCompetitionDashboard';
import TeamRegistrationSection from './TeamRegistrationSection';
import CompetitionPaymentSection from './CompetitionPaymentSection';
import CompetitionCardExact from './CompetitionCardExact';
import CompetitionWideCard from './CompetitionWideCard';
import HostCompetitionPage from './EmployerDashboardV2';
import ViewAllCompetitionsPage from './ViewAllCompetitionsPage';
import compImg1 from '../../Assests/Images/competition1.jpg';
import compImg2 from '../../Assests/Images/competition2.jpg';
import compImg3 from '../../Assests/Images/competition3.jpg';
import compImg4 from '../../Assests/Images/competition4.jpg';
import compImg5 from '../../Assests/Images/competition5.jpg';
import compImg6 from '../../Assests/Images/competition6.jpg';
import compImg7 from '../../Assests/Images/competition7.jpg';
import compImg8 from '../../Assests/Images/competition8.jpg';
import courseImg1 from '../../Assests/Images/profile-img1.png';
import courseImg2 from '../../Assests/Images/profile-img2.png';
import courseImg3 from '../../Assests/Images/profile-img3.png';
import courseImg4 from '../../Assests/Images/course-4.png';
import courseImg5 from '../../Assests/Images/course-5.png';
import courseImg6 from '../../Assests/Images/course-6.png';
// No course-7.png or course-8.png, so fallback to courseImg1 and courseImg2
const courseImg7 = courseImg1;
const courseImg8 = courseImg2;

const competitions = [
  {
    id: 1,
    title: 'UI/UX DESIGN CHALLENGE',
    subtitle: 'UI/UX Design Challenge 2025',
    description: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward.',
    deadline: 'Apr 25',
    prize: '10,000',
    level: 'Intermediate',
    daysLeft: 2,
    applied: 84,
    image: compImg1,
    logo: courseImg1,
    isFree: true,
    isOnline: true,
  },
  {
    id: 2,
    title: 'UI/UX DESIGN PRINCIPLES',
    subtitle: 'UI/UX Design Challenge 2025',
    description: 'Participate in an industry-led design challenge to showcase your creative skills and win exciting reward.',
    deadline: 'Apr 25',
    prize: '10,000',
    level: 'Intermediate',
    daysLeft: 2,
    applied: 84,
    image: compImg2,
    logo: courseImg2,
    isFree: true,
    isOnline: true,
  },
  {
    id: 3,
    title: 'DATA ANALYTICS CHALLENGE',
    subtitle: 'Analytics Pro 2025',
    description: 'Showcase your data skills and win prizes in this analytics challenge.',
    deadline: 'May 10',
    prize: '15,000',
    level: 'Advanced',
    daysLeft: 10,
    applied: 120,
    image: compImg3,
    logo: courseImg3,
    isFree: false,
    isOnline: true,
    price: '1499',
  },
  {
    id: 4,
    title: 'HACKATHON 2025',
    subtitle: 'Global Hackathon',
    description: 'Join the global hackathon and solve real-world problems.',
    deadline: 'May 20',
    prize: '20,000',
    level: 'Beginner',
    daysLeft: 15,
    applied: 200,
    image: compImg4,
    logo: courseImg4,
    isFree: true,
    isOnline: false,
  },
  {
    id: 5,
    title: 'BUSINESS PLAN CONTEST',
    subtitle: 'BizPlan 2025',
    description: 'Pitch your business idea and win funding.',
    deadline: 'Jun 1',
    prize: '25,000',
    level: 'Intermediate',
    daysLeft: 20,
    applied: 60,
    image: compImg5,
    logo: courseImg5,
    isFree: true,
    isOnline: false,
  },
  {
    id: 6,
    title: 'QUIZ MASTERS',
    subtitle: 'Quiz Masters 2025',
    description: 'Test your knowledge and win exciting prizes.',
    deadline: 'Jun 10',
    prize: '5,000',
    level: 'Beginner',
    daysLeft: 30,
    applied: 150,
    image: compImg6,
    logo: courseImg6,
    isFree: true,
    isOnline: true,
  },
];

const appliedCompetitions = [
  {
    id: 101,
    title: 'APPLIED DESIGN CHALLENGE',
    subtitle: 'Applied UI/UX',
    description: 'You have applied to this design challenge.',
    deadline: 'Apr 30',
    prize: '8,000',
    level: 'Intermediate',
    daysLeft: 5,
    applied: 50,
    image: compImg4,
    logo: courseImg4,
    isFree: true,
    isOnline: true,
  },
  {
    id: 102,
    title: 'APPLIED HACKATHON',
    subtitle: 'Hackathon 2025',
    description: 'You have applied to this hackathon.',
    deadline: 'May 5',
    prize: '12,000',
    level: 'Advanced',
    daysLeft: 12,
    applied: 90,
    image: compImg5,
    logo: courseImg5,
    isFree: false,
    isOnline: false,
  },
  {
    id: 103,
    title: 'APPLIED QUIZ',
    subtitle: 'Quiz 2025',
    description: 'You have applied to this quiz.',
    deadline: 'May 15',
    prize: '3,000',
    level: 'Beginner',
    daysLeft: 18,
    applied: 30,
    image: compImg6,
    logo: courseImg6,
    isFree: true,
    isOnline: true,
  },
];

const savedCompetitions = [
  {
    id: 201,
    title: 'SAVED DESIGN CHALLENGE',
    subtitle: 'Saved UI/UX',
    description: 'You have saved this design challenge.',
    deadline: 'May 2',
    prize: '9,000',
    level: 'Intermediate',
    daysLeft: 7,
    applied: 40,
    image: compImg7,
    logo: courseImg7,
    isFree: true,
    isOnline: true,
  },
  {
    id: 202,
    title: 'SAVED HACKATHON',
    subtitle: 'Saved Hackathon',
    description: 'You have saved this hackathon.',
    deadline: 'May 12',
    prize: '14,000',
    level: 'Advanced',
    daysLeft: 14,
    applied: 70,
    image: compImg8,
    logo: courseImg8,
    isFree: false,
    isOnline: false,
  },
  {
    id: 203,
    title: 'SAVED QUIZ',
    subtitle: 'Saved Quiz',
    description: 'You have saved this quiz.',
    deadline: 'May 20',
    prize: '4,000',
    level: 'Beginner',
    daysLeft: 22,
    applied: 25,
    image: compImg1,
    logo: courseImg1,
    isFree: true,
    isOnline: true,
  },
];

const getCardProps = (comp) => ({
  title: comp.title,
  subtitle: comp.subtitle,
  isOnline: comp.isOnline,
  description: comp.description,
  deadline: comp.deadline,
  prize: comp.prize,
  level: comp.level,
  daysLeft: comp.daysLeft,
  applied: comp.applied,
  isFree: comp.isFree,
  price: comp.price,
  bannerImg: comp.image,
  logoImg: comp.logo,
});

const CompetitionsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('suggested');
  const [showEmployerDashboard, setShowEmployerDashboard] = useState(false);
  const [showTeamRegistration, setShowTeamRegistration] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [savedIds, setSavedIds] = useState([]); // Track saved competition IDs
  const [appliedIds, setAppliedIds] = useState([]); // NEW: Track applied competition IDs
  const navigate = useNavigate();

  const handleRegister = (competition) => {
    setSelectedCompetition(competition);
    setShowTeamRegistration(true);
  };

  const handleBackFromTeam = () => {
    setShowTeamRegistration(false);
    setSelectedCompetition(null);
  };

  const handleNextFromTeam = () => {
    setShowTeamRegistration(false);
    setShowPayment(true);
  };

  const handleBackFromPayment = () => {
    setShowPayment(false);
    setShowTeamRegistration(true);
  };

  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleParticipate = (id) => {
    setAppliedIds((prev) => prev.includes(id) ? prev : [...prev, id]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'suggested':
        return (
          <Row className="gy-4 gx-5 py-1">
            {competitions.map(comp => (
              <Col key={comp.id} lg={6} md={12} sm={12}>
                <CompetitionCardExact
                  {...getCardProps(comp)}
                  saved={savedIds.includes(comp.id)}
                  onToggleSave={() => handleToggleSave(comp.id)}
                  applied={appliedIds.includes(comp.id)}
                  onParticipate={() => handleParticipate(comp.id)}
                />
              </Col>
            ))}
          </Row>
        );
      case 'applied':
        return (
          <div style={{ padding: '10px 0' }}>
            <Row className="gy-4">
              {competitions
                .filter(comp => appliedIds.includes(comp.id))
                .map(comp => (
                  <Col key={comp.id} lg={6} md={12} sm={12}>
                    <CompetitionCardExact
                      {...getCardProps(comp)}
                      saved={savedIds.includes(comp.id)}
                      onToggleSave={() => handleToggleSave(comp.id)}
                      applied={true}
                      onParticipate={() => {}}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        );
      case 'saved':
        return (
          <div style={{ padding: '10px 0' }}>
            <Row className="gy-4">
              {competitions
                .filter(comp => savedIds.includes(comp.id))
                .map(comp => (
                  <Col key={comp.id} lg={6} md={12} sm={12}>
                    <CompetitionCardExact
                      {...getCardProps(comp)}
                      saved={true}
                      onToggleSave={() => handleToggleSave(comp.id)}
                      applied={appliedIds.includes(comp.id)}
                      onParticipate={() => handleParticipate(comp.id)}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <div className='search-bar-main-top-header'>
      <div className='search-bar-below-small-header'>
    {!showEmployerDashboard && (
            <SearchBar onFilterClick={() => setIsFilterOpen(true)} onHostClick={() => navigate('/host-competition')} />
          )}
    </div>
    </div>
    <div className="competitions-page">
      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <Container fluid>
        <div className="competitions-inner-container">
        
          {showPayment && selectedCompetition ? (
            <CompetitionPaymentSection competition={selectedCompetition} onBack={handleBackFromPayment} />
          ) : showTeamRegistration && selectedCompetition ? (
            <TeamRegistrationSection competition={selectedCompetition} onBack={handleBackFromTeam} onNext={handleNextFromTeam} />
          ) : (
            <>
              <div className="competitions-header">
                <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  <Nav.Item>
                    <Nav.Link eventKey="suggested">Suggested Competitions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="applied">Applied Competitions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="saved">Saved Competitions</Nav.Link>
                  </Nav.Item>
                </Nav>
                <div className="actions">
                  <a href="/how-it-works" className="how-it-works-link">How It Works</a>
                </div>
              </div>
              <div className="competitions-body">
                <div className="competitions-body-header">
                  <h2 className="body-title">Competitions based on your profile</h2>
                  <Button
                    variant="outline-primary"
                    className="view-all-btn"
                    onClick={() => {
                      let data = [];
                      if (activeTab === 'suggested') data = competitions;
                      else if (activeTab === 'applied') data = appliedCompetitions;
                      else if (activeTab === 'saved') data = savedCompetitions;
                      navigate('/competitions/view-all', {
                        state: {
                          competitions: data,
                          activeTab,
                        },
                      });
                    }}
                  >
                    View All <FaArrowRight />
                  </Button>
                </div>
                {renderContent()}
                <h2 className="featured-heading">Featured Competitions</h2>
                <FeaturedCompetitionsCarousel />
                <CompetitionPromoSection />
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
    </>
  );
};

export default CompetitionsPage; 