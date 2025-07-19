import React, { useState, useEffect } from "react";
import './CompetitionWideCard.css'; // Reuse some styles for now
import './CompetitionRegister.css';
import SearchBar from './SearchBar';
import CompetitionWideCard from './CompetitionWideCard';
import competitions from './mockCompetitions';
import { useNavigate, useLocation } from 'react-router-dom';
import badge02 from '../../Assests/Images/Badge_02.png';
import badge01 from '../../Assests/Images/Badge_01.png';
import badge03 from '../../Assests/Images/Badge_03.png';
import FilterSidebar from './FilterSidebar';
import CompetitionCard from './CompetitionCard';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Copy of handlePostCompetition for preview
const handlePreviewPostCompetition = async ({ formData, rounds, rewards, posterFile, backgroundFile }) => {
  // Console the payload
  console.log('Payload:', { formData, rounds, rewards, posterFile, backgroundFile });
  toast.success('Posting competition...');
  const payload = new FormData();
  payload.append('Id', '');
  payload.append('Title', formData.Title);
  payload.append('CompetitionType', formData.CompetitionType);
  payload.append('CompanyName', formData.CompanyName);
  payload.append('EligibilityCriteria', formData.EligibilityCriteria);
  payload.append('ModeOfEvent', formData.ModeOfEvent);
  payload.append('Description', formData.Description);
  payload.append('RegistrationFee', formData.RegistrationFee || 0);
  payload.append('ParticipateAsTeam', formData.ParticipateAsTeam || false);
  payload.append('RegistrationStart', formData.RegistrationStart);
  payload.append('RegistrationEnd', formData.RegistrationEnd);
  payload.append('MinLimit', formData.MinLimit || 1);
  payload.append('Maxlimit', formData.Maxlimit || 1);
  payload.append('Location', formData.Location);
  if (posterFile) payload.append('CompetitionPoster', posterFile);
  if (backgroundFile) payload.append('CompetitionBackgroundImage', backgroundFile);

  let debugObj = { payload: { formData, rounds, rewards, posterFile, backgroundFile } };

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('https://facehiringapi.codingster.in/api/Competition/Create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });
    if (res.ok) {
      const data = await res.json();
      toast.success('✅ Competition posted successfully!');
      console.log('Main API response:', data);
      debugObj.mainApi = data;
      const competitionId = data.id || data.Id || data.competitionId || (data.data && (data.data.id || data.data.Id || data.data.competitionId)) || 'fake_id';
      // --- POST to CompetitionRound API for each round ---
      for (const round of rounds) {
        const roundPayload = {
          Id: '',
          CompetitionId: competitionId,
          Name: round.title,
          RoundStart: round.startDate,
          UploadCompetitionFile: '',
          CreatedOn: '',
          CreatedBy: '',
          ModifiedOn: '',
          ModifiedBy: '',
          IsActive: true,
          IsDelete: false,
          Competition: {
            Id: competitionId,
            Title: formData.Title,
            CompetitionType: formData.CompetitionType,
            CompanyName: formData.CompanyName,
            EligibilityCriteria: formData.EligibilityCriteria,
            ModeOfEvent: formData.ModeOfEvent,
            Description: formData.Description,
            RegistrationFee: formData.RegistrationFee,
            ParticipateAsTeam: formData.ParticipateAsTeam,
            RegistrationStart: formData.RegistrationStart,
            RegistrationEnd: formData.RegistrationEnd,
            CompetitionPoster: '',
            CompetitionBackgroundImage: '',
            CreatedOn: '',
            CreatedBy: '',
            ModifiedOn: '',
            ModifiedBy: '',
            IsActive: true,
            IsDelete: false,
            Maxlimit: formData.Maxlimit,
            MinLimit: formData.MinLimit,
            CompetitionRewards: [],
            CompetitionRounds: []
          }
        };
        const roundRes = await fetch('https://facehiringapi.codingster.in/api/CompetitionRound/Create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(roundPayload),
        });
        const roundResData = await roundRes.json().catch(() => ({}));
        console.log('CompetitionRound API response:', roundResData);
      }
      // --- POST to CompetitionReward API for each reward ---
      for (const reward of rewards) {
        const rewardPayload = {
          Id: '',
          CompetitionId: competitionId,
          Name: reward.label,
          RewardImage: ''
        };
        const rewardRes = await fetch('https://facehiringapi.codingster.in/api/CompetitionReward/Create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(rewardPayload),
        });
        const rewardResData = await rewardRes.json().catch(() => ({}));
        console.log('CompetitionReward API response:', rewardResData);
      }
      // Redirect immediately after posting
      window.location.href = '/host-competition';
    } else {
      const errText = await res.text();
      toast.error('Error posting competition.');
      console.error('❌ API Error:', errText);
    }
  } catch (err) {
    toast.error('Network or server error.');
    console.error('❌ Network Error:', err);
  }
};

const CompetitionRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isWide, setIsWide] = useState(window.innerWidth >= 1200);
  const [debugData, setDebugData] = useState(null); // For showing API data

  // Get preview data if present
  const previewData = location.state || {};
  const {
    formData,
    rounds,
    rewards,
    posterFile,
    backgroundFile
  } = previewData;

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth >= 1200);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to get preview or fallback
  const getValue = (key, fallback) => (formData && formData[key] ? formData[key] : fallback);

  // Helper to get status
  const getStatus = (mode) => {
    if (!mode) return competitions[0].isOnline ? 'ONLINE' : 'OFFLINE';
    if (typeof mode === 'string') {
      const m = mode.trim().toLowerCase();
      if (m === 'online') return 'ONLINE';
      if (m === 'offline') return 'OFFLINE';
    }
    return competitions[0].isOnline ? 'ONLINE' : 'OFFLINE';
  };

  // Updated handlePreviewPostCompetition
  const handlePreviewPostCompetition = async ({ formData, rounds, rewards, posterFile, backgroundFile }) => {
    // Console the payload
    const payloadData = { formData, rounds, rewards, posterFile, backgroundFile };
    console.log('Payload:', payloadData);
    toast.success('Posting competition...');
    const payload = new FormData();
    payload.append('Id', '');
    payload.append('Title', formData.Title);
    payload.append('CompetitionType', formData.CompetitionType);
    payload.append('CompanyName', formData.CompanyName);
    payload.append('EligibilityCriteria', formData.EligibilityCriteria);
    payload.append('ModeOfEvent', formData.ModeOfEvent);
    payload.append('Description', formData.Description);
    payload.append('RegistrationFee', formData.RegistrationFee || 0);
    payload.append('ParticipateAsTeam', formData.ParticipateAsTeam || false);
    payload.append('RegistrationStart', formData.RegistrationStart);
    payload.append('RegistrationEnd', formData.RegistrationEnd);
    payload.append('MinLimit', formData.MinLimit || 1);
    payload.append('Maxlimit', formData.Maxlimit || 1);
    payload.append('Location', formData.Location);
    if (posterFile) payload.append('CompetitionPoster', posterFile);
    if (backgroundFile) payload.append('CompetitionBackgroundImage', backgroundFile);

    let debugObj = { payload: payloadData };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://facehiringapi.codingster.in/api/Competition/Create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      if (res.ok) {
        const data = await res.json();
        toast.success('✅ Competition posted successfully!');
        console.log('Main API response:', data);
        debugObj.mainApi = data;
        const competitionId = data.id || data.Id || data.competitionId || (data.data && (data.data.id || data.data.Id || data.data.competitionId)) || 'fake_id';
        // --- POST to CompetitionRound API for each round ---
        for (const round of rounds) {
          const roundPayload = {
            Id: '',
            CompetitionId: competitionId,
            Name: round.title,
            RoundStart: round.startDate,
            UploadCompetitionFile: '',
            CreatedOn: '',
            CreatedBy: '',
            ModifiedOn: '',
            ModifiedBy: '',
            IsActive: true,
            IsDelete: false,
            Competition: {
              Id: competitionId,
              Title: formData.Title,
              CompetitionType: formData.CompetitionType,
              CompanyName: formData.CompanyName,
              EligibilityCriteria: formData.EligibilityCriteria,
              ModeOfEvent: formData.ModeOfEvent,
              Description: formData.Description,
              RegistrationFee: formData.RegistrationFee,
              ParticipateAsTeam: formData.ParticipateAsTeam,
              RegistrationStart: formData.RegistrationStart,
              RegistrationEnd: formData.RegistrationEnd,
              CompetitionPoster: '',
              CompetitionBackgroundImage: '',
              CreatedOn: '',
              CreatedBy: '',
              ModifiedOn: '',
              ModifiedBy: '',
              IsActive: true,
              IsDelete: false,
              Maxlimit: formData.Maxlimit,
              MinLimit: formData.MinLimit,
              CompetitionRewards: [],
              CompetitionRounds: []
            }
          };
          const roundRes = await fetch('https://facehiringapi.codingster.in/api/CompetitionRound/Create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(roundPayload),
          });
          const roundResData = await roundRes.json().catch(() => ({}));
          console.log('CompetitionRound API response:', roundResData);
        }
        // --- POST to CompetitionReward API for each reward ---
        for (const reward of rewards) {
          const rewardPayload = {
            Id: '',
            CompetitionId: competitionId,
            Name: reward.label,
            RewardImage: ''
          };
          const rewardRes = await fetch('https://facehiringapi.codingster.in/api/CompetitionReward/Create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(rewardPayload),
          });
          const rewardResData = await rewardRes.json().catch(() => ({}));
          console.log('CompetitionReward API response:', rewardResData);
        }
        // Redirect immediately after posting
        window.location.href = '/host-competition';
      } else {
        const errText = await res.text();
        toast.error('Error posting competition.');
        console.error('❌ API Error:', errText);
      }
    } catch (err) {
      toast.error('Network or server error.');
      console.error('❌ Network Error:', err);
    }
  };

  return (
    <>
      <FilterSidebar isOpen={isFilterOpen} onClose={toggleFilter} />
      {isWide ? (
        <>
          <Container fluid className='searchbar-main-border'>
            <div className='search-bar-main-top-header'>
              <div className='search-bar-below-small-header'>
                <SearchBar onFilterClick={toggleFilter} onHostClick={() => navigate('/host-competition')} />
              </div>
            </div>
          </Container>
          <div className="competition-details-page">
            <Container fluid>
              <div className="competition-details-inner-width">
                {formData ? (
                  <>
                    <CompetitionWideCard
                      title={formData.Title || competitions[0].title}
                      subtitle={formData.CompanyName || competitions[0].subtitle}
                      status={getStatus(formData.ModeOfEvent)}
                      logo={posterFile ? URL.createObjectURL(posterFile) : competitions[0].logo}
                      description={formData.Description || competitions[0].description}
                      location={formData.Location || 'Vidyavardhaka College of Engineering, Mysore, Karnataka, India'}
                      updateDate={competitions[0].updateDate || 'Apr 11, 2025'}
                      registrationDeadline={formData.RegistrationEnd || '24 Apr 25, 11:59 PM IST'}
                      teamSize={(formData.MinLimit || '2') + ' - ' + (formData.Maxlimit || '4') + ' Members'}
                      level={competitions[0].level}
                      cashPrize={competitions[0].cashPrize || '80,000'}
                      price={formData.RegistrationFee || competitions[0].price || '899'}
                      category={formData.CompetitionType || competitions[0].category || 'Hackathon'}
                      onRegister={() => navigate('/competition/registration-success')}
                    />
                    {/* Eligibility Section */}
                    <div className="details-card">
                      <h2>Eligibility</h2>
                      <div className="eligibility-info">
                        {formData.EligibilityCriteria || 'Engineering Students | MBA Students | Undergraduate | Postgraduate | Experienced Professionals'}
                      </div>
                    </div>
                    {/* About Section */}
                    <div className="details-card about-card">
                      <h2>All that you need to know about {formData.Title || competitions[0].title}</h2>
                      <p>{formData.Description || competitions[0].description}</p>
                    </div>
                    {/* Rounds Preview */}
                    {rounds && rounds.length > 0 && (
                      <div className="details-card timeline-card">
                        <h2 style={{ fontSize: 22 }}>Stages and Timelines</h2>
                        {rounds.map((r, i) => (
                          <div key={i} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src="https://img.icons8.com/color/48/000000/calendar--v1.png" alt="calendar" style={{ width: 22, height: 22 }} />
                            <span><b>Round {i + 1}:</b> {r.title} &nbsp; <b>Start:</b> {r.startDate}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Contact the organisers Section */}
                    <div className="details-card organizer-card">
                      <h2 style={{ fontSize: 22 }}>Contact the organisers</h2>
                      <div className="organizer-info">
                        <div className="organizer-avatar">
                          {(formData.organizerName && formData.organizerName[0]) || 'M'}
                        </div>
                        <div style={{ lineHeight: 1.5 }}>
                          <div style={{ fontWeight: 500, fontSize: 16 }}>{formData.organizerName || 'MGMCEN Hackathon'}</div>
                          <div style={{ color: '#555', fontSize: 15 }}>{formData.organizerEmail || 'hackspectra@mgmcen.ac.in'}</div>
                          <div style={{ color: '#555', fontSize: 15 }}>{formData.organizerPhone || '+919021226872'}</div>
                        </div>
                      </div>
                    </div>
                    {/* Rewards Preview with medals */}
                    {rewards && rewards.length > 0 && (
                      <div className="details-card prize-card">
                        <h2 style={{ fontSize: 22 }}>What's at stake - Rewards and Prizes?</h2>
                        {/* Prize Pool (optional, can be static or from data) */}
                        <div style={{ color: '#444', fontSize: 16, marginBottom: 24 }}>₹{competitions[0].cashPrize || '80,000'} Prize Pool</div>
                        {rewards.map((r, i) => {
                          let medalImg = badge03; // default bronze
                          if (i === 0) medalImg = badge02; // gold
                          else if (i === 1) medalImg = badge01; // silver
                          else if (i === 2) medalImg = badge03; // bronze
                          // for 4th, 5th, etc. use bronze
                          return (
                            <div className="prize-item" key={i}>
                              <div>
                                <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 6 }}>{r.label}</div>
                                <div style={{ fontWeight: 700, fontSize: 28 }}>{r.type}</div>
                              </div>
                              <img src={medalImg} alt="medal" />
                            </div>
                          );
                        })}
                        {/* Participation Certificate always shown */}
                        <div className="prize-item">
                          <div style={{ fontWeight: 500, fontSize: 18 }}>Participation Certificate</div>
                          <button className="certificate-btn">
                            <img src="https://img.icons8.com/ios-filled/24/3C5898/certificate.png" alt="certificate" style={{ width: 22, height: 22 }} />
                            Certificate
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Action Buttons always shown */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
                      <button
                        className="back-btn"
                        style={{ borderRadius: '24px', fontWeight: 500, fontSize: '1rem', padding: '6px 24px', border: '1.5px solid #3C5898', color: '#3C5898', background: '#fff' }}
                        onClick={() => toast.success('Draft saved (not implemented)')}
                      >
                        Draft competition
                      </button>
                      <button
                        className="post-btn"
                        style={{ borderRadius: '24px', fontWeight: 500, fontSize: '1rem', padding: '6px 24px', background: '#3C5898', color: '#fff', border: 'none' }}
                        onClick={() => handlePreviewPostCompetition({ formData, rounds, rewards, posterFile, backgroundFile })}
                      >
                        Post competition
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </Container>
          </div>
        </>
      ) : (
        <>
          <Container fluid className='searchbar-main-border'>
            <div className='search-bar-main-top-header'>
              <div className='search-bar-below-small-header'>
                <SearchBar onFilterClick={toggleFilter} onHostClick={() => navigate('/host-competition')} />
              </div>
            </div>
          </Container>

          <div className="competition-details-page">
            <Container fluid>
              <div className="competition-details-inner-width">
                {/*
                <CompetitionWideCard
                  title={competitions[0].title}
                  subtitle={competitions[0].subtitle}
                  status={competitions[0].isOnline ? "ONLINE" : "OFFLINE"}
                  logo={competitions[0].logo}
                  description={competitions[0].description}
                  location={"Vidyavardhaka College of Engineering, Mysore, Karnataka, India"}
                  updateDate={"Apr 11, 2025"}
                  registrationDeadline={"24 Apr 25, 11:59 PM IST"}
                  teamSize={"2 - 4 Members"}
                  level={competitions[0].level}
                  cashPrize={"80,000"}
                  price={"899"}
                  category={"Hackathon"}
                  onRegister={() => navigate('/competition/registration-success')}
                />
                */}

                {/* Eligibility Section */}
                <div className="details-card">
                  <h2>Eligibility</h2>
                  <div className="eligibility-info">
                    Engineering Students | MBA Students | Undergraduate | Postgraduate | Experienced Professionals
                  </div>
                </div>

                {/* About Section */}
                <div className="details-card about-card">
                  <h2>All that you need to know about HackSpectra 2025</h2>
                  <p><b>Are you ready to push the boundaries of innovation?</b></p>
                  <p>
                    HackSpectra is the first-ever hackathon at MGM's College of Engineering, designed to challenge your technical prowess and creativity. With an Interstellar theme, we invite the brightest minds to solve real-world problems across various domains.
                  </p>
                  <div>
                    <b>Why Participate?</b>
                    <ul>
                      <li>Exciting prizes and goodies</li>
                      <li>24-hour immersive coding experience</li>
                      <li>Networking with industry experts and mentors</li>
                      <li>Internship and recruitment opportunities</li>
                    </ul>
                  </div>
                  <div>
                    <b>Themes:</b>
                    <ul>
                      <li>Final Problem Statements will be given at the Venue, Immediately after the Inauguration.</li>
                      <li>AI & Robotics – Intelligent automation and robotics for enhanced efficiency.</li>
                      <li>Data Science – Big data analytics for smarter insights and decisions.</li>
                      <li>Health Technology – AI-driven healthcare solutions, telemedicine, and medical tech.</li>
                      <li>Education Technology – AI-enhanced and interactive learning tools.</li>
                      <li>Blockchain – Decentralized systems for security and transparency.</li>
                      <li>Students Innovation – Open category for groundbreaking student ideas.</li>
                    </ul>
                  </div>
                  <div>
                    <b>Categories:</b>
                    <ul>
                      <li>Software Track – Focus on application/software-based solutions.</li>
                      <li>Hardware Track – Build hardware prototypes with embedded systems & IoT.</li>
                    </ul>
                  </div>
                  <div>
                    <b>Eligibility:</b>
                    <ul>
                      <li>Open to students & tech professionals</li>
                      <li>Inter-college & inter-specialization teams allowed</li>
                      <li>Team size: 2–4 members</li>
                    </ul>
                  </div>
                  <div>
                    <b>Competition Structure:</b>
                    <div>
                      24-Hour Hackathon (On-Site) – Develop a prototype, build your solution, and present it to the judges.
                    </div>
                  </div>
                  <div>
                    <b>Rules & Guidelines:</b>
                    <ul>
                      <li>All work must be done during the hackathon; pre-built projects will lead to disqualification.</li>
                      <li>Participants must bring their own laptops, software, and required hardware.</li>
                      <li>Internet access will be provided for development purposes.</li>
                      <li>Plagiarism or code theft will result in disqualification.</li>
                      <li>Judges' decisions will be final and binding.</li>
                    </ul>
                  </div>
                  <div>
                    <b>Registration Details:</b>
                    <ul>
                      <li>Fee: ₹899 (Students)</li>
                      <li>Venue: MGM's College of Engineering</li>
                      <li>Date: 22nd April 2025</li>
                      <li>Deadline for Registration: 20th April 2025</li>
                    </ul>
                  </div>
                  <div>
                    Register Now! For more details, visit our official website or reach out to us!
                  </div>
                </div>

                {/* Stages and Timelines Section */}
                <div className="details-card timeline-card">
                  <h2 style={{ fontSize: 22 }}>Stages and Timelines</h2>
                  <div style={{ color: '#444', marginBottom: 18, fontSize: 16 }}>
                    This will be a Offline round! You will see the "Enter" button here, once the round is live.
                  </div>
                  <div className="date-info">
                    <img src="https://img.icons8.com/color/48/000000/calendar--v1.png" alt="calendar" style={{ width: 24, height: 24 }} />
                    <span><b>Start:</b> 22 Apr 25, 11:00 AM IST</span>
                    <span><b>End:</b> 23 Apr 25, 11:00 AM IST</span>
                  </div>
                </div>

                {/* Contact the organisers Section */}
                <div className="details-card organizer-card">
                  <h2 style={{ fontSize: 22 }}>Contact the organisers</h2>
                  <div className="organizer-info">
                    <div className="organizer-avatar">
                      MG
                    </div>
                    <div style={{ lineHeight: 1.5 }}>
                      <div style={{ fontWeight: 500, fontSize: 16 }}>MGMCEN Hackathon</div>
                      <div style={{ color: '#555', fontSize: 15 }}>hackspectra@mgmcen.ac.in</div>
                      <div style={{ color: '#555', fontSize: 15 }}>+919021226872</div>
                    </div>
                  </div>
                </div>

                {/* Rewards and Prizes Section */}
                <div className="details-card prize-card">
                  <h2 style={{ fontSize: 22 }}>What's at stake - Rewards and Prizes?</h2>
                  <div style={{ color: '#444', fontSize: 16, marginBottom: 24 }}>₹80,000 Prize Pool</div>
                  {/* Winner */}
                  <div className="prize-item">
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 6 }}>Winner</div>
                      <div style={{ fontWeight: 700, fontSize: 28 }}>₹50,000</div>
                    </div>
                    <img src={badge02} alt="gold medal" />
                  </div>
                  {/* Runner up */}
                  <div className="prize-item">
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 6 }}>Runner up</div>
                      <div style={{ fontWeight: 700, fontSize: 28 }}>₹20,000</div>
                    </div>
                    <img src={badge01} alt="silver medal" />
                  </div>
                  {/* 2nd runner up */}
                  <div className="prize-item">
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 6 }}>2nd runner up</div>
                      <div style={{ fontWeight: 700, fontSize: 28 }}>₹10,000</div>
                    </div>
                    <img src={badge03} alt="bronze medal" />
                  </div>
                  {/* Participation Certificate */}
                  <div className="prize-item">
                    <div style={{ fontWeight: 500, fontSize: 18 }}>Participation Certificate</div>
                    <button className="certificate-btn">
                      <img src="https://img.icons8.com/ios-filled/24/3C5898/certificate.png" alt="certificate" style={{ width: 22, height: 22 }} />
                      Certificate
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default CompetitionRegister; 