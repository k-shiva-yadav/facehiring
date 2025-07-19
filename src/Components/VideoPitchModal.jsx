// components/VideoPitchModal.js
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Sidebar/sidebar.css';
import { useAuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const VideoPitchModal = ({ isOpen, onClose }) => {
    const { user } = useAuthContext();
  const [cameraStarted, setCameraStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

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
    if (isOpen) {
      document.body.classList.add('modal-open');
      startCamera();
    } else {
      document.body.classList.remove('modal-open');
      stopCamera();
      clearInterval(timerRef.current);
      setTimeLeft(300);
      setRecording(false);
    }
    return () => {
      stopCamera();
      clearInterval(timerRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (cameraStarted && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraStarted]);

 const startRecording = async () => {
  if (!streamRef.current) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setCameraStarted(true);
    } catch (error) {
      alert('Camera access denied or unavailable. Reason: ' + error.message);
      return;
    }
  }

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

const downloadVideo = async () => {
  if (!videoURL || !recordedChunks.current.length) return;

  const blob = new Blob(recordedChunks.current, { type: 'video/webm' });

  const file = new File([blob], 'mypitch.webm', { type: 'video/webm' });

  const formData = new FormData();
  formData.append('videoPitch', file);
  formData.append('userId', user?.id); // or user._id depending on your structure

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'https://facehiringapi.codingster.in/User/UpdateUpload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('Video uploaded successfully:', response.data);
    // alert('Video uploaded successfully!');
    toast.success('Video uploaded successfully!',);
    recordedChunks.current = [];
    onClose();
  } catch (error) {
    console.error('Error uploading video:', error);
    // alert('Failed to upload video.');
          toast.error('Failed to upload video.');
    
  }
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

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="video-wrapper">
          <video ref={videoRef} autoPlay muted className="video-preview" />
          {recording && <div className="recording-timer">⏱️ {formatTime(timeLeft)}</div>}
        </div>
        <div className="video-btn-row">
          {!recording ? (
            <button onClick={startRecording}>🔴 Start</button>
          ) : (
            <button onClick={stopRecording}>🛑 Stop</button>
          )}
          <button onClick={onClose}>❌ Close</button>
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
  );
};

export default VideoPitchModal;
