// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useAuthContext } from '../../Context/AuthContext';
// import defaultProfile from '../../Assests/Images/profie.jpeg';
// import defaultBanner from '../../Assests/Images/profie.jpeg';
// import {
//   BsCalendar, BsGeoAlt, BsCurrencyRupee, BsBriefcase,
//   BsFileEarmarkPdf, BsPlus
// } from 'react-icons/bs';
// import { FiPhone, FiMail, FiAward } from 'react-icons/fi';
// import { FaLinkedinIn, FaUserFriends, FaSearch, FaTrophy, FaVideo } from 'react-icons/fa';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const { id } = useParams();
//   const { user: authUser, loading: authLoading } = useAuthContext();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No authentication token found');

//         const response = await axios.get(
//           `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (response.data.responseCode === 1) {
//           setProfileData(response.data.data);
//         } else {
//           throw new Error(response.data.message || 'Error fetching profile');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [id]);

//   const calculateAge = (dob) => {
//     if (!dob) return 'Not specified';
//     const birthDate = new Date(dob);
//     const ageDiff = Date.now() - birthDate.getTime();
//     return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25)) + ' years';
//   };

//   const calculateExperience = (startDate, isCurrent) => {
//     if (!startDate) return 'Not specified';
//     const start = new Date(startDate);
//     const end = isCurrent ? new Date() : new Date();
//     const diff = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
//     return diff.toFixed(1) + ' years';
//   };

//   if (loading || authLoading) return <div className="profile-loading">Loading profile...</div>;
//   if (error) return <div className="profile-error">Error: {error}</div>;
//   if (!profileData) return <div className="profile-not-found">Profile not found</div>;

//   const { user, experiences, educations, skills } = profileData;
//   const experience = experiences?.[0];
//   const education = educations?.[0];
//   const skillSet = skills?.[0];

//   return (
//     <div className="profile-container">
//       {/* Navigation Bar */}
//       <nav className="profile-nav">
//         <div className="nav-brand">
//           <FaLinkedinIn className="linkedin-icon" />
//           <span>Facehiring</span>
//         </div>
//         <div className="nav-links">
//           <a href="#"><FaSearch /> Search</a>
//           <a href="#" className="active"><FaUserFriends /> My Network</a>
//           <a href="#"><BsBriefcase /> Job</a>
//           <a href="#"><FaTrophy /> Competitions</a>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         <div className="row">
//           {/* Left Column (col-4) */}
//           <div className="col-md-4">
//             {/* Profile Card */}
//             <div className="card mb-4 shadow-sm profile-card">
//               <img src={defaultBanner} className="card-img-top profile-banner-img" alt="Banner" />
//               <div className="card-body text-center">
//                 <img
//                   src={user.imageFile || defaultProfile}
//                   alt="Profile"
//                   className="rounded-circle profile-avatar-img"
//                 />
//                 <h5 className="profile-name">{user.firstName} {user.lastName}</h5>
//                 <p className="profile-title">{experience?.designation || 'Not specified'}</p>
//               </div>
//             </div>

//             {/* About Section */}
//             <div className="card mb-4 shadow-sm">
//               <div className="card-header profile-section-header">About</div>
//               <div className="card-body">
//                 <p className="profile-about-text">{user.profileDescription || 'No description available.'}</p>
//               </div>
//             </div>

//             {/* Top Skills */}
//             {skillSet?.topSkills && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Top 3 Skills</div>
//                 <div className="card-body">
//                   <div className="skills-container">
//                     {skillSet.topSkills.split(',').slice(0, 3).map((skill, i) => (
//                       <span key={i} className="skill-badge">{skill.trim()}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Video Pitch */}
//             <div className="card mb-4 shadow-sm">
//               <div className="card-header profile-section-header d-flex justify-content-between align-items-center">
//                 <span>My Video Pitch</span>
//                 <button className="btn btn-sm btn-outline-primary">
//                   <BsPlus className="me-1" /> Add now
//                 </button>
//               </div>
//               <div className="card-body d-flex gap-3">
//                 <FaVideo size={40} className="text-primary video-icon" />
//                 <div className="video-pitch-text">
//                   <small className="d-block">
//                     <strong>Improve your matches and hiring chances by 50%</strong> by adding a video pitch
//                   </small>
//                   <small className="text-muted d-block">
//                     Recruiters prefer candidates with a video pitch
//                   </small>
//                   <a href="#" className="small">How it helps</a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column (col-8) */}
//           <div className="col-md-8">
//             {/* Basic Details */}
//             <div className="card mb-4 shadow-sm">
//               <div className="card-header profile-section-header">Basic Details</div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsCalendar className="detail-icon" />
//                       <div>
//                         <small>AGE</small>
//                         <p>{calculateAge(user.dob)}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsBriefcase className="detail-icon" />
//                       <div>
//                         <small>YEARS OF EXPERIENCE</small>
//                         <p>{experience ? calculateExperience(experience.startDate, experience.isCurrentEmployee) : 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <FiPhone className="detail-icon" />
//                       <div>
//                         <small>MOBILE NO.</small>
//                         <p>{user.mobile || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsCurrencyRupee className="detail-icon" />
//                       <div>
//                         <small>CTC</small>
//                         <p>{experience?.annualSalary ? `${experience.annualSalary} LPA` : 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsGeoAlt className="detail-icon" />
//                       <div>
//                         <small>LOCATION</small>
//                         <p>{user.currentCity || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <FiMail className="detail-icon" />
//                       <div>
//                         <small>EMAIL</small>
//                         <p>{user.email || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Experience */}
//             {experience && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Experience</div>
//                 <div className="card-body">
//                   <div className="experience-item">
//                     <h5 className="company-name">{experience.companyName || 'Not specified'}</h5>
//                     <p className="position-title">{experience.designation || 'Not specified'}</p>
//                     <p className="experience-duration">
//                       {experience.startDate ? new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Not specified'} - 
//                       {experience.isCurrentEmployee ? ' Present' : experience.endDate ? ` ${new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ' Not specified'} | 
//                       {user.currentCity || 'Not specified'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Education */}
//             {education && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Education</div>
//                 <div className="card-body">
//                   <h5 className="education-title">{education.qualification || 'Not specified'} - {education.course || 'Not specified'}</h5>
//                   <p className="institution-name">{education.college || 'Not specified'}</p>
//                   <p className="education-details">
//                     Year: {education.passingYear || 'Not specified'} | Score: {education.percentage || 'Not specified'}%
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Skills & Stream */}
//             {skillSet?.topSkills && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Stream & Skills</div>
//                 <div className="card-body">
//                   <p className="stream-title"><strong>Stream:</strong> {skillSet.stream || 'Not specified'}</p>
//                   <div className="skills-list">
//                     {skillSet.topSkills.split(',').map((skill, i) => (
//                       <span key={i} className="skill-tag">{skill.trim()}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Resume */}
//             {user.resumeFile && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Resume/CV</div>
//                 <div className="card-body">
//                   <div className="resume-item">
//                     <a href={user.resumeFile} target="_blank" rel="noopener noreferrer" className="resume-link">
//                       <BsFileEarmarkPdf className="me-2" />
//                       {user.firstName || 'User'} Resume.pdf
//                     </a>
//                     <small className="resume-date">Added {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useAuthContext } from '../../Context/AuthContext';
// import { BsCalendar, BsGeoAlt, BsCurrencyRupee, BsBriefcase, BsFileEarmarkPdf, BsPlus } from 'react-icons/bs';
// import { FiPhone, FiMail } from 'react-icons/fi';
// import { FaLinkedinIn, FaUserFriends, FaSearch, FaBriefcase, FaTrophy, FaVideo } from 'react-icons/fa';
// import defaultBanner from '../../Assests/Images/profie.jpeg'; // ✅ This is correct

