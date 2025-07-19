import React, { useState } from 'react';
import './PostCompetition.css';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaGlobe, FaGlobeAsia, FaUser, FaUsers, FaCalendarAlt, FaChevronDown, FaBold, FaItalic, FaListUl, FaListOl, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
const rewardIcons = [
  {
    label: 'Cash Prize', icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F9E6" /><path d="M13 25C13 23.8954 13.8954 23 15 23H25C26.1046 23 27 23.8954 27 25V27H13V25Z" fill="#4CAF50" /><rect x="15" y="15" width="10" height="8" rx="2" fill="#81C784" /><circle cx="20" cy="19" r="2" fill="#388E3C" /></svg>
    )
  },
  {
    label: 'Internship Offer', icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F0FF" /><rect x="13" y="15" width="14" height="10" rx="2" fill="#1976D2" /><rect x="16" y="18" width="8" height="4" rx="1" fill="#90CAF9" /></svg>
    )
  },
  {
    label: 'Job Opportunity', icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#FFF3E6" /><rect x="13" y="15" width="14" height="10" rx="2" fill="#FFA726" /><rect x="16" y="18" width="8" height="4" rx="1" fill="#FFD54F" /></svg>
    )
  },
  {
    label: 'Certificates', icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F7FF" /><rect x="13" y="15" width="14" height="10" rx="2" fill="#00B8D9" /><rect x="16" y="18" width="8" height="4" rx="1" fill="#B2EBF2" /></svg>
    )
  },
];

const UploadCloudIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M34 32C36.2091 32 38 30.2091 38 28C38 25.7909 36.2091 24 34 24H33.74C33.3866 21.7182 31.4192 20 29 20C27.067 20 25.4412 21.2346 25.0762 23.0762C24.7252 24.8452 23.1548 26 21.5 26C19.0147 26 17 23.9853 17 21.5C17 19.0147 19.0147 17 21.5 17C22.8807 17 24.1174 17.6321 24.8787 18.7071" stroke="#3CBAFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 32V28M24 28L22 30M24 28L26 30" stroke="#3CBAFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const RichTextToolbar = () => (
  <div className="richtext-toolbar">
    <button type="button" className="toolbar-btn"><FaBold /></button>
    <button type="button" className="toolbar-btn"><FaItalic /></button>
    <button type="button" className="toolbar-btn"><FaListUl /></button>
    <button type="button" className="toolbar-btn"><FaListOl /></button>
  </div>
);

