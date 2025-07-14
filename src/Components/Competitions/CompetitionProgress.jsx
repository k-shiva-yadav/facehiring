import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompetitionProgress.css';
import DiscussionForum from './DiscussionForum';
import { Container } from 'react-bootstrap';

const rounds = [
  {
    title: 'Technical Assessment',
    date: 'Apr 25, 2025, 11:59 PM',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    profile: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80',
    action: 'Start Round',
    due: null,
  },
  {
    title: 'Coding Challenge',
    date: 'May 04, 2025, 11:59 PM',
    banner: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    profile: 'https://img.icons8.com/color/96/000000/source-code.png',
    action: 'View Details',
    due: 'Due in 9d 12h',
  },
  {
    title: 'Final Interview',
    date: 'May 26, 2025, 11:59 PM',
    banner: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    profile: 'https://img.icons8.com/color/96/000000/meeting.png',
    action: 'View Details',
    due: 'Due in 15d 12h',
  },
];

const CompetitionProgress = () => {
  const navigate = useNavigate();
  return (
    <div className="competition-progress-container">
      <Container fluid>
        <div className="competition-details-inner-container">
          <div className="breadcrumbs">
            Home &gt; Competitions &gt; <b>UI/UX Design Challenge 2025</b>
          </div>
          <div className="competition-header-card">
            <div className="competition-header-content">
              <img src="https://img.icons8.com/color/96/000000/idea.png" alt="Logo" className="competition-logo" />
              <div className="competition-title-section">
                <div className="title">UI/UX Design Challenge 2025</div>
                <div className="status">Ongoing - 3 Round Remainig</div>
              </div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-background">
                <div className="progress-bar-foreground" />
              </div>
              <div className="progress-text">Round 1 of 4 Complete <span style={{ float: 'right' }}>25%</span></div>
            </div>
          </div>
          <div className="upcoming-rounds-title">Upcoming Rounds</div>
          <div className="rounds-grid">
            {rounds.map((round, idx) => (
              <div key={idx} className="round-card">
                <div className="round-banner">
                  <img src={round.banner} alt={round.title} />
                </div>
                <img src={round.profile} alt="profile" className="round-profile-img" />
                <div className="round-content">
                  {round.due && <div className="round-due-note">{round.due}</div>}
                  <div className="round-title">{round.title}</div>
                  <div className="round-date">{round.date}</div>
                  <button
                    className="round-action-btn"
                    onClick={() => idx === 0 && round.action === 'Start Round' ? navigate('/competition/1/assessment') : null}
                  >
                    {round.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="status-leaderboard-section">
            <div className="status-card">
              <div className="card-title">Submission Status</div>
              <table className="status-table">
                <thead>
                  <tr>
                    <th>Round</th>
                    <th>Submission Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1. Quiz</td>
                    <td style={{ color: '#1dbf73', fontWeight: 500 }}>
                      <span style={{ fontSize: 20, marginRight: 6 }}>✔️</span> Submitted
                    </td>
                  </tr>
                  <tr>
                    <td>2. Technical Assessment</td>
                    <td style={{ color: '#f7b500', fontWeight: 500 }}>
                      <span style={{ fontSize: 20, marginRight: 6 }}>🕒</span> Pending
                    </td>
                  </tr>
                  <tr>
                    <td>3. Coding Challenge</td>
                    <td style={{ color: '#f7b500', fontWeight: 500 }}>
                      <span style={{ fontSize: 20, marginRight: 6 }}>🕒</span> Pending
                    </td>
                  </tr>
                  <tr>
                    <td>4. Final Interview</td>
                    <td style={{ color: '#f7b500', fontWeight: 500 }}>
                      <span style={{ fontSize: 20, marginRight: 6 }}>🕒</span> Pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="leaderboard-card">
              <div className="card-title">Leaderboard</div>
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Participant</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Alia Jhaah</td>
                    <td>98</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Surendra D.</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Carol White</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Milka Singh</td>
                    <td>92</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <DiscussionForum />
        </div>
      </Container>
    </div>
  );
};

export default CompetitionProgress; 