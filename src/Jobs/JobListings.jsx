import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../Assests/Images/xyz.png";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../App.css";
import './JobListings.css';
import { useJobActions } from '../Context/JobActionsContext';


const JobListings = () => {

  const jobs = [
    {
      title: "UI/UX Designer",
      company: "XYZ Pvt Ltd",
      location: "Hyderabad",
      experience: "2 - 6 Years",
      desc: "UI/UX, wireframing, prototyping tools...",
      date: "2 days ago",
    },
    {
      title: "Frontend Developer",
      company: "ABC Technologies",
      location: "Bengaluru",
      experience: "1 - 3 Years",
      desc: "React.js, JavaScript, HTML/CSS...",
      date: "1 day ago",
    },
    {
      title: "Backend Developer",
      company: "Tech Nova",
      location: "Pune",
      experience: "3 - 5 Years",
      desc: "Node.js, MongoDB, APIs, REST...",
      date: "3 days ago",
    },
    {
      title: "Graphic Designer",
      company: "Design Studio",
      location: "Delhi",
      experience: "0 - 2 Years",
      desc: "Adobe XD, Illustrator, Photoshop...",
      date: "5 days ago",
    },
    {
      title: "Data Analyst",
      company: "Analytics Co.",
      location: "Remote",
      experience: "1 - 4 Years",
      desc: "Python, SQL, Power BI, Excel...",
      date: "Today",
    },
    {
      title: "SEO Specialist",
      company: "Growth Media",
      location: "Mumbai",
      experience: "1 - 2 Years",
      desc: "SEO, SEM, Google Ads, Analytics...",
      date: "4 days ago",
    },
  ];
  const [activeTab, setActiveTab] = useState("suggested");
  const { savedJobIndexes, appliedJobIndexes, toggleSaveJob, applyJob } = useJobActions();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle button click and redirect
  const handlePostJobClick = () => {
    navigate("/postjob"); // Redirect to /postjob route
    // Alternatively, use window.location.href = "/postjob"; if not using React Router
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container py-5">

        <form className="row g-2 bg-white rounded-pills shadow-form p-2 align-items-center search-box job-search-bar mx-auto">
          <div className="col-12 col-md-5 d-flex align-items-center px-3 mb-2 mb-md-0">
            <i className="fas fa-search text-primary me-2 "></i>
            <input type="search" className="form-control border-0 p-0" placeholder="Job title, Skills, companies" />
          </div>
          <div className="col-12 col-md-5 d-flex align-items-center px-3 border-md-start custom-search-divider mb-2 mb-md-0">
            <i className="fas fa-map-marker-alt text-secondary me-2"></i>
            <input type="search" className="form-control border-0 p-0" placeholder="Location" />
          </div>
          <div className="col-12 col-md-2 text-end">
            <button
              type="submit"
              className="btn btn-primary rounded-pill w-100 job-search-btn"
            >
              Find Job
            </button>
          </div>
        </form>

        <p className="text-center text-muted small mt-2">
          Suggestion: <strong>Designer, Programming,</strong>{" "}
          <a href="#" className="fw-semibold text-decoration-none" style={{ color: "#3C5898" }}>Digital Marketing</a>
          <strong> Video, Animation.</strong>
        </p>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <ul className="nav nav-tabs custom-nav border-bottom fw-semibold small">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "suggested" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("suggested")}
              >
                Suggested Jobs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "applied" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("applied")}
              >
                Applied Jobs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "saved" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("saved")}
              >
                Saved Jobs
              </button>

            </li>
          </ul>


          {/* <button
            className="btn btn-outline-primary btn-sm rounded-pill"
            style={{ color: "#3C5898", borderColor: "#3C5898" }}
          >
            <i className="fas fa-pen me-1"></i> Post a free job
          </button> */}
          <button
            className="btn btn-outline-primary btn-sm rounded-pill post-job-btn" // Added custom class for hover
            // style={{
            //   color: "#3C5898",
            //   borderColor: "#3C5898",
            //   transition: "all 0.3s ease", // Smooth transition for hover
            // }}
            onClick={handlePostJobClick} // Added onClick handler
          >
            <i className="fas fa-pen me-1"></i> Post a free job
          </button>

        </div>


        <div className="d-flex
         justify-content-between align-items-center mt-4">
          <h6 className="mb-0 fw-semibold">Jobs based on your profile</h6>
          <a href="#" className="text-primary small text-decoration-none">View All</a>
        </div>


        <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
          {(
            activeTab === "saved"
              ? jobs.filter((_, idx) => savedJobIndexes.includes(idx))
              : activeTab === "applied"
                ? jobs.filter((_, idx) => appliedJobIndexes.includes(idx))
                : jobs
          ).map((job, index) => {
            let realIndex;
            if (activeTab === "saved") {
              realIndex = savedJobIndexes[index];
            } else if (activeTab === "applied") {
              realIndex = appliedJobIndexes[index];
            } else {
              realIndex = index;
            }
            const isSaved = savedJobIndexes.includes(realIndex);
            const isApplied = appliedJobIndexes.includes(realIndex);
            // Card click handler
            const handleCardClick = (e) => {
              // Prevent navigation if Save or Apply button is clicked
              if (
                e.target.closest(".save-btn") ||
                e.target.closest(".apply-btn")
              ) {
                return;
              }
              navigate(`/job/${realIndex}`, { state: { job: { ...job, status: job.status || 'Active' } } });
            };
            return (
              <div className="col" key={realIndex}>
                <div
                  className="job-card d-flex justify-content-between align-items-start p-3 bg-white clickable-job-card"
                  style={{ border: "1px solid #dee2e6", height: "100%", position: "relative", borderRadius: "15px", boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.08), -4px 4px 10px rgba(0, 0, 0, 0.08)", cursor: "pointer" }}
                  onClick={handleCardClick}
                >
                  <div className="job-card-inner" style={{ width: "70%" }}>
                    <div className="d-flex align-items-center mb-1">
                      <h6 className="mb-0 me-2" style={{ fontSize: "22px", fontWeight: "600" }}>{job.title}</h6>
                      <span className="badge badge-fulltime" style={{ backgroundColor: "#E7F6EA", color: "#0BA02C", fontSize: "0.6rem" }}>
                        FULL-TIME
                      </span>
                    </div>
                    <div className="fw-semibold small text-muted">{job.company}</div>
                    <div className="d-flex align-items-center small text-muted" style={{ fontSize: "0.75rem", marginTop: "3px" }}>
                      <i className="fas fa-star text-warning me-1" style={{ fontSize: "0.65rem" }}></i>
                      4.0 <span className="ms-1">(11 reviews)</span>
                    </div>
                    <div className="job-meta mt-1 text-muted">
                      <i className="fas fa-map-marker-alt"></i>
                      <span className="ms-2">{job.location}</span>
                    </div>
                    <div className="job-meta mt-1 text-muted">
                      <i className="fas fa-briefcase"></i>
                      <span className="ms-2">{job.experience}</span>
                    </div>
                    <div className="job-desc mt-1 text-truncate" style={{ fontSize: "0.7rem", color: "#6c757d" }}>
                      {job.desc}
                    </div>
                    <div className="d-flex align-items-center mt-2 small">
                      <time>{job.date}</time>
                      <button
                        className="btn btn-link btn-sm text-decoration-none text-dark ms-3 p-0 save-btn"
                        onClick={e => { e.stopPropagation(); toggleSaveJob(realIndex); }}
                        aria-label={isSaved ? "Unsave job" : "Save job"}
                      >
                        {isSaved ? (
                          <>
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                              <path d="M13.4173 17.25L7.00065 12.6667L0.583984 17.25V2.58333C0.583984 2.0971 0.777139 1.63079 1.12096 1.28697C1.46477 0.943154 1.93109 0.75 2.41732 0.75H11.584C12.0702 0.75 12.5365 0.943154 12.8803 1.28697C13.2242 1.63079 13.4173 2.0971 13.4173 2.58333V17.25Z" fill="#0A65CC"/>
                            </svg>
                            Saved
                          </>
                        ) : (
                          <>
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                              <path d="M13.4173 17.25L7.00065 12.6667L0.583984 17.25V2.58333C0.583984 2.0971 0.777139 1.63079 1.12096 1.28697C1.46477 0.943154 1.93109 0.75 2.41732 0.75H11.584C12.0702 0.75 12.5365 0.943154 12.8803 1.28697C13.2242 1.63079 13.4173 2.0971 13.4173 2.58333V17.25Z" stroke="#888" strokeWidth="1.5" fill="none"/>
                            </svg>
                            Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-end" style={{ height: "100%", position: "relative" }}>
                    <img
                      src={logo}
                      alt="company-logo"
                      className="rounded-2"
                      style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "10px", }}
                    />
                    {isApplied ? (
                      <button
                        className="btn btn-light px-3 py-2 d-flex align-items-center text-dark gap-2 apply-btn"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          fontSize: "14px",
                          fontWeight: "600",
                          border: "1px solid #8C8C8C",
                          color: "#0BA02C",
                        }}
                        disabled
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.1673 10.1567V11C20.1662 12.9768 19.5261 14.9002 18.3425 16.4834C17.159 18.0666 15.4953 19.2248 13.5997 19.7853C11.7041 20.3457 9.67814 20.2784 7.82391 19.5934C5.96969 18.9084 4.38658 17.6423 3.3107 15.984C2.23481 14.3257 1.72379 12.3641 1.85385 10.3917C1.98392 8.41922 2.74809 6.54167 4.03241 5.03902C5.31672 3.53637 7.05237 2.48914 8.98049 2.05351C10.9086 1.61787 12.9259 1.81718 14.7315 2.62171" stroke="#0BA02C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M20.1667 3.6665L11 12.8423L8.25 10.0923" stroke="#0BA02C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Applied
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary job-listings-card-button px-4 py-2 d-flex align-items-center gap-2 apply-btn"
                      
                        onClick={e => { e.stopPropagation(); applyJob(realIndex); }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.92 4.956L3.45 3.473M12.759 4.956L14.229 3.473M3.449 14.353L4.919 12.869M8.839 2.979V1M2.959 8.913H1M14.875 14.836L18.689 13.33C18.781 13.2932 18.8599 13.2296 18.9155 13.1475C18.971 13.0655 19.0007 12.9686 19.0007 12.8695C19.0007 12.7704 18.971 12.6735 18.9155 12.5915C18.8599 12.5094 18.781 12.4458 18.689 12.409L9.524 8.794C9.43478 8.75947 9.33742 8.7517 9.24385 8.77165C9.15028 8.7916 9.06456 8.8384 8.99718 8.90631C8.92979 8.97423 8.88367 9.06031 8.86446 9.15404C8.84524 9.24776 8.85377 9.34505 8.889 9.434L12.471 18.685C12.633 19.105 13.221 19.105 13.383 18.685L14.875 14.836Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobListings; 