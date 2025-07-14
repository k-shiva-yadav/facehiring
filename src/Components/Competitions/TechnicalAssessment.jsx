import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import './TechnicalAssessment.css';
import './breadcrumb.css';

const TechnicalAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="competition-technical-assessment-container">
      <Container fluid>
        <div className="competition-details-inner-container">
          <div className="breadcrumb-container">
            Home &gt; Competitions &gt; UI/UX Design Challenge 2025 &gt; <b>Technical assessment</b>
          </div>
          <div className="assessment-container">
            <div className="assessment-card">
              <h2 className="assessment-title">Technical Assessment</h2>
              <div className="time-remaining">
                <span role="img" aria-label="clock">⏲️</span> Time Remaining: 02:30:00
              </div>
              <b className="problems-title">Problems</b>
              <div className="problem-box">
                <h3>Analysis of Test Scores</h3>
                <p>
                  You are given a list of integers representing the test scores of students. Your task is to analyze the scores and determine the minimum score, maximum score, and average score (rounded down to the nearest integer).
                </p>
                <b>Input</b>
                <p>
                  List of integers scores<br />
                  (1 ≤ len(scores) ≤ 100,<br />
                  0 ≤ scores[i] ≤ 100)
                </p>
                <b>Output</b>
                <p>
                  Three integers representing the minimum score, maximum score, and average score.
                </p>
                <b>Examples 1</b>
                <p>
                  Input:<br />
                  scores = [72, 85, 90, 63, 98]<br />
                  Output:<br />
                  63 98 81
                </p>
              </div>
              <div className="submit-section">
                <button
                  className="submit-btn"
                  onClick={() => navigate('/competition/1/file-submission')}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TechnicalAssessment; 