const PostCompetition = () => {
  const [mode, setMode] = useState('Online');
  const [participationType, setParticipationType] = useState('Team');
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [competitionId, setCompetitionId] = useState('');

  const [formData, setFormData] = useState({
    Title: '',
    CompetitionType: '',
    CompanyName: 'XYZ Software company ltd.',
    EligibilityCriteria: '',
    ModeOfEvent: mode,
    Description: '',
    RegistrationFee: '',
    RegistrationStart: '',
    RegistrationEnd: '',
    MinLimit: '',
    Maxlimit: '',
    Location: '',
    ParticipateAsTeam: participationType === 'Team'
  });
  const [posterFile, setPosterFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [rounds, setRounds] = useState([
    { title: '', startDate: '' }
  ]);
  const [rewards, setRewards] = useState([
    { label: '', type: '' }
  ]);


  const handlePostCompetition = async () => {
    console.log('🟡 handlePostCompetition triggered');
    setLoading(true); // Start loading
    const payload = new FormData();
    payload.append('Id', '');
    payload.append('Title', formData.Title);
    payload.append('CompetitionType', formData.CompetitionType);
    payload.append('CompanyName', formData.CompanyName);
    payload.append('EligibilityCriteria', formData.EligibilityCriteria);
    payload.append('ModeOfEvent', mode); // from toggle
    payload.append('Description', formData.Description);
    payload.append('RegistrationFee', formData.RegistrationFee || 0);
    payload.append('ParticipateAsTeam', participationType === 'Team');
    payload.append('RegistrationStart', formData.RegistrationStart);
    payload.append('RegistrationEnd', formData.RegistrationEnd);
    payload.append('MinLimit', formData.MinLimit || 1);
    payload.append('Maxlimit', formData.Maxlimit || 1);
    payload.append('Location', formData.Location);
    if (posterFile) payload.append('CompetitionPoster', posterFile);
    if (backgroundFile) payload.append('CompetitionBackgroundImage', backgroundFile);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://facehiringapi.codingster.in/api/Competition/Create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // 👈 Add this line
        },
        body: payload,
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('✅ Competition posted successfully!');
        // Log the full response to debug the competition ID field
        console.log('✅ API Success Response (full):', data);
        // Use the real competitionId from the main API response
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
        navigate('/host-competition');
      } else {
        const errText = await res.text();
        console.error('❌ API Error:', errText);
        // alert('Error posting competition.');
        toast.error('Error posting competition.', { role: 'alert' });

      }
    } catch (err) {
      console.error('❌ Network Error:', err);
      // alert('Network or server error.');
      toast.error('Network or server error.', { role: 'alert' });

    } finally {
      setLoading(false); // Stop loading
    }
  };




  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);

  return (
    <div className="post-competition-container">
      <div className="post-competition-card">
        <div className="post-competition-header">
          <h2 className="post-competition-title">Post an Competition</h2>
          <div className="post-competition-tabs-bar-centered">
            <div className="post-competition-tabs-centered">
              <div className={`tab-centered ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
                <span className="tab-icon-circle-centered">1</span>
                <span className="tab-label-centered">Basic Details</span>
              </div>
              <div className={`tab-centered ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
                <span className="tab-icon-circle-centered">2</span>
                <span className="tab-label-centered">Upload</span>
              </div>
            </div>
            <div className="tab-underline-centered" style={{ left: activeTab === 1 ? '0%' : '50%' }} />
          </div>
        </div>
        {activeTab === 1 && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Competition Title<span className="required">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.Title}
                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Competition Type<span className="required">*</span></Form.Label>
              <Form.Select
                required
                value={formData.CompetitionType}
                onChange={(e) => setFormData({ ...formData, CompetitionType: e.target.value })}
              >
                <option value="">Select</option>
                <option>Competition</option>
                <option>Quiz</option>
                <option>Hackathon</option>
                <option>Cultural Event</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company name<span className="required">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Company name"
                value={formData.CompanyName}
                onChange={(e) => setFormData({ ...formData, CompanyName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Eligibility Criteria<span className="required">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Students, Professionals"
                value={formData.EligibilityCriteria}
                onChange={(e) => setFormData({ ...formData, EligibilityCriteria: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Mode of Event<span className="required">*</span></Form.Label>
              <div className="mode-toggle-row">
                <button type="button" className={`mode-toggle-btn${mode === 'Online' ? ' selected' : ''}`} onClick={() => setMode('Online')}>
                  <span className="mode-icon"><FaGlobe size={32} /></span>
                  <span>Online</span>
                </button>
                <button type="button" className={`mode-toggle-btn${mode === 'Offline' ? ' selected' : ''}`} onClick={() => setMode('Offline')}>
                  <span className="mode-icon"><FaGlobeAsia size={32} style={{ textDecoration: 'line-through' }} /></span>
                  <span>Offline</span>
                </button>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Competition description<span className="required">*</span></Form.Label>
              <div className="desc-editor-box">
                <RichTextToolbar />
                <textarea
                  className="desc-textarea"
                  placeholder="..."
                  maxLength={10000}
                  value={formData.Description}
                  onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                />
                <div className="desc-count">{formData.Description.length}/10,000</div>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Registration fee</Form.Label>
              <div className="fee-row">
                <div className="fee-currency-box">
                  <span className="fee-currency">₹</span>
                  <span className="fee-currency-arrow"><FaChevronDown size={14} /></span>
                </div>
                <input
                  type="number"
                  className="fee-input"
                  placeholder="000.00"
                  min="0"
                  step="0.01"
                  value={formData.RegistrationFee}
                  onChange={(e) => setFormData({ ...formData, RegistrationFee: e.target.value })}
                />
                <span className="fee-or">Or</span>
                <button type="button" className="fee-free-btn">Free</button>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Location<span className="required">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Event location"
                value={formData.Location}
                onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Participation Type<span className="required">*</span></Form.Label>
              <div className="participation-toggle-row">
                <button type="button" className={`participation-toggle-btn${participationType === 'Individual' ? ' selected' : ''}`} onClick={() => setParticipationType('Individual')}>
                  <span className="participation-icon"><FaUser size={28} /></span>
                  <span>Individual</span>
                </button>
                <button type="button" className={`participation-toggle-btn${participationType === 'Team' ? ' selected' : ''}`} onClick={() => setParticipationType('Team')}>
                  <span className="participation-icon"><FaUsers size={28} /></span>
                  <span>Participation as a team</span>
                </button>
              </div>
            </Form.Group>
            {participationType === 'Team' && (
              <Form.Group className="mb-4">
                <Form.Label>Participation as a team<span className="required">*</span></Form.Label>
                <div className="team-participation-row-full">
                  <div className="team-input-group">
                    <input
                      type="number"
                      className="team-input-full"
                      placeholder="1"
                      value={formData.MinLimit}
                      onChange={(e) => setFormData({ ...formData, MinLimit: e.target.value })}
                    />
                    <span className="team-label-full">Min</span>
                  </div>
                  <div className="team-input-group">
                    <input
                      type="number"
                      className="team-input-full"
                      placeholder="3"
                      value={formData.Maxlimit}
                      onChange={(e) => setFormData({ ...formData, Maxlimit: e.target.value })}
                    />
                    <span className="team-label-full">Mix</span>
                  </div>
                </div>
              </Form.Group>
            )}
            <Row>
              <Col md={6} xs={12} className="mb-4">
                <Form.Label>Registration Start Date & Time<span className="required">*</span></Form.Label>
                <div className="date-input-row">
                  <input
                    type="datetime-local"
                    className="date-input"
                    value={formData.RegistrationStart}
                    onChange={(e) => setFormData({ ...formData, RegistrationStart: e.target.value })}
                  />
                  {/* <span className="date-icon"><FaCalendarAlt /></span> */}
                </div>
              </Col>
              <Col md={6} xs={12} className="mb-4">
                <Form.Label>Registration End Date & Time<span className="required">*</span></Form.Label>
                <div className="date-input-row">
                  <input
                    type="datetime-local"
                    className="date-input"
                    value={formData.RegistrationEnd}
                    onChange={(e) => setFormData({ ...formData, RegistrationEnd: e.target.value })}
                  />
                  {/* <span className="date-icon"><FaCalendarAlt /></span> */}
                </div>
              </Col>
            </Row>
            <div className="basic-details-actions">
              <Button variant="outline-secondary" className="back-btn" disabled>Back</Button>
              <Button variant="primary" className="next-btn" onClick={() => setActiveTab(2)}>Next</Button>
            </div>
          </Form>
        )}
        {activeTab === 2 && (
          <>
            <div className="upload-tab-content">
              <div className="section-title">Competition Rounds<span className="required">*</span></div>
              <div className="rounds-box">
                {rounds.map((round, idx) => (
                  <div className="round-row" key={idx} style={{ position: 'relative' }}>
                    <div className="round-label">Round {idx + 1}<span className="required">*</span></div>
                    {idx > 0 && (
                      <FaTrash
                        style={{ position: 'absolute', top: 8, right: 8, color: '#dc3545', cursor: 'pointer' }}
                        title="Delete Round"
                        onClick={() => setRounds(rounds.filter((_, i) => i !== idx))}
                      />
                    )}
                    <Form.Control
                      type="text"
                      placeholder="Enter round title"
                      className="mb-2"
                      value={round.title}
                      onChange={e => {
                        const newRounds = [...rounds];
                        newRounds[idx].title = e.target.value;
                        setRounds(newRounds);
                      }}
                    />
                    <Form.Label className="mt-2">Round Start Date & Time<span className="required">*</span></Form.Label>
                    <Form.Control
                      type="datetime-local"
                      className="mb-3"
                      value={round.startDate}
                      onChange={e => {
                        const newRounds = [...rounds];
                        newRounds[idx].startDate = e.target.value;
                        setRounds(newRounds);
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  className="add-round-btn"
                  onClick={() => setRounds([...rounds, { title: '', startDate: '' }])}
                >
                  Add Round
                </Button>
                {/* File and poster upload section appears after all rounds */}
                <Row className="mt-3">
                  <Col md={6} xs={12} className="mb-3">
                    <div className="upload-box">
                      <div className="upload-icon"><UploadCloudIcon /></div>
                      <div className="upload-label">Upload competition file<span className="required">*</span></div>
                      <div className="upload-desc">PDF,PPT,DOC, etc.</div>
                    </div>
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <div
                      className="upload-box"
                      onClick={() => fileInputRef.current.click()}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="upload-icon"><UploadCloudIcon /></div>
                      <Form.Label style={{ color: '#3C5898' }}>
                        Upload competition poster<span className="required">*</span>
                      </Form.Label>
                      <div className="upload-desc">PDF, PPT, DOC, Images etc.</div>
                      {/* HIDDEN FILE INPUT */}
                      <Form.Control
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,.pdf,.doc,.ppt"
                        onChange={(e) => setPosterFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      {posterFile && (
                        <div className="file-name-preview">📄 Selected: {posterFile.name}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="section-title mt-4">Rewards & Incentives<span className="required">*</span></div>
              <div className="rewards-box">
                {rewards.map((reward, idx) => (
                  <div className="reward-row" key={idx} style={{ position: 'relative', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {/* Delete icon above the inputs, like rounds */}
                    {idx > 0 && (
                      <FaTrash
                        style={{ position: 'absolute', top: 8, right: 8, color: '#dc3545', cursor: 'pointer', zIndex: 2 }}
                        title="Delete Reward"
                        onClick={() => setRewards(rewards.filter((_, i) => i !== idx))}
                      />
                    )}
                    <div className="reward-label">{idx + 1}. Reward</div>
                    <Form.Control
                      type="text"
                      placeholder="Reward label (e.g. Winner, Runner Up)"
                      className="mb-2"
                      value={reward.label}
                      onChange={e => {
                        const newRewards = [...rewards];
                        newRewards[idx].label = e.target.value;
                        setRewards(newRewards);
                      }}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Reward type (e.g. Cash, Certificate)"
                      className="mb-2"
                      value={reward.type}
                      onChange={e => {
                        const newRewards = [...rewards];
                        newRewards[idx].type = e.target.value;
                        setRewards(newRewards);
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  className="add-reward-btn"
                  onClick={() => setRewards([...rewards, { label: '', type: '' }])}
                >
                  Add Reward
                </Button>
              </div>
              <Row className="mt-4">
                <Col md={6} xs={12} className="mb-3">
                  <div className="upload-box">
                    <div className="upload-icon"><UploadCloudIcon /></div>
                    <div className="upload-label">Competition card poster<span className="required">*</span></div>
                    <div className="upload-desc">PDF,PPT,DOC, etc.</div>
                  </div>
                </Col>
                <Col md={6} xs={12} className="mb-3">
                  <div
                    className="upload-box"
                    onClick={() => bgFileInputRef.current.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="upload-icon"><UploadCloudIcon /></div>
                    <Form.Label style={{ color: '#3C5898' }}>
                      Upload competition card background<span className="required">*</span>
                    </Form.Label>
                    <div className="upload-desc">PDF, PPT, DOC, Images etc.</div>

                    {/* HIDDEN FILE INPUT */}
                    <Form.Control
                      type="file"
                      ref={bgFileInputRef}
                      accept="image/*,.pdf,.doc,.ppt"
                      onChange={(e) => setBackgroundFile(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                    {backgroundFile && (
                      <div className="file-name-preview">🎨 Selected: {backgroundFile.name}</div>
                    )}

                  </div>
                </Col>

              </Row>
            </div>
            <div className="upload-tab-actions">
              <Button variant="outline-secondary" className="back-btn" onClick={() => setActiveTab(1)}>Back</Button>
              <Button variant="outline-secondary" className="preview-btn" onClick={() => navigate('/competition/register', { state: { formData, rounds, rewards, posterFile, backgroundFile } })}>Preview</Button>
              {/* <Button variant="primary" className="post-btn" onClick={() => navigate('/host-competition')}>Post competition</Button> */}
              <Button
                variant="primary"
                className="post-btn"
                onClick={handlePostCompetition}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Posting...
                  </>
                ) : (
                  'Post competition'
                )}
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PostCompetition; 