// import './ProfilePage.css';

// // Mock images (replace with actual paths in your project)
// const defaultProfile = 'https://via.placeholder.com/100';

// const ProfilePage = () => {
//   const { id } = useParams();
//   const { user: authUser, loading: authLoading } = useAuthContext();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No authentication token found');

//         const response = await axios.get(
//           `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (response.data.responseCode === 1) {
//           setProfileData(response.data.data);
//         } else {
//           throw new Error(response.data.message || 'Error fetching profile');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [id]);

//   const calculateAge = (dob) => {
//     if (!dob) return 'Not specified';
//     const birthDate = new Date(dob);
//     const ageDiff = Date.now() - birthDate.getTime();
//     return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25)) + ' years';
//   };

//   const calculateExperience = (startDate, isCurrent) => {
//     if (!startDate) return 'Not specified';
//     const start = new Date(startDate);
//     const end = isCurrent ? new Date() : new Date();
//     const diff = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
//     return diff.toFixed(1) + ' years';
//   };

//   if (loading || authLoading) return <div className="profile-loading">Loading profile...</div>;
//   if (error) return <div className="profile-error">Error: {error}</div>;
//   if (!profileData) return <div className="profile-not-found">Profile not found</div>;

//   const { user, experiences, educations, skills } = profileData;
//   const experience = experiences?.[0];
//   const education = educations?.[0];
//   const skillSet = skills?.[0];

//   return (
//     <div className="profile-container ">
//       <div className="container">
//         <div className="row ">
//           {/* Left Column (col-4) */}
//           <div className="col-md-4">
//             {/* Profile Card */}
//             <div className="card mb-4 shadow-sm profiles-card">
//               <img src={defaultBanner} className="card-img-top profile-banner-img" alt="Banner" />
//               <div className="card-body text-center">
//                 <img
//                   src={user.imageFile || defaultProfile}
//                   alt="Profile"
//                   className="rounded-circle profile-avatar-img"
//                 />
//                 <h5 className="profile-name">{user.firstName || 'Not specified'} {user.lastName || ''}</h5>
//                 <p className="profile-title">{experience?.designation || 'Not specified'}</p>
//               </div>
//             </div>

//             {/* About Section */}
//             <div className="card mb-4 shadow-sm">
//               <div className="card-header profile-section-header">About</div>
//               <div className="card-body">
//                 <p className="profile-about-text">{user.profileDescription || 'No description available.'}</p>
//               </div>
//             </div>

