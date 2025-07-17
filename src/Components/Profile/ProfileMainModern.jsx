import React from "react";
import "./ProfileMainModern.css";

export default function ProfileMainModern({ user }) {
  // Fallback sample data
  const experience = user?.experiences?.[0] || {
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/XYZ_Software_Logo.png",
    companyName: "XYZ Software Company ltd.",
    position: "UI/UX Designer",
    duration: "April 2022 - Present",
    location: "Hyderabad, India"
  };
  const stream = user?.stream || "UI/UX Design";
  const streamSkills = user?.streamSkills || [
    "Figma", "Adobe XD", "FlowMapp", "Sketch", "Miro", "Web design", "App design", "Wireframe", "Low fidelity", "High fidelity", "Prototype", "User testing"
  ];
  const resume = user?.resume || {
    fileName: "UI/UX Resume.pdf",
    date: "21 Feb, 2025",
    fileUrl: "#"
  };

  return (
    <div className="pmm-main-content">
      {/* Experience */}
      <div className="pmm-card">
        <div className="pmm-section-header">
          <span>Experience</span>
          <span className="pmm-icons">
            {/* Plus icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#f5f5f5"/><path d="M10 5v10M5 10h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {/* Pencil icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14.846 2.94a2.25 2.25 0 0 1 3.182 3.183l-1.06 1.06-3.183-3.182 1.06-1.06Zm-2.12 2.12-8.01 8.01a1 1 0 0 0-.263.465l-1 3.5a.5.5 0 0 0 .617.617l3.5-1a1 1 0 0 0 .465-.263l8.01-8.01-3.182-3.182Z" fill="#888"/></svg>
          </span>
        </div>
        <div className="pmm-experience-content">
          <img src={experience.companyLogo} alt={experience.companyName} className="pmm-company-logo" />
          <div className="pmm-experience-content-left">
            <div className="pmm-company-name">{experience.companyName}</div>
            <div className="pmm-position">{experience.position}</div>
            <div className="pmm-duration">{experience.duration} | {experience.location}</div>
          </div>
        </div>
      </div>
      {/* Education */}
      <div className="pmm-card">
        <div className="pmm-section-header">
          <span>Education</span>
          <span className="pmm-icons">
            {/* Plus icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#f5f5f5"/><path d="M10 5v10M5 10h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
      </div>
      {/* Stream */}
      <div className="pmm-card">
        <div className="pmm-section-header">
          <span>Stream</span>
          <span className="pmm-icons">
            {/* Plus icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#f5f5f5"/><path d="M10 5v10M5 10h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
        <div className="pmm-stream-title">{stream} -</div>
        <div className="pmm-skills-list">
          {streamSkills.map((skill, idx) => (
            <span key={idx} className="pmm-skill-badge">{skill}</span>
          ))}
          <span className="pmm-skill-badge pmm-skill-plus">+</span>
        </div>
      </div>
      {/* Certification */}
      <div className="pmm-card">
        <div className="pmm-section-header">
          <span>Certification</span>
          <span className="pmm-icons">
            {/* Plus icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#f5f5f5"/><path d="M10 5v10M5 10h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
      </div>
      {/* Resume/CV */}
      <div className="pmm-card">
        <div className="pmm-section-header">
          <span>Resume/CV</span>
          <span className="pmm-icons">
            {/* Pencil icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14.846 2.94a2.25 2.25 0 0 1 3.182 3.183l-1.06 1.06-3.183-3.182 1.06-1.06Zm-2.12 2.12-8.01 8.01a1 1 0 0 0-.263.465l-1 3.5a.5.5 0 0 0 .617.617l3.5-1a1 1 0 0 0 .465-.263l8.01-8.01-3.182-3.182Z" fill="#888"/></svg>
          </span>
        </div>
        <div className="pmm-resume-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="pmm-pdf-icon">
              {/* PDF icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="#e0e7ff"/><text x="12" y="32" fontSize="18" fontWeight="bold" fill="#3C5898">PDF</text></svg>
            </span>
            <div className="pmm-resume-info">
              <div className="pmm-resume-title">{resume.fileName}</div>
              <div className="pmm-resume-date">Added {resume.date}</div>
            </div>
          </div>
          <a href={resume.fileUrl} className="pmm-download-btn" download>
            {/* Download icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M10 6v6m0 0l-2-2m2 2l2-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Download
          </a>
        </div>
      </div>
    </div>
  );
} 