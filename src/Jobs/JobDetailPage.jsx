import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../Assests/Images/xyz.png';
import '../Assests/Css/JobDetailPage.css';
import { FiBookmark, FiMapPin, FiCalendar, FiClock, FiLayers, FiBriefcase, FiBookOpen, FiLink, FiMail, FiStar, FiSend } from 'react-icons/fi';
import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useJobActions } from '../Context/JobActionsContext';

const defaultJob = {
  title: 'UI/UX Designer',
  company: 'XYZ Private Limited',
  location: 'Uppal, Hyderabad',
  salary: '600,000 - 800,000',
  posted: '19 Feb, 2025',
  expire: '25 March, 2025',
  level: 'Entry Level',
  experience: '2 - 6 years',
  education: 'Graduation',
  desc: `Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!

Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.

The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform

Want to work with us? You're in good company!`,
  requirements: [
    'Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on',
    '3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications',
    'Experience with HTML, JavaScript, CSS, PHP, Symfony and/or Laravel',
    'Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc)',
    'Have experience/awareness in Agile application development, commercial off-the-shelf software, middleware, servers and storage, and database management.',
    'Familiarity with version control and project management systems (e.g., Github, Jira)',
    'Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on',
  ],
};

const jobDescriptionText = [
  "Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!",
  "Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.",
  "The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform",
  "Want to work with us? You're in good company!"
];

const requirementsList = [
  "Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on",
  "3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications",
  "Experience with HTML, JavaScript, CSS, PHP, Symphony and/or Laravel",
  "Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc)",
  "Have experience/awareness in Agile application development, commercial off-the-shelf software, middleware, servers and storage, and database management.",
  "Familiarity with version control and project management systems (e.g., Github, Jira)",
  "Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on",
  "Ambitious and hungry to grow your career in a fast-growing agency"
];

const desirableList = [
  "Working knowledge of eCommerce platforms, ideally Shopify but also others e.g. Magento, WooCommerce, Visualsoft to enable seamless migrations.",
  "Working knowledge of payment gateways",
  "API platform experience / Building restful APIs"
];

const benefitsList = [
  "Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)",
  "28 days holiday (including bank holidays) rising by 1 day per year PLUS an additional day off on your birthday",
  "Generous annual bonus.",
  "Healthcare package",
  "Paid community days to volunteer for a charity of your choice",
  "£100 contribution for your own personal learning and development",
  "Free Breakfast on Mondays and free snacks in the office",
  "Access to Perkbox with numerous discounts plus free points from the company to spend as you wish.",
  "Cycle 2 Work Scheme",
  "Brand new MacBook Pro",
  "Joining an agency on the cusp of exponential growth and being part of this exciting story."
];

const similarJobs = [
  {
    title: "UI/UX Designer",
    company: "XYZ Private Limited",
    badge: "FULL-TIME",
    logo: logo,
    rating: 4.0,
    reviews: 11,
    location: "Hyderabad, Bengaluru, Mumbai, Pune",
    experience: "2 - 6 Years",
    desc: "user interface designing, user experience, wireframe, prototype...",
    date: "2 days ago",
    saved: false,
  },
  {
    title: "UI/UX Designer",
    company: "XYZ Private Limited",
    badge: "FULL-TIME",
    logo: logo,
    rating: 4.0,
    reviews: 11,
    location: "Hyderabad, Bengaluru, Mumbai, Pune",
    experience: "2 - 6 Years",
    desc: "user interface designing, user experience, wireframe, prototype...",
    date: "2 days ago",
    saved: false,
  },
  {
    title: "UI/UX Designer",
    company: "XYZ Private Limited",
    badge: "FULL-TIME",
    logo: logo,
    rating: 4.0,
    reviews: 11,
    location: "Hyderabad, Bengaluru, Mumbai, Pune",
    experience: "2 - 6 Years",
    desc: "user interface designing, user experience, wireframe, prototype...",
    date: "2 days ago",
    saved: false,
  },
  {
    title: "UI/UX Designer",
    company: "XYZ Private Limited",
    badge: "FULL-TIME",
    logo: logo,
    rating: 4.0,
    reviews: 11,
    location: "Hyderabad, Bengaluru, Mumbai, Pune",
    experience: "2 - 6 Years",
    desc: "user interface designing, user experience, wireframe, prototype...",
    date: "2 days ago",
    saved: false,
  },
  {
    title: "UI/UX Designer",
    company: "XYZ Private Limited",
    badge: "FULL-TIME",
    logo: logo,
    rating: 4.0,
    reviews: 11,
    location: "Hyderabad, Bengaluru, Mumbai, Pune",
    experience: "2 - 6 Years",
    desc: "user interface designing, user experience, wireframe, prototype...",
    date: "2 days ago",
    saved: false,
  },
  {
    title: "UI/UX Designer",
    company: "XYZ Private Limited",
    badge: "FULL-TIME",
    logo: logo,
    rating: 4.0,
    reviews: 11,
    location: "Hyderabad, Bengaluru, Mumbai, Pune",
    experience: "2 - 6 Years",
    desc: "user interface designing, user experience, wireframe, prototype...",
    date: "2 days ago",
    saved: false,
  },
];