//             {/* Top Skills */}
//             {skillSet?.topSkills && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Top 3 Skills</div>
//                 <div className="card-body">
//                   <div className="skills-container">
//                     {skillSet.topSkills.split(',').slice(0, 3).map((skill, i) => (
//                       <span key={i} className="skill-badge">{skill.trim()}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Video Pitch */}
//             <div className="card mb-4 shadow-sm">
//               <div className="card-header profile-section-header d-flex justify-content-between align-items-center">
//                 <span>My Video Pitch</span>
//                 <button className="btn btn-sm btn-outline-primary">
//                   <BsPlus className="me-1" /> Add now
//                 </button>
//               </div>
//               <div className="card-body d-flex gap-3">
//                 <FaVideo size={40} className="text-primary video-icon" />
//                 <div className="video-pitch-text">
//                   <small className="d-block">
//                     <strong>Improve your matches and hiring chances by 50%</strong> by adding a video pitch
//                   </small>
//                   <small className="text-muted d-block">
//                     Recruiters prefer candidates with a video pitch
//                   </small>
//                   <a href="#" className="small">How it helps</a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column (col-8) */}
//           <div className="col-md-8">
//             {/* Basic Details */}
//             <div className="card mb-4 shadow-sm skills-card">
//               <div className="card-header profile-section-header">Basic Details</div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsCalendar className="detail-icon" />
//                       <div>
//                         <small>AGE</small>
//                         <p>{calculateAge(user.dob)}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsBriefcase className="detail-icon" />
//                       <div>
//                         <small>YEARS OF EXPERIENCE</small>
//                         <p>{experience ? calculateExperience(experience.startDate, experience.isCurrentEmployee) : 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <FiPhone className="detail-icon" />
//                       <div>
//                         <small>MOBILE NO.</small>
//                         <p>{user.mobile || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsCurrencyRupee className="detail-icon" />
//                       <div>
//                         <small>CTC</small>
//                         <p>{experience?.annualSalary ? `${experience.annualSalary} LPA` : 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <BsGeoAlt className="detail-icon" />
//                       <div>
//                         <small>LOCATION</small>
//                         <p>{user.currentCity || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <div className="detail-item">
//                       <FiMail className="detail-icon" />
//                       <div>
//                         <small>EMAIL</small>
//                         <p>{user.email || 'Not specified'}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Experience */}
//             {experience && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Experience</div>
//                 <div className="card-body">
//                   <div className="experience-item">
//                     <h5 className="company-name">{experience.companyName || 'Not specified'}</h5>
//                     <p className="position-title">{experience.designation || 'Not specified'}</p>
//                     <p className="experience-duration">
//                       {experience.startDate ? new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Not specified'} - 
//                       {experience.isCurrentEmployee ? ' Present' : experience.endDate ? ` ${new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ' Not specified'} | 
//                       {user.currentCity || 'Not specified'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Education */}
//             {education && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Education</div>
//                 <div className="card-body">
//                   <h5 className="education-title">{education.qualification || 'Not specified'}, {education.course || 'Not specified'}</h5>
//                   <p className="institution-name">{education.college || 'Not specified'}</p>
//                   <p className="education-details">
//                     Year: {education.passingYear || 'Not specified'} | Score: {education.percentage || 'Not specified'}%
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Stream & Skills */}
//             {skillSet?.topSkills && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Stream & Skills</div>
//                 <div className="card-body">
//                   <p className="stream-title"><strong>Stream:</strong> {skillSet.stream || 'Not specified'}</p>
//                   <div className="skills-list">
//                     {skillSet.topSkills.split(',').map((skill, i) => (
//                       <span key={i} className="skill-tag">{skill.trim()}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Resume */}
//             {user.resumeFile && (
//               <div className="card mb-4 shadow-sm">
//                 <div className="card-header profile-section-header">Resume/CV</div>
//                 <div className="card-body">
//                   <div className="resume-item">
//                     <a href={user.resumeFile} target="_blank" rel="noopener noreferrer" className="resume-link">
//                       <BsFileEarmarkPdf className="me-2" />
//                       {user.firstName || 'User'} Resume.pdf
//                     </a>
//                     <small className="resume-date">Added {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { BsCalendar, BsGeoAlt, BsCurrencyRupee, BsBriefcase, BsFileEarmarkPdf } from 'react-icons/bs';
// import { FiPhone, FiMail } from 'react-icons/fi';
// import { FaPen } from 'react-icons/fa';
// import defaultBanner from '../../Assests/Images/profie.jpeg';
// import EditProfileModal from './EditProfileModal';
// import { useAuthContext } from '../../Context/AuthContext';
// import { toast } from 'react-toastify';
// import './ProfilePage.css';

// const defaultProfile = 'https://via.placeholder.com/100';

// const ProfilePage = () => {
//   const { id } = useParams();
//   const { user } = useAuthContext();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editSection, setEditSection] = useState(null);

//   const token = localStorage.getItem('token');
//   const isOwnProfile = user && user.id === id;

//   const validSections = ['basic', 'experience', 'education', 'skills', 'uploads', 'profileDescription'];

//   // Fetch profile data
//   const fetchProfileData = useCallback(async () => {
//     if (!token) {
//       console.error('No authentication token found');
//       setError('No authentication token found. Redirecting to login...');
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 2000);
//       return;
//     }

//     try {
//       console.log('Fetching profile data for ID:', id);
//       const response = await axios.get(
//         `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//         }
//       );

//       if (response.data.responseCode === 1) {
//         setProfileData(response.data.data);
//       } else {
//         throw new Error(response.data.message || 'Error fetching profile');
//       }
//     } catch (err) {
//       console.error('API Error:', err.response?.data || err.message);
//       setError(err.response?.data?.message || 'Failed to fetch profile data');
//     } finally {
//       setLoading(false);
//     }
//   }, [id, token]);

//   // Handle background image upload
//   const handleBackgroundImageUpload = async (event) => {
//     if (!isOwnProfile) {
//       toast.error('You can only edit your own profile.', { role: 'alert' });
//       return;
//     }

//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected', { role: 'alert' });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('UserId', user.id);
//     formData.append('BackGroundImagerFile', file);

//     try {
//       const response = await axios.post(
//         'https://facehiringapi.codingster.in/User/UploadBackGroundImage',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//           timeout: 10000,
//         }
//       );

//       if (response.data.responseCode === 1) {
//         setBackgroundImage(URL.createObjectURL(file));
//         toast.success('Background image uploaded successfully!', { role: 'alert' });
//         fetchProfileData();
//       } else {
//         toast.error(response.data.message || 'Error uploading image', { role: 'alert' });
//       }
//     } catch (err) {
//       console.error('Image Upload Error:', err.response?.data || err.message);
//       toast.error('Error uploading image', { role: 'alert' });
//     }
//   };

//   // Calculate age from date of birth
//   const calculateAge = (dob) => {
//     if (!dob) return 'Not specified';
//     const birthDate = new Date(dob);
//     const ageDiff = Date.now() - birthDate.getTime();
//     return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25)) + ' years';
//   };

