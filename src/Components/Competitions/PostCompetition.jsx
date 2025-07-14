import React, { useState } from 'react';
import './PostCompetition.css';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaGlobe, FaGlobeAsia, FaUser, FaUsers, FaCalendarAlt, FaChevronDown, FaBold, FaItalic, FaListUl, FaListOl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const rewardIcons = [
  { label: 'Cash Prize', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F9E6"/><path d="M13 25C13 23.8954 13.8954 23 15 23H25C26.1046 23 27 23.8954 27 25V27H13V25Z" fill="#4CAF50"/><rect x="15" y="15" width="10" height="8" rx="2" fill="#81C784"/><circle cx="20" cy="19" r="2" fill="#388E3C"/></svg>
  ) },
  { label: 'Internship Offer', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F0FF"/><rect x="13" y="15" width="14" height="10" rx="2" fill="#1976D2"/><rect x="16" y="18" width="8" height="4" rx="1" fill="#90CAF9"/></svg>
  ) },
  { label: 'Job Opportunity', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#FFF3E6"/><rect x="13" y="15" width="14" height="10" rx="2" fill="#FFA726"/><rect x="16" y="18" width="8" height="4" rx="1" fill="#FFD54F"/></svg>
  ) },
  { label: 'Certificates', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F7FF"/><rect x="13" y="15" width="14" height="10" rx="2" fill="#00B8D9"/><rect x="16" y="18" width="8" height="4" rx="1" fill="#B2EBF2"/></svg>
  ) },
];

const UploadCloudIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M34 32C36.2091 32 38 30.2091 38 28C38 25.7909 36.2091 24 34 24H33.74C33.3866 21.7182 31.4192 20 29 20C27.067 20 25.4412 21.2346 25.0762 23.0762C24.7252 24.8452 23.1548 26 21.5 26C19.0147 26 17 23.9853 17 21.5C17 19.0147 19.0147 17 21.5 17C22.8807 17 24.1174 17.6321 24.8787 18.7071" stroke="#3CBAFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 32V28M24 28L22 30M24 28L26 30" stroke="#3CBAFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
              <Form.Control type="text" placeholder="Enter competition title" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Competition Type<span className="required">*</span></Form.Label>
              <Form.Select required>
                <option>Competition</option>
                <option>Quiz</option>
                <option>Hackathon</option>
                <option>Cultural Event</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company name<span className="required">*</span></Form.Label>
              <Form.Control type="text" placeholder="Company name" defaultValue="XYZ Software company ltd." required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Eligibility Criteria<span className="required">*</span></Form.Label>
              <Form.Control type="text" placeholder="e.g. Students, Professionals, Experience Level, Location" required />
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
                <textarea className="desc-textarea" placeholder="Use this section to provide comprehensive details about the opportunity you're listing. Including information such as rules, eligibility criteria, process, and format increases the chances of approval. The more thorough the description, the better!" maxLength={10000} />
                <div className="desc-count">0/10,000</div>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Registration fee</Form.Label>
              <div className="fee-row">
                <div className="fee-currency-box">
                  <span className="fee-currency">₹</span>
                  <span className="fee-currency-arrow"><FaChevronDown size={14} /></span>
                </div>
                <input type="number" className="fee-input" placeholder="000.00" min="0" step="0.01" />
                <span className="fee-or">Or</span>
                <button type="button" className="fee-free-btn">Free</button>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Location<span className="required">*</span></Form.Label>
              <Form.Control type="text" className="location-input" placeholder="Event location" required />
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
                    <input type="number" className="team-input-full" placeholder="1" min="1" />
                    <span className="team-label-full">Min</span>
                  </div>
                  <div className="team-input-group">
                    <input type="number" className="team-input-full" placeholder="3" min="1" />
                    <span className="team-label-full">Mix</span>
                  </div>
                </div>
              </Form.Group>
            )}
            <Row>
              <Col md={6} xs={12} className="mb-4">
                <Form.Label>Registration Start Date & Time<span className="required">*</span></Form.Label>
                <div className="date-input-row">
                  <input type="text" className="date-input" placeholder="01 Jan 25, 00:00 PM" readOnly />
                  <span className="date-icon"><FaCalendarAlt /></span>
                </div>
              </Col>
              <Col md={6} xs={12} className="mb-4">
                <Form.Label>Registration End Date & Time<span className="required">*</span></Form.Label>
                <div className="date-input-row">
                  <input type="text" className="date-input" placeholder="31 Jan 25, 00:00 PM" readOnly />
                  <span className="date-icon"><FaCalendarAlt /></span>
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
                <div className="round-row">
                  <div className="round-label">Round 1<span className="required">*</span></div>
                  <Form.Control type="text" placeholder="Enter competition title" className="mb-2" />
                  <Form.Label className="mt-2">Round Start Date & Time<span className="required">*</span></Form.Label>
                  <Form.Control type="datetime-local" className="mb-3" />
                  <Row>
                    <Col md={6} xs={12} className="mb-3">
                      <div className="upload-box">
                        <div className="upload-icon"><UploadCloudIcon /></div>
                        <div className="upload-label">Upload competition file<span className="required">*</span></div>
                        <div className="upload-desc">PDF,PPT,DOC, etc.</div>
                      </div>
                    </Col>
                    <Col md={6} xs={12} className="mb-3">
                      <div className="upload-box">
                        <div className="upload-icon"><UploadCloudIcon /></div>
                        <div className="upload-label">Upload competition poster<span className="required">*</span></div>
                        <div className="upload-desc">PDF,PPT,DOC, etc.</div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Button variant="outline-primary" className="add-round-btn">Add Round</Button>
              </div>
              <div className="section-title mt-4">Rewards & Incentives<span className="required">*</span></div>
              <div className="rewards-box">
              <div className="reward-label">1. Winner</div>
                <div className="reward-row">
                  
                  <div className="reward-icons">
                    {rewardIcons.map((r, i) => (
                      <div className="reward-icon-box" key={i}>
                        {r.icon}
                        <div className="reward-icon-label">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline-primary" className="add-reward-btn">Add Reward</Button>
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
                  <div className="upload-box">
                    <div className="upload-icon"><UploadCloudIcon /></div>
                    <div className="upload-label">Competition card background poster<span className="required">*</span></div>
                    <div className="upload-desc">PDF,PPT,DOC, etc.</div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="upload-tab-actions">
              <Button variant="outline-secondary" className="back-btn" onClick={() => setActiveTab(1)}>Back</Button>
              <Button variant="outline-secondary" className="preview-btn" onClick={() => navigate('/competition/register')}>Preview</Button>
              <Button variant="primary" className="post-btn" onClick={() => navigate('/host-competition')}>Post competition</Button>
            </div>
          </>
        )}
       
      </div>
    </div>
  );
};

export default PostCompetition; 