// import React from 'react';
// import './sidebar.css';
// import { FiBriefcase, FiMapPin, FiVideo, FiBookmark, FiChevronRight } from 'react-icons/fi';

// const ProfileSidebar = () => {
//   return (
//     <>
//       <div className="profile-sidebar-card">
//         {/* Banner and Profile Image */}
//         <div className="profile-sidebar-banner-wrap">
//           <img
//             className="profile-sidebar-banner"
//             src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
//             alt="Banner"
//           />
//           <img
//             className="profile-sidebar-avatar"
//             src="https://randomuser.me/api/portraits/men/32.jpg"
//             alt="Profile"
//           />
//         </div>
//         {/* Name, Title, Company, Location */}
//         <div className="profile-sidebar-info">
//           <div className="profile-sidebar-name">Ranbhir Mehra</div>
//           <div className="profile-sidebar-title">UI/UX Designer</div>
//           <div className="profile-sidebar-company">
//             <FiBriefcase className="profile-sidebar-icon" /> XYZ software company Ltd.
//           </div>
//           <div className="profile-sidebar-location">
//             <FiMapPin className="profile-sidebar-icon" /> Hyderabad, Telangana
//           </div>
//         </div>
//         {/* Video Pitch Button */}
//         <div className="profile-sidebar-videopitch-wrap">
//           <button className="profile-sidebar-videopitch-btn">
//             <FiVideo className="profile-sidebar-videopitch-icon" /> My Video Pitch
//           </button>
//         </div>
//         <div className="profile-sidebar-divider" />
//         {/* Analytics Section */}
//         <div className="profile-sidebar-analytics-wrap">
//           <a href="#" className="profile-sidebar-analytics-link">View all analytics</a>
//           <div className="profile-sidebar-analytics-grid profile-sidebar-analytics-grid-bordered">
//             <div className="profile-sidebar-analytics-item">
//               <div className="profile-sidebar-analytics-label">Profile Viewers</div>
//               <div className="profile-sidebar-analytics-value">350</div>
//             </div>
//             <div className="profile-sidebar-analytics-item">
//               <div className="profile-sidebar-analytics-label">Post Impressions</div>
//               <div className="profile-sidebar-analytics-value">1200</div>
//             </div>
//             <div className="profile-sidebar-analytics-item">
//               <div className="profile-sidebar-analytics-label">Followers</div>
//               <div className="profile-sidebar-analytics-value">12k</div>
//             </div>
//             <div className="profile-sidebar-analytics-item">
//               <div className="profile-sidebar-analytics-label">Search Appearances</div>
//               <div className="profile-sidebar-analytics-value">800</div>
//             </div>
//           </div>
//         </div>
//         <div className="profile-sidebar-divider" />
//         {/* View Profile Button */}
//         <div className="profile-sidebar-viewprofile-wrap">
//           <button className="profile-sidebar-viewprofile-btn">View Profile</button>
//         </div>
//       </div>
//       {/* Saved Items Card */}
//       <div className="profile-sidebar-saved-items-card">
//         <div className="profile-sidebar-saved-items-content">
//           <FiBookmark className="profile-sidebar-saved-items-icon" />
//           <span className="profile-sidebar-saved-items-text">Saved items</span>
//           <FiChevronRight className="profile-sidebar-saved-items-arrow" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileSidebar; 

import React, { useEffect, useRef, useState } from 'react';
import './sidebar.css';
import ReactDOM from 'react-dom';
import {
  FiBriefcase,
  FiMapPin,
  FiVideo,
  FiBookmark,
  FiChevronRight,
} from 'react-icons/fi';

const ProfileSidebar = () => {
  const [cameraStarted, setCameraStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  const openModal = () => {
    document.body.classList.add('modal-open');
    setShowModal(true);
    startCamera();
  };

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    stopCamera();
    setShowModal(false);
    setRecording(false);
    clearInterval(timerRef.current);
    setTimeLeft(300);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      setCameraStarted(true);
    } catch (error) {
      alert('Camera access denied or unavailable. Reason: ' + error.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraStarted(false);
  };

  useEffect(() => {
    if (cameraStarted && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraStarted]);

  const startRecording = () => {
    recordedChunks.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      clearInterval(timerRef.current);
      setTimeLeft(300);
    };

    recorder.start();
    setRecording(true);
    setTimeLeft(300);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          recorder.stop();
          setRecording(false);
          stopCamera();
          clearInterval(timerRef.current);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      stopCamera();
      clearInterval(timerRef.current);
      setTimeLeft(300);
    }
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoURL;
    a.download = 'mypitch.webm';
    a.click();
  };

  const deleteVideo = () => {
    setVideoURL(null);
    URL.revokeObjectURL(videoURL);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <>
      <div className={`app-blur ${showModal ? 'blurred' : ''}`}>
        <div className="profile-sidebar-card">
          <div className="profile-sidebar-banner-wrap">
            <img className="profile-sidebar-banner" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Banner" />
            <img className="profile-sidebar-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
          </div>
          <div className="profile-sidebar-info">
            <div className="profile-sidebar-name">Ranbhir Mehra</div>
            <div className="profile-sidebar-title">UI/UX Designer</div>
            <div className="profile-sidebar-company">
              <FiBriefcase className="profile-sidebar-icon" /> XYZ software company Ltd.
            </div>
            <div className="profile-sidebar-location">
              <FiMapPin className="profile-sidebar-icon" /> Hyderabad, Telangana
            </div>
          </div>
          <div className="profile-sidebar-videopitch-wrap">
            <button className="profile-sidebar-videopitch-btn" onClick={openModal}>
              <FiVideo className="profile-sidebar-videopitch-icon" /> My Video Pitch
            </button>
          </div>
          <div className="profile-sidebar-divider" />
          <div className="profile-sidebar-viewprofile-wrap">
            <button className="profile-sidebar-viewprofile-btn">View Profile</button>
          </div>
        </div>
        <div className="profile-sidebar-saved-items-card">
          <div className="profile-sidebar-saved-items-content">
            <FiBookmark className="profile-sidebar-saved-items-icon" />
            <span className="profile-sidebar-saved-items-text">Saved items</span>
            <FiChevronRight className="profile-sidebar-saved-items-arrow" />
          </div>
        </div>
      </div>

      {showModal && ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <div className="video-wrapper">
              <video ref={videoRef} autoPlay muted className="video-preview" />
              {recording && (
                <div className="recording-timer">⏱️ {formatTime(timeLeft)}</div>
              )}
            </div>
            <div className="video-btn-row">
              {!recording ? (
                <button onClick={startRecording}>🔴 Start</button>
              ) : (
                <button onClick={stopRecording}>🛑 Stop</button>
              )}
              <button onClick={closeModal}>❌ Close</button>
            </div>
            {videoURL && (
              <div className="profile-sidebar-preview">
                <video src={videoURL} controls className="video-preview" />
                <div className="video-btn-row">
                  <button onClick={downloadVideo}>💾 Save</button>
                  <button onClick={deleteVideo} className="danger-btn">🗑️ Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProfileSidebar;