//   // Format total experience
//   const calculateExperience = (totalExperience) => {
//     return totalExperience ? `${totalExperience} years` : 'Not specified';
//   };

//   // Handle edit icon click
//   const handleEditClick = (section) => {
//     if (!isOwnProfile) {
//       toast.error('You can only edit your own profile.', { role: 'alert' });
//       return;
//     }
//     if (!validSections.includes(section)) {
//       console.error('Invalid section:', section);
//       toast.error('Invalid section selected.', { role: 'alert' });
//       return;
//     }
//     console.log('Opening modal for section:', section, 'with profileData:', profileData);
//     setEditSection(section);
//     setShowModal(true);
//   };

//   // Handle modal close
//   const handleModalClose = () => {
//     console.log('Closing modal, resetting editSection');
//     setShowModal(false);
//     setEditSection(null); // Ensure this is called after setShowModal
//   };

//   // Fetch data on mount
//   useEffect(() => {
//     console.log('useEffect triggered with ID:', id, 'User:', user);
//     fetchProfileData();
//   }, [fetchProfileData, id, user]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="text-center my-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p>Loading profile data...</p>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="text-center my-5">
//         <p className="text-danger">Error: {error}</p>
//         <button onClick={fetchProfileData} className="btn btn-primary mt-2">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // No profile data
//   if (!profileData) {
//     return <div className="text-center my-5">Profile not found</div>;
//   }

//   const { user: profileUser, experiences, educations, skills, additionalDocuments, workSamples } = profileData;
//   const experience = experiences?.[0];
//   const education = educations?.[0];
//   const skillSet = skills?.[0];
//   const topSkills = skillSet?.topSkills ? skillSet.topSkills.split(',').map(skill => skill.trim()) : [];

