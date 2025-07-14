import React from "react";
import './ResultsLeaderboard.css';
import './breadcrumb.css';
import badgeGold from '../../Assests/Images/Badge_02.png';
import badgeSilver from '../../Assests/Images/Badge_01.png';
import badgeBronze from '../../Assests/Images/Badge_03.png';
import trophyIcon from '../../Assests/Images/trophy.png';
import { Container } from 'react-bootstrap';

const leaderboard = [
  { name: "Simran Soni", points: 96, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Vivek Joy", points: 98, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Vinee Devi", points: 94, img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Marsha Fisher", points: 92, img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Juanita Cormier", points: 90, img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "You", points: 88, img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Tamara Schmidt", points: 86, img: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Ricardo Veum", points: 84, img: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Gary Sanford", points: 82, img: "https://randomuser.me/api/portraits/men/23.jpg" },
  { name: "Becky Bartell", points: 80, img: "https://randomuser.me/api/portraits/women/24.jpg" },
];

const medals = [
  badgeGold,   // Gold
  badgeSilver, // Silver
  badgeBronze, // Bronze
];

const trophyUrl = "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";

const ResultsLeaderboard = () => {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);
  const topThree = sortedLeaderboard.slice(0, 3);
  const restOfLeaderboard = sortedLeaderboard.slice(3);

  // Desired podium order: 2nd, 1st, 3rd
  const podiumOrder = topThree.length === 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

  return (
    <div className="results-leaderboard-container">
      <Container fluid>
        <div className="competition-details-inner-container">
          <div className="breadcrumb-container">
            Home &gt; Competitions &gt; UI/UX Design Challenge 2025 &gt; Technical assessment &gt; <b>File submission</b>
          </div>
          <div className="leaderboard-container">
            {/* Trophies */}
            <img src={trophyUrl} alt="trophy" className="leaderboard-trophy top-right" />
            <img src={trophyUrl} alt="trophy" className="leaderboard-trophy bottom-left" />

            <div className="leaderboard-content">
              <h2 className="leaderboard-title">Results & Leaderboard</h2>

              <div className="podium">
                {podiumOrder.map((user) => {
                  if (!user) return null;

                  const isFirst = user.points === topThree[0].points;
                  const isSecond = user.points === topThree[1].points;

                  const podiumPlaceClass = isFirst ? 'first-place' : isSecond ? 'second-place' : 'third-place';
                  const medal = isFirst ? badgeGold : isSecond ? badgeSilver : badgeBronze;

                  return (
                    <div key={user.name} className={`podium-user ${isFirst ? 'first-place' : ''}`}>
                      <img
                        src={user.img}
                        alt={user.name}
                        className={`podium-avatar ${podiumPlaceClass}`}
                      />
                      <div className="podium-medal">
                        <img src={medal} alt="medal" />
                      </div>
                      <div className="podium-name" style={{ color: isFirst ? 'orange' : isSecond ? '#3b5998' : '#3bb54a' }}>
                        {user.name}
                      </div>
                      <div className="podium-points" style={{ color: isFirst ? '#222' : '#888', fontWeight: isFirst ? 600 : 400 }}>
                        {user.points} pts
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="leaderboard-list">
                {restOfLeaderboard.map((user, idx) => (
                  <div key={user.name} className={`list-user ${user.name === "You" ? 'current-user' : ''}`}>
                    <div className="list-user-rank">{idx + 4}</div>
                    <div className="list-user-info">
                      <img src={user.img} alt={user.name} className="list-user-avatar" />
                      <span className={`list-user-name ${user.name === "You" ? 'current-user' : ''}`}>{user.name}</span>
                    </div>
                    <div className="list-user-points">{user.points} pts</div>
                  </div>
                ))}
              </div>

              <div className="leaderboard-actions">
                <button className="leaderboard-btn btn-download">
                  <i className="fas fa-download"></i> Download Certificate
                </button>
                <button className="leaderboard-btn btn-claim">
                  <img src={trophyIcon} alt="trophy" style={{ width: 28, height: 28 }} /> Claim Price
                </button>
              </div>

              <button className="leaderboard-btn btn-share">
                <i className="fas fa-share"></i> Share Achievement on Facehiring
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResultsLeaderboard; 