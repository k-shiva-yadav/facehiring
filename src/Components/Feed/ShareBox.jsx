// import React, { useState, useRef } from 'react';
// import './feed.css';
// import axios from 'axios';
// import { useFormContext } from '../../Context/FormContext';
// import defaultProfile from "../../Assests/Images/profie.jpeg";
// import videoIcon from '../../Assests/Images/4c25c1f3c0adea4b65c68d493adb2a91.png';
// import photoIcon from '../../Assests/Images/cdbb039eb379eafdea5f2ce09b3e0d0a.png';
// import articleIcon from '../../Assests/Images/4cdc103ec13422d5516ce1a1a8832d08.png';
// import Swal from 'sweetalert2';

// const ShareBox = () => {
//   const { userId } = useFormContext();
//   const [postContent, setPostContent] = useState('');
//   const [media, setMedia] = useState({ images: [], videos: [] });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMediaPreview, setShowMediaPreview] = useState(false);
//   const [taggedUsers, setTaggedUsers] = useState([]);
//   const fileInputRef = useRef(null);
//   const videoInputRef = useRef(null);

//   const MAX_CHARS = 1300;

//   const handleMediaUpload = (type, e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     const validFiles = files.filter(file =>
//       type === 'images' ? file.type.startsWith('image/') : file.type.startsWith('video/')
//     );

//     setMedia(prev => ({
//       ...prev,
//       [type]: [...prev[type], ...validFiles]
//     }));

//     setShowMediaPreview(true);
//     e.target.value = '';
//   };

//   const removeMedia = (type, index) => {
//     setMedia(prev => {
//       const updated = [...prev[type]];
//       updated.splice(index, 1);
//       const newMedia = { ...prev, [type]: updated };
//       if (newMedia.images.length === 0 && newMedia.videos.length === 0) {
//         setShowMediaPreview(false);
//       }
//       return newMedia;
//     });
//   };

//   const removeTag = (tagToRemove) => {
//     setTaggedUsers(taggedUsers.filter(tag => tag !== tagToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!postContent.trim() && media.images.length === 0 && media.videos.length === 0) {
//       Swal.fire('Error!', 'Please add some content or media to post', 'error');
//       return;
//     }

//     if (!userId) {
//       Swal.fire('Error!', 'User ID is missing. Please login again.', 'error');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('UserId', userId);
//       formData.append('Description', `${postContent.trim()} ${taggedUsers.join(' ')}` || 'Shared media');
//       media.images.forEach((image) => formData.append('ImageFiles', image));
//       media.videos.forEach((video) => formData.append('VideoFiles', video));