const JobCard = ({ job, index }) => {
  const { savedJobIndexes, appliedJobIndexes, toggleSaveJob, applyJob } = useJobActions();
  const isSaved = savedJobIndexes.includes(index);
  const isApplied = appliedJobIndexes.includes(index);
  const navigate = useNavigate();

  // Card click handler
  const handleCardClick = (e) => {
    // Prevent navigation if Save or Apply button is clicked
    if (
      e.target.closest('.similar-job-card-save-btn') ||
      e.target.closest('.similar-job-card-apply-btn')
    ) {
      return;
    }
    navigate(`/job/${index}`, { state: { job } });
  };

  return (
    <div className="similar-job-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="similar-job-card-header">
        <div>
          <div className="similar-job-card-title-row">
            <span className="similar-job-card-title">{job.title}</span>
            <span className="similar-job-card-badge">{job.badge}</span>
          </div>
          <div className="similar-job-card-company">{job.company}</div>
          <div className="similar-job-card-rating-row">
            <FiStar className="similar-job-card-star" />
            <span className="similar-job-card-rating">{job.rating}</span>
            <span className="similar-job-card-reviews">({job.reviews} Reviews)</span>
          </div>
          <div className="similar-job-card-location-row">
            <FiMapPin className="similar-job-card-icon" />
            <span>{job.location}</span>
          </div>
          <div className="similar-job-card-exp-row">
            <FiBriefcase className="similar-job-card-icon" />
            <span>{job.experience}</span>
          </div>
          <div className="similar-job-card-desc">{job.desc}</div>
        </div>
        <img src={job.logo} alt="company-logo" className="similar-job-card-logo" />
      </div>
      <div className="similar-job-card-footer">
        <span className="similar-job-card-date">{job.date}</span>
        <button className="similar-job-card-save-btn" onClick={() => toggleSaveJob(index)}>
          {isSaved ? (
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
              <path d="M13.4173 17.25L7.00065 12.6667L0.583984 17.25V2.58333C0.583984 2.0971 0.777139 1.63079 1.12096 1.28697C1.46477 0.943154 1.93109 0.75 2.41732 0.75H11.584C12.0702 0.75 12.5365 0.943154 12.8803 1.28697C13.2242 1.63079 13.4173 2.0971 13.4173 2.58333V17.25Z" fill="#0A65CC"/>
            </svg>
          ) : (
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
              <path d="M13.4173 17.25L7.00065 12.6667L0.583984 17.25V2.58333C0.583984 2.0971 0.777139 1.63079 1.12096 1.28697C1.46477 0.943154 1.93109 0.75 2.41732 0.75H11.584C12.0702 0.75 12.5365 0.943154 12.8803 1.28697C13.2242 1.63079 13.4173 2.0971 13.4173 2.58333V17.25Z" stroke="#888" strokeWidth="1.5" fill="none"/>
            </svg>
          )}
          {isSaved ? 'Saved' : 'Save'}
        </button>
        {isApplied ? (
          <button className="similar-job-card-apply-btn" disabled style={{ background: '#e6f4ea', color: '#0BA02C', border: '1px solid #8C8C8C' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.1673 10.1567V11C20.1662 12.9768 19.5261 14.9002 18.3425 16.4834C17.159 18.0666 15.4953 19.2248 13.5997 19.7853C11.7041 20.3457 9.67814 20.2784 7.82391 19.5934C5.96969 18.9084 4.38658 17.6423 3.3107 15.984C2.23481 14.3257 1.72379 12.3641 1.85385 10.3917C1.98392 8.41922 2.74809 6.54167 4.03241 5.03902C5.31672 3.53637 7.05237 2.48914 8.98049 2.05351C10.9086 1.61787 12.9259 1.81718 14.7315 2.62171" stroke="#0BA02C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.1667 3.6665L11 12.8423L8.25 10.0923" stroke="#0BA02C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Applied
          </button>
        ) : (
          <button className="similar-job-card-apply-btn" onClick={() => applyJob(index)}>
            <FiSend className="similar-job-card-apply-icon" /> Apply
          </button>
        )}
      </div>
    </div>
  );
};

const JobDetailPage = () => {
  const location = useLocation();
  const job = (location.state && location.state.job) || defaultJob;
  const { savedJobIndexes, appliedJobIndexes, toggleSaveJob, applyJob } = useJobActions();
  const jobIndex = 0; // or derive from location/state if available
  const isSaved = savedJobIndexes.includes(jobIndex);
  const isApplied = appliedJobIndexes.includes(jobIndex);

  return (
    <div className="job-detail-minimal-bg">
      {/* Breadcrumb */}
      <div className="job-detail-minimal-breadcrumb">
        Home / Find Job / UI/UX Design / <span>Job Details</span>
      </div>
      <div className="job-detail-minimal-header-row">
        <div className="job-detail-minimal-logo-wrap">
          <img src={logo} alt="company-logo" className="job-detail-minimal-logo" />
        </div>
        <div className="job-detail-minimal-title-wrap">
          <div className="job-detail-minimal-title-row">
            <h1 className="job-detail-minimal-title">{job.title}</h1>
            <span className="job-detail-minimal-badge job-detail-minimal-badge-green">FULL-TIME</span>
            <span className="job-detail-minimal-badge job-detail-minimal-badge-pink">Featured</span>
          </div>
          <div className="job-detail-minimal-company">at {job.company}</div>
        </div>
        <div className="job-detail-minimal-actions">
          <button className="job-detail-minimal-save-btn" onClick={() => toggleSaveJob(jobIndex)}>
            {isSaved ? (
              <svg width="20" height="26" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4173 17.25L7.00065 12.6667L0.583984 17.25V2.58333C0.583984 2.0971 0.777139 1.63079 1.12096 1.28697C1.46477 0.943154 1.93109 0.75 2.41732 0.75H11.584C12.0702 0.75 12.5365 0.943154 12.8803 1.28697C13.2242 1.63079 13.4173 2.0971 13.4173 2.58333V17.25Z" fill="#0A65CC"/>
              </svg>
            ) : (
              <svg width="20" height="26" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4173 17.25L7.00065 12.6667L0.583984 17.25V2.58333C0.583984 2.0971 0.777139 1.63079 1.12096 1.28697C1.46477 0.943154 1.93109 0.75 2.41732 0.75H11.584C12.0702 0.75 12.5365 0.943154 12.8803 1.28697C13.2242 1.63079 13.4173 2.0971 13.4173 2.58333V17.25Z" stroke="#888" strokeWidth="1.5" fill="none"/>
              </svg>
            )}
          </button>
          <button
            className="job-detail-minimal-apply-btn"
            onClick={() => applyJob(jobIndex)}
            disabled={isApplied}
            style={isApplied ? { background: '#e6f4ea', color: '#0BA02C', border: '1px solid #8C8C8C' } : {}}
          >
            {isApplied ? (
              <>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
                  <path d="M20.1673 10.1567V11C20.1662 12.9768 19.5261 14.9002 18.3425 16.4834C17.159 18.0666 15.4953 19.2248 13.5997 19.7853C11.7041 20.3457 9.67814 20.2784 7.82391 19.5934C5.96969 18.9084 4.38658 17.6423 3.3107 15.984C2.23481 14.3257 1.72379 12.3641 1.85385 10.3917C1.98392 8.41922 2.74809 6.54167 4.03241 5.03902C5.31672 3.53637 7.05237 2.48914 8.98049 2.05351C10.9086 1.61787 12.9259 1.81718 14.7315 2.62171" stroke="#0BA02C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.1667 3.6665L11 12.8423L8.25 10.0923" stroke="#0BA02C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Applied
              </>
            ) : (
              <>Apply Now <span className="job-detail-minimal-apply-arrow">→</span></>
            )}
          </button>
        </div>
      </div>

      {/* Main content below header */}
      <div className="job-detail-content-row">
        {/* Left: Description and Requirements - EXACT TEXT */}
        <div className="job-detail-content-main job-detail-content-main-bordered">
          <div className="job-detail-content-main-topline" />
          <h2 className="job-detail-content-main-title">Job Description</h2>
          <div className="job-detail-content-main-desc">
            {jobDescriptionText.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <h3 className="job-detail-content-main-req-title">Requirements</h3>
          <ul className="job-detail-content-main-req-list">
            {requirementsList.map((req, i) => <li key={i}>{req}</li>)}
          </ul>
          <h3 className="job-detail-content-main-req-title" style={{marginTop: '28px'}}>Desirable:</h3>
          <ul className="job-detail-content-main-req-list">
            {desirableList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <h3 className="job-detail-content-main-req-title" style={{marginTop: '28px'}}>Benefits</h3>
          <ul className="job-detail-content-main-req-list">
            {benefitsList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        {/* Right: Sidebar (unchanged) */}
        <aside className="job-detail-sidebar-screenshot">
          {/* Salary & Location */}
          <div className="job-detail-sidebar-modern-salaryloc">
            <div className="job-detail-sidebar-modern-salary-block">
              <div className="job-detail-sidebar-modern-salary-label" style={{ color: '#222', fontWeight: 600 }}>Salary</div>
              <div className="job-detail-sidebar-modern-salary-value" style={{ color: '#16a34a', fontWeight: 700, fontSize: '1.3rem' }}>{job.salary || '600,000 - 800,000'}</div>
              <div className="job-detail-sidebar-modern-salary-desc">Yearly salary</div>
            </div>
            <div className="job-detail-sidebar-modern-divider" />
            <div className="job-detail-sidebar-modern-location-block">
              <FiMapPin className="job-detail-sidebar-modern-location-icon" />
              <div>
                <div className="job-detail-sidebar-modern-location-label">Job Location</div>
                <div className="job-detail-sidebar-modern-location-value" style={{ color: '#222', fontWeight: 600 }}>{job.location}</div>
              </div>
            </div>
          </div>
          {/* Job Overview */}
          <div className="job-detail-sidebar-modern-overview">
            <div className="job-detail-sidebar-modern-overview-title">Job Overview</div>
            <div className="job-detail-sidebar-modern-overview-grid">
              <div className="job-detail-sidebar-modern-overview-col">
                <div className="job-detail-sidebar-modern-overview-icon-wrap"><FiCalendar /></div>
                <div className="job-detail-sidebar-modern-overview-label">JOB POSTED:</div>
                <div className="job-detail-sidebar-modern-overview-value">{job.posted}</div>
              </div>
              <div className="job-detail-sidebar-modern-overview-col">
                <div className="job-detail-sidebar-modern-overview-icon-wrap"><FiClock /></div>
                <div className="job-detail-sidebar-modern-overview-label">JOB EXPIRE IN:</div>
                <div className="job-detail-sidebar-modern-overview-value">{job.expire}</div>
              </div>
              <div className="job-detail-sidebar-modern-overview-col">
                <div className="job-detail-sidebar-modern-overview-icon-wrap"><FiLayers /></div>
                <div className="job-detail-sidebar-modern-overview-label">JOB LEVEL:</div>
                <div className="job-detail-sidebar-modern-overview-value">{job.level}</div>
              </div>
              <div className="job-detail-sidebar-modern-overview-col">
                <div className="job-detail-sidebar-modern-overview-icon-wrap"><FiBriefcase /></div>
                <div className="job-detail-sidebar-modern-overview-label">EXPERIENCE:</div>
                <div className="job-detail-sidebar-modern-overview-value">{job.experience}</div>
              </div>
              <div className="job-detail-sidebar-modern-overview-col">
                <div className="job-detail-sidebar-modern-overview-icon-wrap"><FiBookOpen /></div>
                <div className="job-detail-sidebar-modern-overview-label">EDUCATION:</div>
                <div className="job-detail-sidebar-modern-overview-value">{job.education}</div>
              </div>
            </div>
          </div>
          {/* Share this job */}
          <div className="job-detail-sidebar-modern-share">
            <div className="job-detail-sidebar-modern-share-label">Share this job:</div>
            <div className="job-detail-sidebar-modern-share-row">
              <button className="job-detail-sidebar-modern-copy-btn"><FiLink className="job-detail-sidebar-modern-copy-icon" />Copy Links</button>
              <button className="job-detail-sidebar-modern-share-btn linkedin"><FaLinkedinIn /></button>
              <button className="job-detail-sidebar-modern-share-btn facebook"><FaFacebookF /></button>
              <button className="job-detail-sidebar-modern-share-btn twitter"><FaTwitter /></button>
              <button className="job-detail-sidebar-modern-share-btn email"><FiMail /></button>
            </div>
          </div>
        </aside>
      </div>
      {/* Similar Jobs Section */}
      <div className="similar-jobs-section">
        <div className="similar-jobs-header-row">
          <h2 className="similar-jobs-title">Similar Jobs</h2>
          <a href="#" className="similar-jobs-viewall">View All <span style={{fontSize:'1.2em',marginLeft:2}}>→</span></a>
        </div>
        <div className="similar-jobs-grid">
          {similarJobs.map((job, idx) => (
            <JobCard job={job} index={idx} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage; 