//   return (
//     <>
//       <div className="profile-container">
//         <div className="container">
//           <div className="row">
//             {/* Left Column */}
//             <div className="col-12 col-md-4">
//               <div className="card mb-4 profiles-card">
//                 <div className="profile-banner-container">
//                   <img
//                     src={profileUser.bacgroundimage || backgroundImage || defaultBanner}
//                     className="card-img-top profile-banner-img"
//                     alt="Profile banner"
//                   />
//                   {isOwnProfile && (
//                     <label className="upload-banner-icon" aria-label="Upload background image">
//                       <FaPen size={20} title="Edit background image" />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleBackgroundImageUpload}
//                         style={{ display: 'none' }}
//                         aria-label="Select background image"
//                       />
//                     </label>
//                   )}
//                 </div>
//                 <div className="card-body text-center">
//                   <img
//                     src={profileUser.imageFile || defaultProfile}
//                     alt={`${profileUser.firstName} ${profileUser.lastName}'s profile`}
//                     className="rounded-circle profile-avatar-img"
//                   />
//                   <h5 className="profile-name">{profileUser.firstName} {profileUser.lastName}</h5>
//                   <p className="profile-title">{experience?.designation || 'Not specified'}</p>
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   About
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit profile description"
//                       aria-label="Edit profile description"
//                       onClick={() => handleEditClick('profileDescription')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   <p className="profile-about-text">{profileUser.profileDescription || 'No description available.'}</p>
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   My Video Pitch
//                   {isOwnProfile && (
//                     <>
//                       <button className="btn-add-small">+ Add now</button>
//                       <FaPen
//                         className="edit-icon"
//                         size={16}
//                         title="Edit video pitch"
//                         aria-label="Edit video pitch"
//                         onClick={() => handleEditClick('uploads')}
//                       />
//                     </>
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {profileUser.videoPitchFile ? (
//                     <video controls src={profileUser.videoPitchFile} className="w-100" aria-label="Video pitch" />
//                   ) : (
//                     <div className="d-flex align-items-center">
//                       <svg
//                         className="video-icon me-3"
//                         width="68"
//                         height="80"
//                         viewBox="0 0 68 80"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M10 18C10 15.6131 10.9482 13.3239 12.636 11.636C14.3239 9.94821 16.6131 9 19 9H34C36.3869 9 38.6761 9.94821 40.364 11.636C42.0518 13.3239 43 15.6131 43 18V36C43 39.93 40.48 43.272 36.97 44.499C36.99 44.169 37 43.836 37 43.5C37.0002 40.3708 36.1106 37.306 34.4349 34.6633C32.7592 32.0205 30.3666 29.9087 27.5361 28.5743C24.7057 27.2399 21.5541 26.7379 18.4492 27.1269C15.3442 27.5158 12.4139 28.7797 10 30.771V18ZM52.111 41.328L46 37.107V16.89L52.111 12.672C52.6737 12.2837 53.3318 12.0566 54.0142 12.0152C54.6966 11.9739 55.3774 12.1199 55.9828 12.4374C56.5882 12.755 57.0953 13.232 57.4493 13.8169C57.8032 14.4018 57.9906 14.0723 57.991 15.756V38.241C57.9911 38.9249 57.8042 39.5958 57.4505 40.1812C57.0967 40.7665 56.5897 41.244 55.9841 41.5619C55.3786 41.8798 54.6976 42.0261 54.015 41.9848C53.3323 41.9436 52.6739 41.7165 52.111 41.328ZM34 43.5C34 47.0804 32.5777 50.5142 30.0459 53.0459C27.5142 55.5777 24.0804 57 20.5 57C16.9196 57 13.4858 55.5777 10.9541 53.0459C8.42232 50.5142 7 47.0804 7 43.5C7 39.9196 8.42232 36.4858 10.9541 33.9541C13.4858 31.4223 16.9196 30 20.5 30C24.0804 30 27.5142 31.4223 30.0459 33.9541C32.5777 36.4858 34 39.9196 34 43.5ZM22 37.5C22 37.1022 21.842 36.7206 21.5607 36.4393C21.2794 36.158 20.8978 36 20.5 36C20.1022 36 19.7206 36.158 19.4393 36.4393C19.158 36.7206 19 37.1022 19 37.5V42H14.5C14.1022 42 13.7206 42.158 13.4393 42.4393C13.158 42.7206 13 43.1022 13 43.5C13 43.8978 13.158 44.2794 13.4393 44.5607C13.7206 44.842 14.1022 45 14.5 45H19V49.5C19 49.8978 19.158 50.2794 19.4393 50.5607C19.7206 50.842 20.1022 51 20.5 51C20.8978 51 21.2794 50.842 21.5607 50.5607C21.842 50.2794 22 49.8978 22 49.5V45H26.5C26.8978 45 27.2794 44.842 27.5607 44.5607C27.842 44.2794 28 43.8978 28 43.5C28 43.1022 27.842 42.7206 27.5607 42.4393C27.2794 42.158 26.8978 42 26.5 42H22V37.5Z"
//                           fill="#3C5898"
//                         />
//                       </svg>
//                       <div>
//                         <p className="mb-2">Improve your matches and hiring chances by 50% by adding a video pitch</p>
//                         <p className="text-primary mb-0">
//                           Recruiters prefer candidates with a video pitch.{' '}
//                           <a href="#" className="text-primary">
//                             How it helps
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="col-12 col-md-8">
//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Basic Details
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit basic details"
//                       aria-label="Edit basic details"
//                       onClick={() => handleEditClick('basic')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <div className="detail-item">
//                         <BsCalendar className="detail-icon" aria-hidden="true" />
//                         <div>
//                           <small>AGE</small>
//                           <p>{calculateAge(profileUser.dob)}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <div className="detail-item">
//                         <BsBriefcase className="detail-icon" aria-hidden="true" />
//                         <div>
//                           <small>YEARS OF EXPERIENCE</small>
//                           <p>{calculateExperience(experience?.totalExperience)}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <div className="detail-item">
//                         <FiPhone className="detail-icon" aria-hidden="true" />
//                         <div>
//                           <small>MOBILE NO.</small>
//                           <p>{profileUser.mobile || 'Not specified'}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <div className="detail-item">
//                         <BsCurrencyRupee className="detail-icon" aria-hidden="true" />
//                         <div>
//                           <small>CTC</small>
//                           <p>{experience?.annualSalary ? `${experience.annualSalary} LPA` : 'Not specified'}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <div className="detail-item">
//                         <BsGeoAlt className="detail-icon" aria-hidden="true" />
//                         <div>
//                           <small>LOCATION</small>
//                           <p>{profileUser.currentCity || 'Not specified'}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <div className="detail-item">
//                         <FiMail className="detail-icon" aria-hidden="true" />
//                         <div>
//                           <small>EMAIL</small>
//                           <p>{profileUser.email || 'Not specified'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Experience
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit experience"
//                       aria-label="Edit experience"
//                       onClick={() => handleEditClick('experience')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {experience ? (
//                     <div className="experience-item">
//                       <img
//                         src="https://via.placeholder.com/40"
//                         alt={`${experience.companyName} logo`}
//                         className="company-logo me-2"
//                       />
//                       <div>
//                         <h6>{experience.companyName}</h6>
//                         <p>{experience.designation}</p>
//                         <p className="text-muted">
//                           {experience.isCurrentEmployee
//                             ? `Since ${new Date().getFullYear()} - Present | ${profileUser.currentCity}`
//                             : 'Not specified'}
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <p>No experience listed</p>
//                   )}
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Education
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit education"
//                       aria-label="Edit education"
//                       onClick={() => handleEditClick('education')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {education ? (
//                     <div>
//                       <h6>{education.qualification} - {education.specialization}</h6>
//                       <p>{education.college}</p>
//                       <p className="text-muted">Passing Year: {education.passingYear} | {education.percentage}%</p>
//                     </div>
//                   ) : (
//                     <p>No education listed</p>
//                   )}
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Top Skills
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit skills"
//                       aria-label="Edit skills"
//                       onClick={() => handleEditClick('skills')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   <div className="skills-list">
//                     {topSkills.length > 0 ? (
//                       topSkills.map((skill, index) => (
//                         <span className="skill-tag" key={index}>
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <p>No skills listed</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Stream
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit stream"
//                       aria-label="Edit stream"
//                       onClick={() => handleEditClick('skills')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   <h6 className="mb-3">{skillSet?.stream || 'Not specified'}</h6>
//                   <div className="skills-list">
//                     {topSkills.length > 0 ? (
//                       topSkills.map((skill, index) => (
//                         <span className="skill-tag" key={index}>
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <p>No stream skills listed</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Certification
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit certifications"
//                       aria-label="Edit certifications"
//                       onClick={() => handleEditClick('education')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {education?.additionalCertificates?.length > 0 ? (
//                     education.additionalCertificates.map((cert, index) => (
//                       <div key={index} className="mb-2">
//                         <a href={cert.file} target="_blank" rel="noopener noreferrer">
//                           <BsFileEarmarkPdf className="me-2" /> {cert.name}
//                         </a>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No certifications added yet.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Additional Documents
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit documents"
//                       aria-label="Edit documents"
//                       onClick={() => handleEditClick('uploads')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {additionalDocuments?.length > 0 ? (
//                     additionalDocuments.map((doc, index) => (
//                       <div key={index} className="mb-2">
//                         {doc.file1 && (
//                           <a href={doc.file1} target="_blank" rel="noopener noreferrer">
//                             <BsFileEarmarkPdf className="me-2" /> Document {index + 1}
//                           </a>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <p>No additional documents added.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Work Samples
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit work samples"
//                       aria-label="Edit work samples"
//                       onClick={() => handleEditClick('uploads')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body">
//                   {workSamples?.length > 0 ? (
//                     workSamples.map((sample, index) => (
//                       <div key={index} className="mb-2">
//                         {sample.sampleImage1 && (
//                           <a href={sample.sampleImage1} target="_blank" rel="noopener noreferrer">
//                             <BsFileEarmarkPdf className="me-2" /> Work Sample {index + 1}
//                           </a>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <p>No work samples added.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="card mb-4">
//                 <div className="card-header profile-section-header">
//                   Resume/CV
//                   {isOwnProfile && (
//                     <FaPen
//                       className="edit-icon"
//                       size={16}
//                       title="Edit resume"
//                       aria-label="Edit resume"
//                       onClick={() => handleEditClick('uploads')}
//                     />
//                   )}
//                 </div>
//                 <div className="card-body d-flex justify-content-between align-items-center">
//                   <div>
//                     {profileUser.resumeFile ? (
//                       <a href={profileUser.resumeFile} target="_blank" rel="noopener noreferrer">
//                         <BsFileEarmarkPdf className="me-2" /> Resume.pdf
//                       </a>
//                     ) : (
//                       <p>No resume uploaded</p>
//                     )}
//                     <p className="text-muted">Date not specified</p>
//                   </div>
//                   {profileUser.resumeFile && (
//                     <button className="btn-download">
//                       <span className="download-icon">↓</span> Download
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isOwnProfile && showModal && (
//         <EditProfileModal
//           show={showModal}
//           onHide={handleModalClose}
//           section={editSection}
//           profileData={profileData}
//           userId={user.id}
//           token={token}
//           onUpdate={fetchProfileData}
//         />
//       )}
//     </>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BsCalendar, BsGeoAlt, BsCurrencyRupee, BsBriefcase, BsFileEarmarkPdf } from 'react-icons/bs';
import { FiPhone, FiMail } from 'react-icons/fi';
import { FaPen } from 'react-icons/fa';
import defaultBanner from '../../Assests/Images/profie.jpeg';
import EditProfileModal from './EditProfileModal';
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import './ProfilePage.css';

const defaultProfile = 'https://via.placeholder.com/100';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editSection, setEditSection] = useState(null);

   const [showBanner, setShowBanner] = useState(true);
  const [profileViews, setProfileViews] = useState(12); // You can fetch this from API too

  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  const token = localStorage.getItem('token');
  const isOwnProfile = user && user.id === id;

  const validSections = ['basic', 'experience', 'education', 'skills', 'uploads', 'profileDescription'];

  // Fetch profile data
  const fetchProfileData = useCallback(async () => {
    if (!token) {
      console.error('No authentication token found');
      setError('No authentication token found. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }

    try {
      console.log('Fetching profile data for ID:', id);
      const response = await axios.get(
        `https://facehiringapi.codingster.in/User/GetUserCareerProfileWithInfo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.data.responseCode === 1) {
        setProfileData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Error fetching profile');
      }
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  // Handle background image upload
  const handleBackgroundImageUpload = async (event) => {
    if (!isOwnProfile) {
      toast.error('You can only edit your own profile.', { role: 'alert' });
      return;
    }

    const file = event.target.files[0];
    if (!file) {
      toast.error('No file selected', { role: 'alert' });
      return;
    }

    const formData = new FormData();
    formData.append('UserId', user.id);
    formData.append('BackGroundImagerFile', file);

    try {
      const response = await axios.post(
        'https://facehiringapi.codingster.in/User/UploadBackGroundImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      if (response.data.responseCode === 1) {
        setBackgroundImage(URL.createObjectURL(file));
        toast.success('Background image uploaded successfully!', { role: 'alert' });
        fetchProfileData();
      } else {
        toast.error(response.data.message || 'Error uploading image', { role: 'alert' });
      }
    } catch (err) {
      console.error('Image Upload Error:', err.response?.data || err.message);
      toast.error('Error uploading image', { role: 'alert' });
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 'Not specified';
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25)) + ' years';
  };

  // Format total experience
  const calculateExperience = (totalExperience) => {
    return totalExperience ? `${totalExperience} years` : 'Not specified';
  };

  // Handle edit icon click
  const handleEditClick = (section) => {
    if (!isOwnProfile) {
      toast.error('You can only edit your own profile.', { role: 'alert' });
      return;
    }
    if (!validSections.includes(section)) {
      console.error('Invalid section:', section);
      toast.error('Invalid section selected.', { role: 'alert' });
      return;
    }
    console.log('Opening modal for section:', section, 'with profileData:', profileData);
    setEditSection(section);
    setShowModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    console.log('Closing modal, resetting editSection');
    setShowModal(false);
    setEditSection(null); // Ensure this is called after setShowModal
  };

  // Fetch data on mount
  useEffect(() => {
    console.log('useEffect triggered with ID:', id, 'User:', user);
    fetchProfileData();
  }, [fetchProfileData, id, user]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">Error: {error}</p>
        <button onClick={fetchProfileData} className="btn btn-primary mt-2">
          Retry
        </button>
      </div>
    );
  }

  // No profile data
  if (!profileData) {
    return <div className="text-center my-5">Profile not found</div>;
  }

  const { user: profileUser, experiences, educations, skills, additionalDocuments, workSamples } = profileData;
  const experience = experiences?.[0];
  const education = educations?.[0];
  const skillSet = skills?.[0];
  const topSkills = skillSet?.topSkills ? skillSet.topSkills.split(',').map(skill => skill.trim()) : [];

  return (
    <>
      <div className="profile-container">
{showBanner && (
  <div className="floating-banner-strip">
    <span>
      ✅ Your profile has been viewed by {profileViews} recruiter{profileViews !== 1 && 's'} this week.
    </span>
    <span className="banner-close-btn" onClick={handleCloseBanner}>×</span>
  </div>
)}

        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-12 col-md-4">
              <div className="card mb-4 profiles-card">
                <div className="profile-banner-container">
                  <img
                    src={profileUser.bacgroundimage || backgroundImage || defaultBanner}
                    className="card-img-top profile-banner-img"
                    alt="Profile banner"
                  />
                  {isOwnProfile && (
                    <label className="upload-banner-icon" aria-label="Upload background image">
                      <FaPen size={20} title="Edit background image" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundImageUpload}
                        style={{ display: 'none' }}
                        aria-label="Select background image"
                      />
                    </label>
                  )}
                </div>
                <div className="card-body text-center">
                  <img
                    src={profileUser.imageFile || defaultProfile}
                    alt={`${profileUser.firstName} ${profileUser.lastName}'s profile`}
                    className="rounded-circle profile-avatar-img"
                  />
                  <h5 className="profile-name">{profileUser.firstName} {profileUser.lastName}</h5>
                  <p className="profile-title">{experience?.designation || 'Not specified'}</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  About
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit profile description"
                      aria-label="Edit profile description"
                      onClick={() => handleEditClick('profileDescription')}
                    />
                  )}
                </div>
                <div className="card-body">
                  <p className="profile-about-text">{profileUser.profileDescription || 'No description available.'}</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  My Video Pitch
                  {isOwnProfile && (
                    <>
                      <button className="btn-add-small">+ Add now</button>
                      <FaPen
                        className="edit-icon"
                        size={16}
                        title="Edit video pitch"
                        aria-label="Edit video pitch"
                        onClick={() => handleEditClick('uploads')}
                      />
                    </>
                  )}
                </div>
                <div className="card-body">
                  {profileUser.videoPitchFile ? (
                    <video controls src={profileUser.videoPitchFile} className="w-100" aria-label="Video pitch" />
                  ) : (
                    <div className="d-flex align-items-center">
                      <svg
                        className="video-icon me-3"
                        width="68"
                        height="80"
                        viewBox="0 0 68 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M10 18C10 15.6131 10.9482 13.3239 12.636 11.636C14.3239 9.94821 16.6131 9 19 9H34C36.3869 9 38.6761 9.94821 40.364 11.636C42.0518 13.3239 43 15.6131 43 18V36C43 39.93 40.48 43.272 36.97 44.499C36.99 44.169 37 43.836 37 43.5C37.0002 40.3708 36.1106 37.306 34.4349 34.6633C32.7592 32.0205 30.3666 29.9087 27.5361 28.5743C24.7057 27.2399 21.5541 26.7379 18.4492 27.1269C15.3442 27.5158 12.4139 28.7797 10 30.771V18ZM52.111 41.328L46 37.107V16.89L52.111 12.672C52.6737 12.2837 53.3318 12.0566 54.0142 12.0152C54.6966 11.9739 55.3774 12.1199 55.9828 12.4374C56.5882 12.755 57.0953 13.232 57.4493 13.8169C57.8032 14.4018 57.9906 14.0723 57.991 15.756V38.241C57.9911 38.9249 57.8042 39.5958 57.4505 40.1812C57.0967 40.7665 56.5897 41.244 55.9841 41.5619C55.3786 41.8798 54.6976 42.0261 54.015 41.9848C53.3323 41.9436 52.6739 41.7165 52.111 41.328ZM34 43.5C34 47.0804 32.5777 50.5142 30.0459 53.0459C27.5142 55.5777 24.0804 57 20.5 57C16.9196 57 13.4858 55.5777 10.9541 53.0459C8.42232 50.5142 7 47.0804 7 43.5C7 39.9196 8.42232 36.4858 10.9541 33.9541C13.4858 31.4223 16.9196 30 20.5 30C24.0804 30 27.5142 31.4223 30.0459 33.9541C32.5777 36.4858 34 39.9196 34 43.5ZM22 37.5C22 37.1022 21.842 36.7206 21.5607 36.4393C21.2794 36.158 20.8978 36 20.5 36C20.1022 36 19.7206 36.158 19.4393 36.4393C19.158 36.7206 19 37.1022 19 37.5V42H14.5C14.1022 42 13.7206 42.158 13.4393 42.4393C13.158 42.7206 13 43.1022 13 43.5C13 43.8978 13.158 44.2794 13.4393 44.5607C13.7206 44.842 14.1022 45 14.5 45H19V49.5C19 49.8978 19.158 50.2794 19.4393 50.5607C19.7206 50.842 20.1022 51 20.5 51C20.8978 51 21.2794 50.842 21.5607 50.5607C21.842 50.2794 22 49.8978 22 49.5V45H26.5C26.8978 45 27.2794 44.842 27.5607 44.5607C27.842 44.2794 28 43.8978 28 43.5C28 43.1022 27.842 42.7206 27.5607 42.4393C27.2794 42.158 26.8978 42 26.5 42H22V37.5Z"
                          fill="#3C5898"
                        />
                      </svg>
                      <div>
                        <p className="mb-2">Improve your matches and hiring chances by 50% by adding a video pitch</p>
                        <p className="text-primary mb-0">
                          Recruiters prefer candidates with a video pitch.{' '}
                          <a href="#" className="text-primary">
                            How it helps
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-12 col-md-8">
              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Basic Details
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit basic details"
                      aria-label="Edit basic details"
                      onClick={() => handleEditClick('basic')}
                    />
                  )}
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="detail-item">
                        <BsCalendar className="detail-icon" aria-hidden="true" />
                        <div className='from-left'>
                          <small>AGE</small>
                          <p className='font-weight'>{calculateAge(profileUser.dob)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="detail-item">
                        <BsBriefcase className="detail-icon" aria-hidden="true" />
                        <div className='from-left'>
                          <small>YEARS OF EXPERIENCE</small>
                          <p className='font-weight'>{calculateExperience(experience?.totalExperience)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="detail-item">
                        <FiPhone className="detail-icon" aria-hidden="true" />
                        <div className='from-left'>
                          <small>MOBILE NO.</small>
                          <p className='font-weight'>{profileUser.mobile || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="detail-item">
                        <BsCurrencyRupee className="detail-icon" aria-hidden="true" />
                        <div className='from-left'>
                          <small>CTC</small>
                          <p className='font-weight'>{experience?.annualSalary ? `${experience.annualSalary} LPA` : 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="detail-item">
                        <BsGeoAlt className="detail-icon" aria-hidden="true" />
                        <div className='from-left'>
                          <small>LOCATION</small>
                          <p className='font-weight'>{profileUser.currentCity || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="detail-item">
                        <FiMail className="detail-icon" aria-hidden="true" />
                        <div className='from-left'>
                          <small>EMAIL</small>
                          <p className='font-weight'>{profileUser.email || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Experience
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit experience"
                      aria-label="Edit experience"
                      onClick={() => handleEditClick('experience')}
                    />
                  )}
                </div>
                <div className="card-body">
                  {experience ? (
                    <div className="experience-item">
                      <img
                        src="https://via.placeholder.com/40"
                        alt={`${experience.companyName} logo`}
                        className="company-logo me-2"
                      />
                      <div>
                        <h6>{experience.companyName}</h6>
                        <p>{experience.designation}</p>
                        <p className="text-muted">
                          {experience.isCurrentEmployee
                            ? `Since ${new Date().getFullYear()} - Present | ${profileUser.currentCity}`
                            : 'Not specified'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>No experience listed</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Education
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit education"
                      aria-label="Edit education"
                      onClick={() => handleEditClick('education')}
                    />
                  )}
                </div>
                <div className="card-body">
                  {education ? (
                    <div>
                      <h6>{education.qualification} - {education.specialization}</h6>
                      <p>{education.college}</p>
                      <p className="text-muted">Passing Year: {education.passingYear} | {education.percentage}%</p>
                    </div>
                  ) : (
                    <p>No education listed</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Top Skills
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit skills"
                      aria-label="Edit skills"
                      onClick={() => handleEditClick('skills')}
                    />
                  )}
                </div>
                <div className="card-body">
                  <div className="skills-list">
                    {topSkills.length > 0 ? (
                      topSkills.map((skill, index) => (
                        <span className="skill-tag" key={index}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p>No skills listed</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Stream
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit stream"
                      aria-label="Edit stream"
                      onClick={() => handleEditClick('skills')}
                    />
                  )}
                </div>
                <div className="card-body">
                  <h6 className="mb-3">{skillSet?.stream || 'Not specified'}</h6>
                  <div className="skills-list">
                    {topSkills.length > 0 ? (
                      topSkills.map((skill, index) => (
                        <span className="skill-tag" key={index}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p>No stream skills listed</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Certification
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit certifications"
                      aria-label="Edit certifications"
                      onClick={() => handleEditClick('education')}
                    />
                  )}
                </div>
                <div className="card-body">
                  {education?.additionalCertificates?.length > 0 ? (
                    education.additionalCertificates.map((cert, index) => (
                      <div key={index} className="mb-2">
                        <a href={cert.file} target="_blank" rel="noopener noreferrer">
                          <BsFileEarmarkPdf className="me-2" /> {cert.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>No certifications added yet.</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Additional Documents
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit documents"
                      aria-label="Edit documents"
                      onClick={() => handleEditClick('uploads')}
                    />
                  )}
                </div>
                <div className="card-body">
                  {additionalDocuments?.length > 0 ? (
                    additionalDocuments.map((doc, index) => (
                      <div key={index} className="mb-2">
                        {doc.file1 && (
                          <a href={doc.file1} target="_blank" rel="noopener noreferrer">
                            <BsFileEarmarkPdf className="me-2" /> Document {index + 1}
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No additional documents added.</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Work Samples
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit work samples"
                      aria-label="Edit work samples"
                      onClick={() => handleEditClick('uploads')}
                    />
                  )}
                </div>
                <div className="card-body">
                  {workSamples?.length > 0 ? (
                    workSamples.map((sample, index) => (
                      <div key={index} className="mb-2">
                        {sample.sampleImage1 && (
                          <a href={sample.sampleImage1} target="_blank" rel="noopener noreferrer">
                            <BsFileEarmarkPdf className="me-2" /> Work Sample {index + 1}
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No work samples added.</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header profile-section-header">
                  Resume/CV
                  {isOwnProfile && (
                    <FaPen
                      className="edit-icon"
                      size={16}
                      title="Edit resume"
                      aria-label="Edit resume"
                      onClick={() => handleEditClick('uploads')}
                    />
                  )}
                </div>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    {profileUser.resumeFile ? (
                      <a href={profileUser.resumeFile} target="_blank" rel="noopener noreferrer">
                        <BsFileEarmarkPdf className="me-2" /> Resume.pdf
                      </a>
                    ) : (
                      <p>No resume uploaded</p>
                    )}
                    <p className="text-muted">Date not specified</p>
                  </div>
                  {profileUser.resumeFile && (
                    <button className="btn-download">
                      <span className="download-icon">↓</span> Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOwnProfile && showModal && (
        <EditProfileModal
          show={showModal}
          onHide={handleModalClose}
          section={editSection}
          profileData={profileData}
          userId={user.id}
          token={token}
          onUpdate={fetchProfileData}
        />
      )}
    </>
  );
};

export default ProfilePage;