//       const response = await axios.post(
//         'https://facehiringapi.codingster.in/Post/Add_Post',
//         formData,
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.responceCode == 1) {
//         Swal.fire('Success!', 'Post created successfully and shared to your network!', 'success')
//           .then(() => {
//             setPostContent('');
//             setMedia({ images: [], videos: [] });
//             setTaggedUsers([]);
//             setShowMediaPreview(false);
//           });
//       } else {
//         Swal.fire('Error!', response.data.message || 'Failed to create post', 'error');
//       }
//     } catch (err) {
//       Swal.fire('Error!', err.response?.data?.message || err.message || 'Failed to create post', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="post-composer">
//       <div className="post-audience"><span>Everyone</span></div>

//       <div className="post-input">
//         <img src={defaultProfile} alt="Profile" className="profile-pic" />
//         <textarea
//           placeholder="What do you want to talk about?"
//           value={postContent}
//           onChange={(e) => setPostContent(e.target.value.slice(0, MAX_CHARS))}
//           rows="3"
//           maxLength={MAX_CHARS}
//         />
//         <div className="char-count">{postContent.length}/{MAX_CHARS}</div>
//       </div>

//       {taggedUsers.length > 0 && (
//         <div className="tagged-users">
//           {taggedUsers.map((tag, index) => (
//             <span key={index} className="tag">
//               {tag} <button onClick={() => removeTag(tag)}>×</button>
//             </span>
//           ))}
//         </div>
//       )}

//       {showMediaPreview && (
//         <div className="media-preview-modal">
//           <div className="media-preview-header">
//             <h3>Create a post</h3>
//             <button onClick={() => setShowMediaPreview(false)} className="close-preview">Close</button>
//           </div>

//           <div className="post-content-preview">
//             <textarea
//               placeholder="What do you want to talk about?"
//               value={postContent}
//               onChange={(e) => setPostContent(e.target.value.slice(0, MAX_CHARS))}
//               rows="5"
//               maxLength={MAX_CHARS}
//             />
//             <div className="char-count">{postContent.length}/{MAX_CHARS}</div>
//           </div>

//           <div className="media-preview-container">
//             {media.images.map((image, index) => (
//               <div key={`image-${index}`} className="media-preview-item">
//                 <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
//                 <button onClick={() => removeMedia('images', index)} className="remove-media">×</button>
//               </div>
//             ))}
//             {media.videos.map((video, index) => (
//               <div key={`video-${index}`} className="media-preview-item">
//                 <video controls>
//                   <source src={URL.createObjectURL(video)} type={video.type} />
//                 </video>
//                 <button onClick={() => removeMedia('videos', index)} className="remove-media">×</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="post-actions">
//         <div className="media-buttons">
//           <button className="media-button" onClick={() => fileInputRef.current.click()}>
//             <img src={photoIcon} alt="Photo" /> Photo
//             <input type="file" ref={fileInputRef} onChange={(e) => handleMediaUpload('images', e)} accept="image/*" multiple hidden />
//           </button>
//           <button className="media-button" onClick={() => videoInputRef.current.click()}>
//             <img src={videoIcon} alt="Video" /> Video
//             <input type="file" ref={videoInputRef} onChange={(e) => handleMediaUpload('videos', e)} accept="video/*" multiple hidden />
//           </button>
//           <button className="media-button" onClick={() => Swal.fire('Article upload feature is under development.')}>
//             <img src={articleIcon} alt="Article" /> Article
//           </button>
//         </div>

//         <div className="preview-actions">
//           <button
//             className="post-button"
//             onClick={handleSubmit}
//             disabled={isLoading || (!postContent.trim() && media.images.length === 0 && media.videos.length === 0)}
//           >
//             {isLoading ? 'Posting...' : 'Post'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShareBox;
import React, { useState, useRef, useEffect } from 'react';
import './feed.css';
import axios from 'axios';
import { useAuthContext } from '../../Context/AuthContext';
import defaultProfile from "../../Assests/Images/profie.jpeg";
import videoIcon from '../../Assests/Images/4c25c1f3c0adea4b65c68d493adb2a91.png';
import photoIcon from '../../Assests/Images/cdbb039eb379eafdea5f2ce09b3e0d0a.png';
import articleIcon from '../../Assests/Images/4cdc103ec13422d5516ce1a1a8832d08.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ShareBox = () => {
  const { user } = useAuthContext();
  const userId = user?.id; // Use optional chainingF
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showMediaPreview, setShowMediaPreview] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
   const navigate = useNavigate();

  const MAX_CHARS = 1300;

  useEffect(() => {
    if (showMediaPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMediaPreview]);

  const handleMediaUpload = (type, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter(file =>
      type === 'images' ? file.type.startsWith('image/') : file.type.startsWith('video/')
    );

    setMedia(prev => ({
      ...prev,
      [type]: [...prev[type], ...validFiles]
    }));

    setShowMediaPreview(true);
    e.target.value = '';
  };

  const removeMedia = (type, index) => {
    setMedia(prev => {
      const updated = [...prev[type]];
      updated.splice(index, 1);
      const newMedia = { ...prev, [type]: updated };
      if (newMedia.images.length === 0 && newMedia.videos.length === 0) {
        setShowMediaPreview(false);
      }
      return newMedia;
    });
  };

  const removeTag = (tagToRemove) => {
    setTaggedUsers(taggedUsers.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postContent.trim() && media.images.length === 0 && media.videos.length === 0) {
      Swal.fire('Error!', 'Please add some content or media to post', 'error');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error!', 'Please login to create a post', 'error');
      return navigate('/login'); // If using react-router
    }
    if (!userId) {
      Swal.fire('Error!', 'User information is missing. Please login again.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('UserId', userId);
      formData.append('Description', `${postContent.trim()} ${taggedUsers.join(' ')}` || 'Shared media');
      media.images.forEach((image) => formData.append('ImageFiles', image));
      media.videos.forEach((video) => formData.append('VideoFiles', video));
      debugger;
      const response = await axios.post(
        'https://facehiringapi.codingster.in/Post/Add_Post',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.responceCode == 1) {
        Swal.fire('Success!', 'Post created successfully and shared to your network!', 'success')
          .then(() => {
            setPostContent('');
            setMedia({ images: [], videos: [] });
            setTaggedUsers([]);
            setShowMediaPreview(false);
          });
      } else {
        Swal.fire('Error!', response.data.message || 'Failed to create post', 'error');
      }
    } catch (err) {
      Swal.fire('Error!', err.response?.data?.message || err.message || 'Failed to create post', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-composer">
      <div className="post-audience"><span>Everyone</span></div>

      <div className="post-input">
        <img src={defaultProfile} alt="Profile" className="profile-pic" />
        <textarea
          placeholder="What do you want to talk about?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value.slice(0, MAX_CHARS))}
          rows="2"
          maxLength={MAX_CHARS}
        />
        <div className="char-count">{postContent.length}/{MAX_CHARS}</div>
      </div>

      {taggedUsers.length > 0 && (
        <div className="tagged-users">
          {taggedUsers.map((tag, index) => (
            <span key={index} className="tag">
              {tag} <button onClick={() => removeTag(tag)}>×</button>
            </span>
          ))}
        </div>
      )}

      {showMediaPreview && (
        <div className="media-preview-modal">
          <div className="media-preview-header">
            <h3>Create a post</h3>
            <button onClick={() => setShowMediaPreview(false)} className="close-preview">Close</button>
          </div>
          <div className="char-count">{postContent.length}/{MAX_CHARS}</div>
          <div className="post-content-preview">
            <textarea
              placeholder="What do you want to talk about?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value.slice(0, MAX_CHARS))}
              rows="5"
              maxLength={MAX_CHARS}
            />

          </div>

          <div className="media-preview-container">
            {media.images.map((image, index) => (
              <div key={`image-${index}`} className="media-preview-item">
                <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                <button onClick={() => removeMedia('images', index)} className="remove-media">×</button>
              </div>
            ))}
            {media.videos.map((video, index) => (
              <div key={`video-${index}`} className="media-preview-item">
                <video controls>
                  <source src={URL.createObjectURL(video)} type={video.type} />
                </video>
                <button onClick={() => removeMedia('videos', index)} className="remove-media">×</button>
              </div>
            ))}
            <div className="media-preview-item add-more">
              <button onClick={() => fileInputRef.current.click()}>+ Photo</button>
            </div>
            <div className="media-preview-item add-more">
              <button onClick={() => videoInputRef.current.click()}>+ Video</button>
            </div>
            <div className="media-preview-item add-more">
              <button onClick={() => {
                setShowMediaPreview(true);
                Swal.fire('Article upload feature is under development.');
              }}>+ Article</button>
            </div>
          </div>

          <div className="preview-actions-modal">
            <button
              className="post-button"
              onClick={handleSubmit}
              disabled={isLoading || (!postContent.trim() && media.images.length === 0 && media.videos.length === 0)}
            >
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}

      <div className="post-actions">
        <div className="media-buttons">
          <button className="media-button" onClick={() => fileInputRef.current.click()}>
            <img src={photoIcon} alt="Photo" /> Photo
            <input type="file" ref={fileInputRef} onChange={(e) => handleMediaUpload('images', e)} accept="image/*" multiple hidden />
          </button>
          <button className="media-button" onClick={() => videoInputRef.current.click()}>
            <img src={videoIcon} alt="Video" /> Video
            <input type="file" ref={videoInputRef} onChange={(e) => handleMediaUpload('videos', e)} accept="video/*" multiple hidden />
          </button>
          <button className="media-button" onClick={() => {
            setShowMediaPreview(true);
            Swal.fire('Article upload feature is under development.');
          }}>
            <img src={articleIcon} alt="Article" /> Article
          </button>
        </div>

        <div className="preview-actions">
          <button
            className="post-button"
            onClick={handleSubmit}
            disabled={isLoading || (!postContent.trim() && media.images.length === 0 && media.videos.length === 0)}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareBox;
