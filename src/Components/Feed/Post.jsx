// // // // // // // import React, { useState, useContext, useEffect, useCallback } from 'react';
// // // // // // // import { PostContext } from '../../Context/PostContext';
// // // // // // // import { useAuthContext } from '../../Context/AuthContext';
// // // // // // // import { toast } from 'react-toastify';
// // // // // // // import Card from '../UI/Card';
// // // // // // // import Button from '../UI/Button';
// // // // // // // import Comments from '../Comments/Comments';
// // // // // // // import axios from 'axios';
// // // // // // // import './post.css';
// // // // // // // import {
// // // // // // //   FaRegThumbsUp,
// // // // // // //   FaRegComment,
// // // // // // //   FaRetweet,
// // // // // // //   FaRegPaperPlane,
// // // // // // //   FaHeart,
// // // // // // //   FaPlay,
// // // // // // //   FaChevronLeft,
// // // // // // //   FaChevronRight,
// // // // // // //   FaEllipsisH,
// // // // // // // } from 'react-icons/fa';
// // // // // // // import { BiLike, BiParty, BiBulb, BiHeart, BiSmile } from 'react-icons/bi';
// // // // // // // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // // // // // // const Post = ({ 
// // // // // // //   id, 
// // // // // // //   author, 
// // // // // // //   content, 
// // // // // // //   images = [], 
// // // // // // //   videos = [], 
// // // // // // //   engagement = {}, 
// // // // // // //   timeAgo, 
// // // // // // //   isPromoted,
// // // // // // //   onDeletePost,
// // // // // // //   onEditPost
// // // // // // // }) => {
// // // // // // //   const { handleLike } = useContext(PostContext);
// // // // // // //   const { user } = useAuthContext();
// // // // // // //   const userId = user?.userId || localStorage.getItem('userId') || null;
// // // // // // //   const userAvatar = user?.avatar || defaultProfileFallback;
// // // // // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // // // // //   const [showReactions, setShowReactions] = useState(false);
// // // // // // //   const [isLiking, setIsLiking] = useState(false);
// // // // // // //   const [userReaction, setUserReaction] = useState(null);
// // // // // // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // // // // // //   const [showComments, setShowComments] = useState(false);
// // // // // // //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// // // // // // //   const [showOptions, setShowOptions] = useState(false);
// // // // // // //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);

// // // // // // //   const allMedia = [
// // // // // // //     ...images.filter(url => url && url.trim() !== '').map(url => ({ type: 'image', url })),
// // // // // // //     ...videos.filter(url => url && url.trim() !== '').map(url => ({ type: 'video', url })),
// // // // // // //   ];

// // // // // // //   const reactions = [
// // // // // // //     { name: 'Like', icon: <BiLike />, color: '#0a66c2' },
// // // // // // //     { name: 'Celebrate', icon: <BiParty />, color: '#068139' },
// // // // // // //     { name: 'Support', icon: <BiHeart />, color: '#693896' },
// // // // // // //     { name: 'Love', icon: <BiHeart />, color: '#e02835' },
// // // // // // //     { name: 'Insightful', icon: <BiBulb />, color: '#f7c948' },
// // // // // // //     { name: 'Funny', icon: <BiSmile />, color: '#f28c38' },
// // // // // // //   ];

// // // // // // //   const fetchCommentCount = useCallback(async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.get(
// // // // // // //         `https://facehiringapi.codingster.in/Post/GetAllPostComments/${id}`,
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );
// // // // // // //       if (response.data && response.data.responseCode === 1) {
// // // // // // //         setCommentCount(response.data.data?.length || 0);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Fetch comment count error:', error);
// // // // // // //       if (error.response?.status === 404) {
// // // // // // //         setCommentCount(0);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }, [id]);

// // // // // // //   const handleReactionClick = async (reactionName) => {
// // // // // // //     if (!userId) {
// // // // // // //       toast.error('Please log in to like this post.');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (isLiking) return;
// // // // // // //     setIsLiking(true);
// // // // // // //     try {
// // // // // // //       await handleLike(id, userId, reactionName);
// // // // // // //       setUserReaction(reactionName);
// // // // // // //       setShowReactions(false);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Reaction error:', error.message);
// // // // // // //       toast.error(error.message || 'Failed to like post. Please try again.');
// // // // // // //     } finally {
// // // // // // //       setIsLiking(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const nextMedia = () => {
// // // // // // //     setCurrentMediaIndex((prevIndex) =>
// // // // // // //       prevIndex === allMedia.length - 1 ? 0 : prevIndex + 1
// // // // // // //     );
// // // // // // //     setIsVideoPlaying(false);
// // // // // // //   };

// // // // // // //   const prevMedia = () => {
// // // // // // //     setCurrentMediaIndex((prevIndex) =>
// // // // // // //       prevIndex === 0 ? allMedia.length - 1 : prevIndex - 1
// // // // // // //     );
// // // // // // //     setIsVideoPlaying(false);
// // // // // // //   };

// // // // // // //   const renderMediaItem = (item, index) => {
// // // // // // //     if (item.type === 'image') {
// // // // // // //       return (
// // // // // // //         <img
// // // // // // //           key={index}
// // // // // // //           src={item.url.startsWith('http') ? item.url : `https://facehiringapi.codingster.in/DisplayImages/${item.url}`}
// // // // // // //           alt={`Post media ${index}`}
// // // // // // //           className="post-media"
// // // // // // //           onError={(e) => (e.target.src = defaultProfileFallback)}
// // // // // // //         />
// // // // // // //       );
// // // // // // //     } else {
// // // // // // //       return (
// // // // // // //         <div key={index} className="video-wrapper">
// // // // // // //           {!isVideoPlaying ? (
// // // // // // //             <>
// // // // // // //               <video
// // // // // // //                 className="post-media"
// // // // // // //                 src={item.url}
// // // // // // //                 onClick={() => setIsVideoPlaying(true)}
// // // // // // //               />
// // // // // // //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// // // // // // //                 <FaPlay />
// // // // // // //               </button>
// // // // // // //             </>
// // // // // // //           ) : (
// // // // // // //             <video
// // // // // // //               controls
// // // // // // //               autoPlay
// // // // // // //               className="post-media"
// // // // // // //               src={item.url}
// // // // // // //               onEnded={() => setIsVideoPlaying(false)}
// // // // // // //             />
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       );
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const toggleComments = () => {
// // // // // // //     if (!userId) {
// // // // // // //       toast.error('Please log in to view comments.');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     setShowComments(!showComments);
// // // // // // //   };

// // // // // // //   const handleCommentClick = () => {
// // // // // // //     if (!userId) {
// // // // // // //       toast.error('Please log in to comment on this post.');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     setShowComments(true);
// // // // // // //     setTimeout(() => {
// // // // // // //       const commentInput = document.querySelector(`#comments-${id} .comment-input`);
// // // // // // //       commentInput?.focus();
// // // // // // //     }, 100);
// // // // // // //   };

// // // // // // //   const handleNewComment = () => {
// // // // // // //     setCommentsRefreshTrigger(prev => !prev);
// // // // // // //     fetchCommentCount();
// // // // // // //   };

// // // // // // //   const handleDeletePost = async () => {
// // // // // // //     if (window.confirm('Are you sure you want to delete this post?')) {
// // // // // // //       try {
// // // // // // //         await onDeletePost(id);
// // // // // // //         toast.success('Post deleted successfully');
// // // // // // //       } catch (error) {
// // // // // // //         console.error('Delete post error:', error);
// // // // // // //         toast.error('Failed to delete post');
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchCommentCount();
// // // // // // //   }, [fetchCommentCount, commentsRefreshTrigger]);

// // // // // // //   return (
// // // // // // //     <Card className={`post ${isPromoted ? 'promoted-post' : ''}`}>
// // // // // // //       <div className="post-header">
// // // // // // //         <div className="post-header-left">
// // // // // // //           <img
// // // // // // //             src={author.profileimage || defaultProfileFallback}
// // // // // // //             alt={author.userName || author.name}
// // // // // // //             className="post-imgs"
// // // // // // //             onError={(e) => (e.target.src = defaultProfileFallback)}
// // // // // // //           />
// // // // // // //           <div className="post-author-info">
// // // // // // //             <h4 className="post-author-name">{author.userName || author.name}</h4>
// // // // // // //             <p className="post-author-title">{author.designation || author.title || 'Member'}</p>
// // // // // // //             <span className="post-time">{timeAgo}</span>
// // // // // // //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {user?.userId === author.id && (
// // // // // // //           <div className="post-options">
// // // // // // //             <button 
// // // // // // //               className="options-btn" 
// // // // // // //               onClick={() => setShowOptions(!showOptions)}
// // // // // // //               aria-label="Post options"
// // // // // // //             >
// // // // // // //               <FaEllipsisH />
// // // // // // //             </button>
// // // // // // //             {showOptions && (
// // // // // // //               <div className="options-dropdown">
// // // // // // //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// // // // // // //                 <button onClick={handleDeletePost}>Delete Post</button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       <div className="post-content">
// // // // // // //         <p>{content}</p>
// // // // // // //       </div>

// // // // // // //       {allMedia.length > 0 && (
// // // // // // //         <div className="post-media-container">
// // // // // // //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// // // // // // //           {allMedia.length > 1 && (
// // // // // // //             <>
// // // // // // //               <button className="carousel-nav prev" onClick={prevMedia} aria-label="Previous media">
// // // // // // //                 <FaChevronLeft />
// // // // // // //               </button>
// // // // // // //               <button className="carousel-nav next" onClick={nextMedia} aria-label="Next media">
// // // // // // //                 <FaChevronRight />
// // // // // // //               </button>

// // // // // // //               <div className="media-indicators">
// // // // // // //                 {allMedia.map((_, index) => (
// // // // // // //                   <button
// // // // // // //                     key={index}
// // // // // // //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// // // // // // //                     aria-label={`Go to media ${index + 1}`}
// // // // // // //                     onClick={() => {
// // // // // // //                       setCurrentMediaIndex(index);
// // // // // // //                       setIsVideoPlaying(false);
// // // // // // //                     }}
// // // // // // //                   />
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <div className="post-stats">
// // // // // // //         {(engagement.likes > 0 || commentCount > 0 || engagement.reposts > 0) && (
// // // // // // //           <div className="stats-container">
// // // // // // //             <div className="d-flex align-items-center gap-3">
// // // // // // //               {engagement.likes > 0 && (
// // // // // // //                 <span className="stat-item">
// // // // // // //                   <span className="reaction-icons">
// // // // // // //                     <FaHeart className="like-icon" />
// // // // // // //                   </span>
// // // // // // //                   <span className="stat-count">{engagement.likes}</span>
// // // // // // //                 </span>
// // // // // // //               )}
// // // // // // //               {engagement.reposts > 0 && (
// // // // // // //                 <span className="stat-item">
// // // // // // //                   <span className="stat-count">{engagement.reposts}</span> reposts
// // // // // // //                 </span>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //             {commentCount > 0 && (
// // // // // // //               <span className="stat-item clickable ms-auto" onClick={toggleComments}>
// // // // // // //                 <span className="stat-count">{commentCount}</span>
// // // // // // //                 {commentCount === 1 ? ' comment' : ' comments'}
// // // // // // //               </span>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       <div className="post-actions">
// // // // // // //         <div
// // // // // // //           className="reaction-container"
// // // // // // //           onMouseEnter={() => setShowReactions(true)}
// // // // // // //           onMouseLeave={() => setShowReactions(false)}
// // // // // // //         >
// // // // // // //           <Button
// // // // // // //             variant="text"
// // // // // // //             className="post-action-btn"
// // // // // // //             onClick={() => handleReactionClick('Like')}
// // // // // // //             disabled={isLiking}
// // // // // // //           >
// // // // // // //             {userReaction ? (
// // // // // // //               <>
// // // // // // //                 {reactions.find((r) => r.name === userReaction)?.icon}
// // // // // // //                 <span style={{ color: reactions.find((r) => r.name === userReaction)?.color }}>
// // // // // // //                   {userReaction}
// // // // // // //                 </span>
// // // // // // //               </>
// // // // // // //             ) : (
// // // // // // //               <>
// // // // // // //                 <FaRegThumbsUp className="post-action-icon" /> Like
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </Button>
// // // // // // //           {showReactions && (
// // // // // // //             <div className="reaction-bar">
// // // // // // //               {reactions.map((reaction) => (
// // // // // // //                 <button
// // // // // // //                   key={reaction.name}
// // // // // // //                   className="reaction-button"
// // // // // // //                   onClick={() => handleReactionClick(reaction.name)}
// // // // // // //                   title={reaction.name}
// // // // // // //                   disabled={isLiking}
// // // // // // //                 >
// // // // // // //                   {reaction.icon}
// // // // // // //                 </button>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //         <Button variant="text" className="post-action-btn" onClick={handleCommentClick}>
// // // // // // //           <FaRegComment className="post-action-icon" /> Comment
// // // // // // //         </Button>
// // // // // // //         <Button variant="text" className="post-action-btn">
// // // // // // //           <FaRetweet className="post-action-icon" /> Repost
// // // // // // //         </Button>
// // // // // // //         <Button variant="text" className="post-action-btn">
// // // // // // //           <FaRegPaperPlane className="post-action-icon" /> Send
// // // // // // //         </Button>
// // // // // // //       </div>

// // // // // // //       {showComments && (
// // // // // // //         <div className="post-comments-section" id={`comments-${id}`}>
// // // // // // //           <Comments 
// // // // // // //             postId={id} 
// // // // // // //             refreshTrigger={commentsRefreshTrigger} 
// // // // // // //             onNewComment={handleNewComment} 
// // // // // // //           />
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </Card>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Post;
// // // // // // import React, { useState, useContext, useEffect, useCallback } from 'react';
// // // // // // import { PostContext } from '../../Context/PostContext';
// // // // // // import { useAuthContext } from '../../Context/AuthContext';
// // // // // // import { toast } from 'react-toastify';
// // // // // // import Card from '../UI/Card';
// // // // // // import Button from '../UI/Button';
// // // // // // import Comments from '../Comments/Comments';
// // // // // // import axios from 'axios';
// // // // // // import './post.css';
// // // // // // import {
// // // // // //   FaRegThumbsUp,
// // // // // //   FaThumbsUp,
// // // // // //   FaRegComment,
// // // // // //   FaRetweet,
// // // // // //   FaRegPaperPlane,
// // // // // //   FaEllipsisH,
// // // // // //   FaPlay,
// // // // // //   FaChevronLeft,
// // // // // //   FaChevronRight,
// // // // // // } from 'react-icons/fa';
// // // // // // import { BiLike, BiParty, BiBulb, BiHeart, BiSmile } from 'react-icons/bi';
// // // // // // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // // // // // const Post = ({ 
// // // // // //   id, 
// // // // // //   author, 
// // // // // //   content, 
// // // // // //   images = [], 
// // // // // //   videos = [], 
// // // // // //   engagement = {}, 
// // // // // //   timeAgo, 
// // // // // //   isPromoted,
// // // // // //   onDeletePost,
// // // // // //   onEditPost
// // // // // // }) => {
// // // // // //   const { handleLike } = useContext(PostContext);
// // // // // //   const { user } = useAuthContext();
// // // // // //   const userId = user?.userId || localStorage.getItem('userId') || null;
// // // // // //   const userAvatar = user?.avatar || defaultProfileFallback;
// // // // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // // // //   const [showReactions, setShowReactions] = useState(false);
// // // // // //   const [isLiking, setIsLiking] = useState(false);
// // // // // //   const [userReaction, setUserReaction] = useState(null);
// // // // // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // // // // //   const [showComments, setShowComments] = useState(false);
// // // // // //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// // // // // //   const [showOptions, setShowOptions] = useState(false);
// // // // // //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);

// // // // // //   const allMedia = [
// // // // // //     ...images.filter(url => url && url.trim() !== '').map(url => ({ type: 'image', url })),
// // // // // //     ...videos.filter(url => url && url.trim() !== '').map(url => ({ type: 'video', url })),
// // // // // //   ];

// // // // // //   const reactions = [
// // // // // //     { name: 'Like', icon: <BiLike />, color: '#0a66c2' },
// // // // // //     { name: 'Celebrate', icon: <BiParty />, color: '#068139' },
// // // // // //     { name: 'Support', icon: <BiHeart />, color: '#693896' },
// // // // // //     { name: 'Love', icon: <BiHeart />, color: '#e02835' },
// // // // // //     { name: 'Insightful', icon: <BiBulb />, color: '#f7c948' },
// // // // // //     { name: 'Funny', icon: <BiSmile />, color: '#f28c38' },
// // // // // //   ];

// // // // // //   const fetchCommentCount = useCallback(async () => {
// // // // // //     try {
// // // // // //       const response = await axios.get(
// // // // // //         `https://facehiringapi.codingster.in/Post/GetAllPostComments/${id}`,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// // // // // //           },
// // // // // //         }
// // // // // //       );
// // // // // //       if (response.data && response.data.responseCode === 1) {
// // // // // //         setCommentCount(response.data.data?.length || 0);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Fetch comment count error:', error);
// // // // // //       if (error.response?.status === 404) {
// // // // // //         setCommentCount(0);
// // // // // //       }
// // // // // //     }
// // // // // //   }, [id]);

// // // // // //   const handleReactionClick = async (reactionName) => {
// // // // // //     if (!userId) {
// // // // // //       toast.error('Please log in to react to this post.');
// // // // // //       return;
// // // // // //     }

// // // // // //     if (isLiking) return;
// // // // // //     setIsLiking(true);
// // // // // //     try {
// // // // // //       await handleLike(id, userId, reactionName);
// // // // // //       setUserReaction(reactionName);
// // // // // //       setShowReactions(false);
// // // // // //     } catch (error) {
// // // // // //       console.error('Reaction error:', error.message);
// // // // // //       toast.error(error.message || 'Failed to react to post. Please try again.');
// // // // // //     } finally {
// // // // // //       setIsLiking(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const nextMedia = () => {
// // // // // //     setCurrentMediaIndex((prevIndex) =>
// // // // // //       prevIndex === allMedia.length - 1 ? 0 : prevIndex + 1
// // // // // //     );
// // // // // //     setIsVideoPlaying(false);
// // // // // //   };

// // // // // //   const prevMedia = () => {
// // // // // //     setCurrentMediaIndex((prevIndex) =>
// // // // // //       prevIndex === 0 ? allMedia.length - 1 : prevIndex - 1
// // // // // //     );
// // // // // //     setIsVideoPlaying(false);
// // // // // //   };

// // // // // //   const renderMediaItem = (item, index) => {
// // // // // //     if (item.type === 'image') {
// // // // // //       return (
// // // // // //         <img
// // // // // //           key={index}
// // // // // //           src={item.url.startsWith('http') ? item.url : `https://facehiringapi.codingster.in/DisplayImages/${item.url}`}
// // // // // //           alt={`Post media ${index}`}
// // // // // //           className="post-media"
// // // // // //           onError={(e) => (e.target.src = defaultProfileFallback)}
// // // // // //         />
// // // // // //       );
// // // // // //     } else {
// // // // // //       return (
// // // // // //         <div key={index} className="video-wrapper">
// // // // // //           {!isVideoPlaying ? (
// // // // // //             <>
// // // // // //               <video
// // // // // //                 className="post-media"
// // // // // //                 src={item.url}
// // // // // //                 onClick={() => setIsVideoPlaying(true)}
// // // // // //               />
// // // // // //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// // // // // //                 <FaPlay />
// // // // // //               </button>
// // // // // //             </>
// // // // // //           ) : (
// // // // // //             <video
// // // // // //               controls
// // // // // //               autoPlay
// // // // // //               className="post-media"
// // // // // //               src={item.url}
// // // // // //               onEnded={() => setIsVideoPlaying(false)}
// // // // // //             />
// // // // // //           )}
// // // // // //         </div>
// // // // // //       );
// // // // // //     }
// // // // // //   };

// // // // // //   const toggleComments = () => {
// // // // // //     if (!userId) {
// // // // // //       toast.error('Please log in to view comments.');
// // // // // //       return;
// // // // // //     }
// // // // // //     setShowComments(!showComments);
// // // // // //   };

// // // // // //   const handleCommentClick = () => {
// // // // // //     if (!userId) {
// // // // // //       toast.error('Please log in to comment on this post.');
// // // // // //       return;
// // // // // //     }
// // // // // //     setShowComments(true);
// // // // // //     setTimeout(() => {
// // // // // //       const commentInput = document.querySelector(`#comments-${id} .comment-input`);
// // // // // //       commentInput?.focus();
// // // // // //     }, 100);
// // // // // //   };

// // // // // //   const handleNewComment = () => {
// // // // // //     setCommentsRefreshTrigger(prev => !prev);
// // // // // //     fetchCommentCount();
// // // // // //   };

// // // // // //   const handleDeletePost = async () => {
// // // // // //     if (window.confirm('Are you sure you want to delete this post?')) {
// // // // // //       try {
// // // // // //         await onDeletePost(id);
// // // // // //         toast.success('Post deleted successfully');
// // // // // //       } catch (error) {
// // // // // //         console.error('Delete post error:', error);
// // // // // //         toast.error('Failed to delete post');
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchCommentCount();
// // // // // //   }, [fetchCommentCount, commentsRefreshTrigger]);

// // // // // //   return (
// // // // // //     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
// // // // // //       <div className="post-header">
// // // // // //         <div className="post-header-left">
// // // // // //           <img
// // // // // //             src={author.profileimage || defaultProfileFallback}
// // // // // //             alt={author.userName || author.name}
// // // // // //             className="post-avatar"
// // // // // //             onError={(e) => (e.target.src = defaultProfileFallback)}
// // // // // //           />
// // // // // //           <div className="post-author-info">
// // // // // //             <h4 className="post-author-name">{author.userName || author.name}</h4>
// // // // // //             <p className="post-author-title">{author.designation || author.title || 'Member'}</p>
// // // // // //             <span className="post-time">{timeAgo}</span>
// // // // // //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {user?.userId === author.id && (
// // // // // //           <div className="post-options">
// // // // // //             <button 
// // // // // //               className="options-btn" 
// // // // // //               onClick={() => setShowOptions(!showOptions)}
// // // // // //               aria-label="Post options"
// // // // // //             >
// // // // // //               <FaEllipsisH />
// // // // // //             </button>
// // // // // //             {showOptions && (
// // // // // //               <div className="options-dropdown">
// // // // // //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// // // // // //                 <button onClick={handleDeletePost}>Delete Post</button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       <div className="post-content">
// // // // // //         <p>{content}</p>
// // // // // //       </div>

// // // // // //       {allMedia.length > 0 && (
// // // // // //         <div className="post-media-container">
// // // // // //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// // // // // //           {allMedia.length > 1 && (
// // // // // //             <>
// // // // // //               <button className="carousel-nav prev" onClick={prevMedia} aria-label="Previous media">
// // // // // //                 <FaChevronLeft />
// // // // // //               </button>
// // // // // //               <button className="carousel-nav next" onClick={nextMedia} aria-label="Next media">
// // // // // //                 <FaChevronRight />
// // // // // //               </button>

// // // // // //               <div className="media-indicators">
// // // // // //                 {allMedia.map((_, index) => (
// // // // // //                   <button
// // // // // //                     key={index}
// // // // // //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// // // // // //                     aria-label={`Go to media ${index + 1}`}
// // // // // //                     onClick={() => {
// // // // // //                       setCurrentMediaIndex(index);
// // // // // //                       setIsVideoPlaying(false);
// // // // // //                     }}
// // // // // //                   />
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div className="post-stats">
// // // // // //         {(engagement.likes > 0 || commentCount > 0 || engagement.reposts > 0) && (
// // // // // //           <div className="stats-container">
// // // // // //             <div className="d-flex align-items-center gap-3">
// // // // // //               {engagement.likes > 0 && (
// // // // // //                 <span className="stat-item">
// // // // // //                   <span className="reaction-icons">
// // // // // //                     <BiLike className="like-icon" />
// // // // // //                   </span>
// // // // // //                   <span className="stat-count">{engagement.likes}</span>
// // // // // //                 </span>
// // // // // //               )}
// // // // // //               {commentCount > 0 && (
// // // // // //                 <span className="stat-item">
// // // // // //                   <span className="stat-count">{commentCount}</span> comments
// // // // // //                 </span>
// // // // // //               )}
// // // // // //               {engagement.reposts > 0 && (
// // // // // //                 <span className="stat-item">
// // // // // //                   <span className="stat-count">{engagement.reposts}</span> reposts
// // // // // //                 </span>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       <div className="post-actions">
// // // // // //         <div
// // // // // //           className="reaction-container"
// // // // // //           onMouseEnter={() => setShowReactions(true)}
// // // // // //           onMouseLeave={() => setShowReactions(false)}
// // // // // //         >
// // // // // //           <Button
// // // // // //             variant="text"
// // // // // //             className={`post-action-btn ${userReaction ? 'active-reaction' : ''}`}
// // // // // //             onClick={() => handleReactionClick('Like')}
// // // // // //             disabled={isLiking}
// // // // // //           >
// // // // // //             {userReaction ? (
// // // // // //               <>
// // // // // //                 {reactions.find((r) => r.name === userReaction)?.icon}
// // // // // //                 <span style={{ color: reactions.find((r) => r.name === userReaction)?.color }}>
// // // // // //                   {userReaction}
// // // // // //                 </span>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <FaRegThumbsUp className="post-action-icon" /> Like
// // // // // //               </>
// // // // // //             )}
// // // // // //           </Button>
// // // // // //           {showReactions && (
// // // // // //             <div className="reaction-bar">
// // // // // //               {reactions.map((reaction) => (
// // // // // //                 <button
// // // // // //                   key={reaction.name}
// // // // // //                   className="reaction-button"
// // // // // //                   onClick={() => handleReactionClick(reaction.name)}
// // // // // //                   title={reaction.name}
// // // // // //                   disabled={isLiking}
// // // // // //                 >
// // // // // //                   {reaction.icon}
// // // // // //                 </button>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //         <Button variant="text" className="post-action-btn" onClick={handleCommentClick}>
// // // // // //           <FaRegComment className="post-action-icon" /> Comment
// // // // // //         </Button>
// // // // // //         <Button variant="text" className="post-action-btn">
// // // // // //           <FaRetweet className="post-action-icon" /> Repost
// // // // // //         </Button>
// // // // // //         <Button variant="text" className="post-action-btn">
// // // // // //           <FaRegPaperPlane className="post-action-icon" /> Send
// // // // // //         </Button>
// // // // // //       </div>

// // // // // //       {showComments && (
// // // // // //         <div className="post-comments-section" id={`comments-${id}`}>
// // // // // //           <Comments 
// // // // // //             postId={id} 
// // // // // //             refreshTrigger={commentsRefreshTrigger} 
// // // // // //             onNewComment={handleNewComment} 
// // // // // //           />
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </Card>
// // // // // //   );
// // // // // // };

// // // // // // export default Post;
// // // // // import React, { useState, useContext, useEffect, useCallback } from 'react';
// // // // // import { PostContext } from '../../Context/PostContext';
// // // // // import { useAuthContext } from '../../Context/AuthContext';
// // // // // import { toast } from 'react-toastify';
// // // // // import Card from '../UI/Card';
// // // // // import Button from '../UI/Button';
// // // // // import Comments from '../Comments/Comments';
// // // // // import axios from 'axios';
// // // // // import './post.css';
// // // // // import {
// // // // //   FaRegThumbsUp,
// // // // //   FaThumbsUp,
// // // // //   FaRegComment,
// // // // //   FaRetweet,
// // // // //   FaRegPaperPlane,
// // // // //   FaEllipsisH,
// // // // //   FaPlay,
// // // // //   FaChevronLeft,
// // // // //   FaChevronRight,
// // // // // } from 'react-icons/fa';
// // // // // import { BiLike, BiParty, BiBulb, BiHeart, BiSmile } from 'react-icons/bi';
// // // // // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // // // // const Post = ({ 
// // // // //   id, 
// // // // //   author, 
// // // // //   content, 
// // // // //   images = [], 
// // // // //   videos = [], 
// // // // //   engagement = {}, 
// // // // //   timeAgo, 
// // // // //   isPromoted,
// // // // //   onDeletePost,
// // // // //   onEditPost
// // // // // }) => {
// // // // //   const { handleLike } = useContext(PostContext);
// // // // //   const { user } = useAuthContext();
// // // // //   const userId = user?.userId || localStorage.getItem('userId') || null;
// // // // //   const userAvatar = user?.avatar || defaultProfileFallback;
// // // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // // //   const [showReactions, setShowReactions] = useState(false);
// // // // //   const [isLiking, setIsLiking] = useState(false);
// // // // //   const [userReaction, setUserReaction] = useState(null);
// // // // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // // // //   const [showComments, setShowComments] = useState(false);
// // // // //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// // // // //   const [showOptions, setShowOptions] = useState(false);
// // // // //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);

// // // // //   const allMedia = [
// // // // //     ...images.filter(url => url && url.trim() !== '').map(url => ({ type: 'image', url })),
// // // // //     ...videos.filter(url => url && url.trim() !== '').map(url => ({ type: 'video', url })),
// // // // //   ];

// // // // //   const reactions = [
// // // // //     { name: 'Like', icon: <BiLike />, color: '#0a66c2' },
// // // // //     { name: 'Celebrate', icon: <BiParty />, color: '#068139' },
// // // // //     { name: 'Support', icon: <BiHeart />, color: '#693896' },
// // // // //     { name: 'Love', icon: <BiHeart />, color: '#e02835' },
// // // // //     { name: 'Insightful', icon: <BiBulb />, color: '#f7c948' },
// // // // //     { name: 'Funny', icon: <BiSmile />, color: '#f28c38' },
// // // // //   ];

// // // // //   const fetchCommentCount = useCallback(async () => {
// // // // //     try {
// // // // //       const response = await axios.get(
// // // // //         `https://facehiringapi.codingster.in/Post/GetAllPostComments/${id}`,
// // // // //         {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// // // // //           },
// // // // //         }
// // // // //       );
// // // // //       if (response.data && response.data.responseCode === 1) {
// // // // //         setCommentCount(response.data.data?.length || 0);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Fetch comment count error:', error);
// // // // //       if (error.response?.status === 404) {
// // // // //         setCommentCount(0);
// // // // //       }
// // // // //     }
// // // // //   }, [id]);

// // // // //   const handleReactionClick = async (reactionName) => {
// // // // //     if (!userId) {
// // // // //       toast.error('Please log in to react to this post.');
// // // // //       return;
// // // // //     }

// // // // //     if (isLiking) return;
// // // // //     setIsLiking(true);
// // // // //     try {
// // // // //       await handleLike(id, userId, reactionName);
// // // // //       setUserReaction(reactionName);
// // // // //       setShowReactions(false);
// // // // //     } catch (error) {
// // // // //       console.error('Reaction error:', error.message);
// // // // //       toast.error(error.message || 'Failed to react to post. Please try again.');
// // // // //     } finally {
// // // // //       setIsLiking(false);
// // // // //     }
// // // // //   };

// // // // //   const nextMedia = () => {
// // // // //     setCurrentMediaIndex((prevIndex) =>
// // // // //       prevIndex === allMedia.length - 1 ? 0 : prevIndex + 1
// // // // //     );
// // // // //     setIsVideoPlaying(false);
// // // // //   };

// // // // //   const prevMedia = () => {
// // // // //     setCurrentMediaIndex((prevIndex) =>
// // // // //       prevIndex === 0 ? allMedia.length - 1 : prevIndex - 1
// // // // //     );
// // // // //     setIsVideoPlaying(false);
// // // // //   };

// // // // //   const renderMediaItem = (item, index) => {
// // // // //     if (item.type === 'image') {
// // // // //       return (
// // // // //         <img
// // // // //           key={index}
// // // // //           src={item.url.startsWith('http') ? item.url : `https://facehiringapi.codingster.in/DisplayImages/${item.url}`}
// // // // //           alt={`Post media ${index}`}
// // // // //           className="post-media"
// // // // //           onError={(e) => (e.target.src = defaultProfileFallback)}
// // // // //         />
// // // // //       );
// // // // //     } else {
// // // // //       return (
// // // // //         <div key={index} className="video-wrapper">
// // // // //           {!isVideoPlaying ? (
// // // // //             <>
// // // // //               <video
// // // // //                 className="post-media"
// // // // //                 src={item.url}
// // // // //                 onClick={() => setIsVideoPlaying(true)}
// // // // //               />
// // // // //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// // // // //                 <FaPlay />
// // // // //               </button>
// // // // //             </>
// // // // //           ) : (
// // // // //             <video
// // // // //               controls
// // // // //               autoPlay
// // // // //               className="post-media"
// // // // //               src={item.url}
// // // // //               onEnded={() => setIsVideoPlaying(false)}
// // // // //             />
// // // // //           )}
// // // // //         </div>
// // // // //       );
// // // // //     }
// // // // //   };

// // // // //   const toggleComments = () => {
// // // // //     if (!userId) {
// // // // //       toast.error('Please log in to view comments.');
// // // // //       return;
// // // // //     }
// // // // //     setShowComments(!showComments);
// // // // //   };

// // // // //   const handleCommentClick = () => {
// // // // //     if (!userId) {
// // // // //       toast.error('Please log in to comment on this post.');
// // // // //       return;
// // // // //     }
// // // // //     setShowComments(true);
// // // // //     setTimeout(() => {
// // // // //       const commentInput = document.querySelector(`#comments-${id} .comment-input`);
// // // // //       commentInput?.focus();
// // // // //     }, 100);
// // // // //   };

// // // // //   const handleNewComment = () => {
// // // // //     setCommentsRefreshTrigger(prev => !prev);
// // // // //     fetchCommentCount();
// // // // //   };

// // // // //   const handleDeletePost = async () => {
// // // // //     if (window.confirm('Are you sure you want to delete this post?')) {
// // // // //       try {
// // // // //         await onDeletePost(id);
// // // // //         toast.success('Post deleted successfully');
// // // // //       } catch (error) {
// // // // //         console.error('Delete post error:', error);
// // // // //         toast.error('Failed to delete post');
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchCommentCount();
// // // // //   }, [fetchCommentCount, commentsRefreshTrigger]);

// // // // //   return (
// // // // //     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
// // // // //       <div className="post-header">
// // // // //         <div className="post-header-left">
// // // // //           <img
// // // // //             src={author.profileimage || defaultProfileFallback}
// // // // //             alt={author.userName || author.name}
// // // // //             className="post-avatar"
// // // // //             onError={(e) => (e.target.src = defaultProfileFallback)}
// // // // //           />
// // // // //           <div className="post-author-info">
// // // // //             <h4 className="post-author-name">{author.userName || author.name}</h4>
// // // // //             <p className="post-author-title">{author.designation || author.title || 'Member'}</p>
// // // // //             <span className="post-time">{timeAgo}</span>
// // // // //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// // // // //           </div>
// // // // //         </div>

// // // // //         {user?.userId === author.id && (
// // // // //           <div className="post-options">
// // // // //             <button 
// // // // //               className="options-btn" 
// // // // //               onClick={() => setShowOptions(!showOptions)}
// // // // //               aria-label="Post options"
// // // // //             >
// // // // //               <FaEllipsisH />
// // // // //             </button>
// // // // //             {showOptions && (
// // // // //               <div className="options-dropdown">
// // // // //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// // // // //                 <button onClick={handleDeletePost}>Delete Post</button>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       <div className="post-content">
// // // // //         <p>{content}</p>
// // // // //       </div>

// // // // //       {allMedia.length > 0 && (
// // // // //         <div className="post-media-container">
// // // // //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// // // // //           {allMedia.length > 1 && (
// // // // //             <>
// // // // //               <button className="carousel-nav prev" onClick={prevMedia} aria-label="Previous media">
// // // // //                 <FaChevronLeft />
// // // // //               </button>
// // // // //               <button className="carousel-nav next" onClick={nextMedia} aria-label="Next media">
// // // // //                 <FaChevronRight />
// // // // //               </button>

// // // // //               <div className="media-indicators">
// // // // //                 {allMedia.map((_, index) => (
// // // // //                   <button
// // // // //                     key={index}
// // // // //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// // // // //                     aria-label={`Go to media ${index + 1}`}
// // // // //                     onClick={() => {
// // // // //                       setCurrentMediaIndex(index);
// // // // //                       setIsVideoPlaying(false);
// // // // //                     }}
// // // // //                   />
// // // // //                 ))}
// // // // //               </div>
// // // // //             </>
// // // // //           )}
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="post-stats">
// // // // //         {(engagement.likes > 0 || commentCount > 0 || engagement.reposts > 0) && (
// // // // //           <div className="stats-container">
// // // // //             <div className="d-flex align-items-center gap-3">
// // // // //               {engagement.likes > 0 && (
// // // // //                 <span className="stat-item">
// // // // //                   <span className="reaction-icons">
// // // // //                     <BiLike className="like-icon" />
// // // // //                   </span>
// // // // //                   <span className="stat-count">{engagement.likes}</span>
// // // // //                 </span>
// // // // //               )}
// // // // //               {commentCount > 0 && (
// // // // //                 <span className="stat-item clickable" onClick={toggleComments}>
// // // // //                   <span className="stat-count">{commentCount}</span> comments
// // // // //                 </span>
// // // // //               )}
// // // // //               {engagement.reposts > 0 && (
// // // // //                 <span className="stat-item">
// // // // //                   <span className="stat-count">{engagement.reposts}</span> reposts
// // // // //                 </span>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       <div className="post-actions">
// // // // //         <div
// // // // //           className="reaction-container"
// // // // //           onMouseEnter={() => setShowReactions(true)}
// // // // //           onMouseLeave={() => setShowReactions(false)}
// // // // //         >
// // // // //           <Button
// // // // //             variant="text"
// // // // //             className={`post-action-btn ${userReaction ? 'active-reaction' : ''}`}
// // // // //             onClick={() => handleReactionClick('Like')}
// // // // //             disabled={isLiking}
// // // // //           >
// // // // //             {userReaction ? (
// // // // //               <>
// // // // //                 {reactions.find((r) => r.name === userReaction)?.icon}
// // // // //                 <span style={{ color: reactions.find((r) => r.name === userReaction)?.color }}>
// // // // //                   {userReaction}
// // // // //                 </span>
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <FaRegThumbsUp className="post-action-icon" /> Like
// // // // //               </>
// // // // //             )}
// // // // //           </Button>
// // // // //           {showReactions && (
// // // // //             <div className="reaction-bar">
// // // // //               {reactions.map((reaction) => (
// // // // //                 <button
// // // // //                   key={reaction.name}
// // // // //                   className="reaction-button"
// // // // //                   onClick={() => handleReactionClick(reaction.name)}
// // // // //                   title={reaction.name}
// // // // //                   disabled={isLiking}
// // // // //                 >
// // // // //                   {reaction.icon}
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //         <Button variant="text" className="post-action-btn" onClick={handleCommentClick}>
// // // // //           <FaRegComment className="post-action-icon" /> Comment
// // // // //         </Button>
// // // // //         <Button variant="text" className="post-action-btn">
// // // // //           <FaRetweet className="post-action-icon" /> Repost
// // // // //         </Button>
// // // // //         <Button variant="text" className="post-action-btn">
// // // // //           <FaRegPaperPlane className="post-action-icon" /> Send
// // // // //         </Button>
// // // // //       </div>

// // // // //       {showComments && (
// // // // //         <div className="post-comments-section" id={`comments-${id}`}>
// // // // //           <Comments 
// // // // //             postId={id} 
// // // // //             refreshTrigger={commentsRefreshTrigger} 
// // // // //             onNewComment={handleNewComment} 
// // // // //           />
// // // // //         </div>
// // // // //       )}
// // // // //     </Card>
// // // // //   );
// // // // // };

// // // // // export default Post;
// // // // import React, { useState, useContext, useEffect } from 'react';
// // // // import { PostContext } from '../../Context/PostContext';
// // // // import { useAuthContext } from '../../Context/AuthContext';
// // // // import { toast } from 'react-toastify';
// // // // import Card from '../UI/Card';
// // // // import Button from '../UI/Button';
// // // // import Comments from '../Comments/Comments';
// // // // import './post.css';
// // // // import {
// // // //   FaRegThumbsUp,
// // // //   FaRegComment,
// // // //   FaRetweet,
// // // //   FaRegPaperPlane,
// // // //   FaEllipsisH,
// // // //   FaPlay,
// // // //   FaChevronLeft,
// // // //   FaChevronRight,
// // // // } from 'react-icons/fa';
// // // // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // // // const Post = ({ 
// // // //   id, 
// // // //   author, 
// // // //   content, 
// // // //   images = [], 
// // // //   videos = [], 
// // // //   engagement = {}, 
// // // //   timeAgo, 
// // // //   isPromoted,
// // // //   userReaction,
// // // //   onDeletePost,
// // // //   onEditPost
// // // // }) => {
// // // //   const { user } = useAuthContext();
// // // //   const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
// // // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // // //   const [showReactions, setShowReactions] = useState(false);
// // // //   const [isReacting, setIsReacting] = useState(false);
// // // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // // //   const [showComments, setShowComments] = useState(false);
// // // //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// // // //   const [showOptions, setShowOptions] = useState(false);
// // // //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
// // // //   const [showReactionsModal, setShowReactionsModal] = useState(false);
// // // //   const [postReactions, setPostReactions] = useState([]);

// // // //   const allMedia = [
// // // //     ...images.map(url => ({ type: 'image', url })),
// // // //     ...videos.map(url => ({ type: 'video', url }))
// // // //   ];

// // // //   const reactions = [
// // // //     { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
// // // //     { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
// // // //     { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
// // // //     { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
// // // //     { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
// // // //     { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' }
// // // //   ];

// // // //   const handleReactionClick = async (reactionName) => {
// // // //     if (!user) {
// // // //       toast.error('Please log in to react to posts');
// // // //       return;
// // // //     }

// // // //     setIsReacting(true);
// // // //     try {
// // // //       if (userReaction === reactionName) {
// // // //         await handleReaction(id, null);
// // // //       } else if (userReaction) {
// // // //         await handleReaction(id, reactionName);
// // // //       } else {
// // // //         await addReaction(id, reactionName);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Reaction error:', error);
// // // //     } finally {
// // // //       setIsReacting(false);
// // // //       setShowReactions(false);
// // // //     }
// // // //   };

// // // //   const loadPostReactions = async () => {
// // // //     const reactions = await fetchPostReactions(id);
// // // //     setPostReactions(reactions);
// // // //   };

// // // //   const renderMediaItem = (item, index) => {
// // // //     if (item.type === 'image') {
// // // //       return (
// // // //         <img
// // // //           key={index}
// // // //           src={item.url.startsWith('http') ? item.url : `https://facehiringapi.codingster.in/DisplayImages/${item.url}`}
// // // //           alt="Post content"
// // // //           className="post-media"
// // // //           onError={(e) => (e.target.src = defaultProfileFallback)}
// // // //         />
// // // //       );
// // // //     } else {
// // // //       return (
// // // //         <div key={index} className="video-wrapper">
// // // //           {!isVideoPlaying ? (
// // // //             <>
// // // //               <video className="post-media" src={item.url} />
// // // //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// // // //                 <FaPlay />
// // // //               </button>
// // // //             </>
// // // //           ) : (
// // // //             <video
// // // //               controls
// // // //               autoPlay
// // // //               className="post-media"
// // // //               src={item.url}
// // // //               onEnded={() => setIsVideoPlaying(false)}
// // // //             />
// // // //           )}
// // // //         </div>
// // // //       );
// // // //     }
// // // //   };

// // // //   const nextMedia = () => {
// // // //     setCurrentMediaIndex(prev => (prev === allMedia.length - 1 ? 0 : prev + 1));
// // // //     setIsVideoPlaying(false);
// // // //   };

// // // //   const prevMedia = () => {
// // // //     setCurrentMediaIndex(prev => (prev === 0 ? allMedia.length - 1 : prev - 1));
// // // //     setIsVideoPlaying(false);
// // // //   };

// // // //   const toggleComments = () => {
// // // //     if (!user) {
// // // //       toast.error('Please log in to view comments');
// // // //       return;
// // // //     }
// // // //     setShowComments(!showComments);
// // // //   };

// // // //   const handleNewComment = () => {
// // // //     setCommentsRefreshTrigger(prev => !prev);
// // // //     setCommentCount(prev => prev + 1);
// // // //   };

// // // //   return (
// // // //     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
// // // //       <div className="post-header">
// // // //         <div className="post-header-left">
// // // //           <img
// // // //             src={author.avatar || defaultProfileFallback}
// // // //             alt={author.name}
// // // //             className="post-avatar"
// // // //             onError={(e) => (e.target.src = defaultProfileFallback)}
// // // //           />
// // // //           <div className="post-author-info">
// // // //             <h4 className="post-author-name">{author.name}</h4>
// // // //             <p className="post-author-title">{author.title}</p>
// // // //             <span className="post-time">{timeAgo}</span>
// // // //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// // // //           </div>
// // // //         </div>

// // // //         {user?.userId === author.id && (
// // // //           <div className="post-options">
// // // //             <button className="options-btn" onClick={() => setShowOptions(!showOptions)}>
// // // //               <FaEllipsisH />
// // // //             </button>
// // // //             {showOptions && (
// // // //               <div className="options-dropdown">
// // // //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// // // //                 <button onClick={() => onDeletePost(id)}>Delete Post</button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       <div className="post-content">
// // // //         <p>{content}</p>
// // // //       </div>

// // // //       {allMedia.length > 0 && (
// // // //         <div className="post-media-container">
// // // //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// // // //           {allMedia.length > 1 && (
// // // //             <>
// // // //               <button className="carousel-nav prev" onClick={prevMedia}>
// // // //                 <FaChevronLeft />
// // // //               </button>
// // // //               <button className="carousel-nav next" onClick={nextMedia}>
// // // //                 <FaChevronRight />
// // // //               </button>
// // // //               <div className="media-indicators">
// // // //                 {allMedia.map((_, index) => (
// // // //                   <button
// // // //                     key={index}
// // // //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// // // //                     onClick={() => {
// // // //                       setCurrentMediaIndex(index);
// // // //                       setIsVideoPlaying(false);
// // // //                     }}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       <div className="post-stats">
// // // //         {(engagement.likes > 0 || commentCount > 0) && (
// // // //           <div className="stats-container">
// // // //             {engagement.likes > 0 && (
// // // //               <span 
// // // //                 className="stat-item clickable" 
// // // //                 onClick={async () => {
// // // //                   await loadPostReactions();
// // // //                   setShowReactionsModal(true);
// // // //                 }}
// // // //               >
// // // //                 {engagement.likes} {engagement.likes === 1 ? 'like' : 'likes'}
// // // //                 {userReaction && (
// // // //                   <span className="user-reaction-symbol">
// // // //                     {reactions.find(r => r.name === userReaction)?.icon}
// // // //                   </span>
// // // //                 )}
// // // //               </span>
// // // //             )}
// // // //             {commentCount > 0 && (
// // // //               <span className="stat-item clickable" onClick={toggleComments}>
// // // //                 {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
// // // //               </span>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       <div className="post-actions">
// // // //         <div
// // // //           className="reaction-container"
// // // //           onMouseEnter={() => setShowReactions(true)}
// // // //           onMouseLeave={() => setShowReactions(false)}
// // // //         >
// // // //           <button
// // // //             className={`post-action-btn ${userReaction ? 'active-reaction' : ''}`}
// // // //             onClick={() => handleReactionClick(userReaction ? null : 'like')}
// // // //             disabled={isReacting}
// // // //           >
// // // //             {userReaction ? (
// // // //               <>
// // // //                 <span style={{ marginRight: '4px' }}>
// // // //                   {reactions.find(r => r.name === userReaction)?.icon}
// // // //                 </span>
// // // //                 {reactions.find(r => r.name === userReaction)?.label}
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <FaRegThumbsUp /> Like
// // // //               </>
// // // //             )}
// // // //           </button>
// // // //           {showReactions && (
// // // //             <div className="reaction-bar">
// // // //               {reactions.map(reaction => (
// // // //                 <button
// // // //                   key={reaction.name}
// // // //                   className="reaction-button"
// // // //                   onClick={() => handleReactionClick(reaction.name)}
// // // //                   title={reaction.label}
// // // //                   style={{ color: reaction.color }}
// // // //                 >
// // // //                   {reaction.icon}
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //         <button className="post-action-btn" onClick={toggleComments}>
// // // //           <FaRegComment /> Comment
// // // //         </button>
// // // //         <button className="post-action-btn">
// // // //           <FaRetweet /> Repost
// // // //         </button>
// // // //         <button className="post-action-btn">
// // // //           <FaRegPaperPlane /> Send
// // // //         </button>
// // // //       </div>

// // // //       {showComments && (
// // // //         <div className="post-comments-section">
// // // //           <Comments 
// // // //             postId={id} 
// // // //             refreshTrigger={commentsRefreshTrigger} 
// // // //             onNewComment={handleNewComment} 
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {showReactionsModal && (
// // // //         <div className="reactions-modal">
// // // //           <div className="modal-content">
// // // //             <h3>Reactions</h3>
// // // //             <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
// // // //               ×
// // // //             </button>
// // // //             <div className="reactions-list">
// // // //               {postReactions.map(reaction => (
// // // //                 <div key={reaction.id} className="reaction-item">
// // // //                   <img 
// // // //                     src={reaction.user.imageFile || defaultProfileFallback} 
// // // //                     alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
// // // //                     className="reaction-user-avatar"
// // // //                     onError={(e) => (e.target.src = defaultProfileFallback)}
// // // //                   />
// // // //                   <div className="reaction-user-info">
// // // //                     <span>{reaction.user.firstName} {reaction.user.lastName}</span>
// // // //                     <span className="reaction-symbol">{reaction.reactionSymbol}</span>
// // // //                     <span className="reaction-time">{reaction.timeAgo}</span>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default Post;
// // // import React, { useState, useContext } from 'react';
// // // import { PostContext } from '../../Context/PostContext';
// // // import { useAuthContext } from '../../Context/AuthContext';
// // // import { toast } from 'react-toastify';
// // // import Card from '../UI/Card';
// // // import Button from '../UI/Button';
// // // import Comments from '../Comments/Comments';
// // // import './post.css';
// // // import {
// // //   FaRegThumbsUp,
// // //   FaRegComment,
// // //   FaRetweet,
// // //   FaRegPaperPlane,
// // //   FaEllipsisH,
// // //   FaPlay,
// // //   FaChevronLeft,
// // //   FaChevronRight,
// // // } from 'react-icons/fa';
// // // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // // const Post = ({
// // //   id,
// // //   author,
// // //   content,
// // //   images = [],
// // //   videos = [],
// // //   engagement = {},
// // //   timeAgo,
// // //   isPromoted,
// // //   userReaction,
// // //   onDeletePost,
// // //   onEditPost
// // // }) => {
// // //   const { user } = useAuthContext();
// // //   const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
// // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // //   const [showReactionBar, setShowReactionBar] = useState(false);
// // //   const [isReacting, setIsReacting] = useState(false);
// // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // //   const [showComments, setShowComments] = useState(false);
// // //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// // //   const [showOptions, setShowOptions] = useState(false);
// // //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
// // //   const [showReactionsModal, setShowReactionsModal] = useState(false);
// // //   const [postReactions, setPostReactions] = useState([]);

// // //   const allMedia = [
// // //     ...images.map(url => ({ type: 'image', url })),
// // //     ...videos.map(url => ({ type: 'video', url }))
// // //   ];

// // //   const reactions = [
// // //     { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
// // //     { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
// // //     { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
// // //     { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
// // //     { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
// // //     { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' }
// // //   ];


// // //   const handleReactionClick = async (reactionName) => {
// // //     if (!user) {
// // //       toast.error('Please log in to react to posts');
// // //       return;
// // //     }

// // //     setIsReacting(true);
// // //     try {
// // //       if (userReaction === reactionName) {
// // //         // Remove reaction if clicking the same one
// // //         await handleReaction(id, null);
// // //       } else {
// // //         if (userReaction) {
// // //           // Update reaction if different from current
// // //           await handleReaction(id, reactionName);
// // //         } else {
// // //           // Add new reaction
// // //           await addReaction(id, reactionName);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Reaction error:', error);
// // //     } finally {
// // //       setIsReacting(false);
// // //       setShowReactionBar(false);
// // //     }
// // //   };

// // //   const loadPostReactions = async () => {
// // //     const reactions = await fetchPostReactions(id);
// // //     setPostReactions(reactions);
// // //   };

// // //   const renderMediaItem = (item, index) => {
// // //     if (item.type === 'image') {
// // //       return (
// // //         <img
// // //           key={index}
// // //           src={item.url.startsWith('http') ? item.url : `https://facehiringapi.codingster.in/DisplayImages/${item.url}`}
// // //           alt="Post content"
// // //           className="post-media"
// // //           onError={(e) => (e.target.src = defaultProfileFallback)}
// // //         />
// // //       );
// // //     } else {
// // //       return (
// // //         <div key={index} className="video-wrapper">
// // //           {!isVideoPlaying ? (
// // //             <>
// // //               <video className="post-media" src={item.url} />
// // //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// // //                 <FaPlay />
// // //               </button>
// // //             </>
// // //           ) : (
// // //             <video
// // //               controls
// // //               autoPlay
// // //               className="post-media"
// // //               src={item.url}
// // //               onEnded={() => setIsVideoPlaying(false)}
// // //             />
// // //           )}
// // //         </div>
// // //       );
// // //     }
// // //   };

// // //   const nextMedia = () => {
// // //     setCurrentMediaIndex(prev => (prev === allMedia.length - 1 ? 0 : prev + 1));
// // //     setIsVideoPlaying(false);
// // //   };

// // //   const prevMedia = () => {
// // //     setCurrentMediaIndex(prev => (prev === 0 ? allMedia.length - 1 : prev - 1));
// // //     setIsVideoPlaying(false);
// // //   };

// // //   const toggleComments = () => {
// // //     if (!user) {
// // //       toast.error('Please log in to view comments');
// // //       return;
// // //     }
// // //     setShowComments(!showComments);
// // //   };

// // //   const handleNewComment = () => {
// // //     setCommentsRefreshTrigger(prev => !prev);
// // //     setCommentCount(prev => prev + 1);
// // //   };

// // //   return (
// // //     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
// // //       <div className="post-header">
// // //         <div className="post-header-left">
// // //           <img
// // //             src={author.avatar || defaultProfileFallback}
// // //             alt={author.name}
// // //             className="post-avatar"
// // //             onError={(e) => (e.target.src = defaultProfileFallback)}
// // //           />
// // //           <div className="post-author-info">
// // //             <h4 className="post-author-name">{author.name}</h4>
// // //             <p className="post-author-title">{author.title}</p>
// // //             <span className="post-time">{timeAgo}</span>
// // //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// // //           </div>
// // //         </div>

// // //         {user?.userId === author.id && (
// // //           <div className="post-options">
// // //             <button className="options-btn" onClick={() => setShowOptions(!showOptions)}>
// // //               <FaEllipsisH />
// // //             </button>
// // //             {showOptions && (
// // //               <div className="options-dropdown">
// // //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// // //                 <button onClick={() => onDeletePost(id)}>Delete Post</button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="post-content">
// // //         <p>{content}</p>
// // //       </div>

// // //       {allMedia.length > 0 && (
// // //         <div className="post-media-container">
// // //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// // //           {allMedia.length > 1 && (
// // //             <>
// // //               <button className="carousel-nav prev" onClick={prevMedia}>
// // //                 <FaChevronLeft />
// // //               </button>
// // //               <button className="carousel-nav next" onClick={nextMedia}>
// // //                 <FaChevronRight />
// // //               </button>
// // //               <div className="media-indicators">
// // //                 {allMedia.map((_, index) => (
// // //                   <button
// // //                     key={index}
// // //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// // //                     onClick={() => {
// // //                       setCurrentMediaIndex(index);
// // //                       setIsVideoPlaying(false);
// // //                     }}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>
// // //       )}

// // //       <div className="post-stats">
// // //         {(engagement.likes > 0 || commentCount > 0) && (
// // //           <div className="stats-container">
// // //             {engagement.likes > 0 && (
// // //               <span
// // //                 className="stat-item clickable"
// // //                 onClick={async () => {
// // //                   await loadPostReactions();
// // //                   setShowReactionsModal(true);
// // //                 }}
// // //               >
// // //                 {engagement.likes} {engagement.likes === 1 ? 'like' : 'likes'}
// // //                 {userReaction && (
// // //                   <span className="user-reaction-symbol">
// // //                     {reactions.find(r => r.name === userReaction)?.icon}
// // //                   </span>
// // //                 )}
// // //               </span>
// // //             )}
// // //             {commentCount > 0 && (
// // //               <span className="stat-item clickable" onClick={toggleComments}>
// // //                 {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
// // //               </span>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="post-actions">
// // //         <div className="reaction-container">
// // //           <button
// // //             className={`post-action-btn ${userReaction ? 'active-reaction' : ''}`}
// // //             onClick={() => {
// // //               if (userReaction) {
// // //                 // Show reaction bar to change reaction
// // //                 setShowReactionBar(!showReactionBar);
// // //               } else {
// // //                 // Show reaction bar to add reaction
// // //                 setShowReactionBar(true);
// // //               }
// // //             }}
// // //             disabled={isReacting}
// // //           >
// // //             {userReaction ? (
// // //               <>
// // //                 <span style={{ marginRight: '4px' }}>
// // //                   {reactions.find(r => r.name === userReaction)?.icon}
// // //                 </span>
// // //                 {reactions.find(r => r.name === userReaction)?.label}
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <FaRegThumbsUp /> Like
// // //               </>
// // //             )}
// // //           </button>

// // //           {showReactionBar && (
// // //             <div className="reaction-bar">
// // //               {reactions.map(reaction => (
// // //                 <button
// // //                   key={reaction.name}
// // //                   className={`reaction-button ${userReaction === reaction.name ? 'active' : ''}`}
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     handleReactionClick(reaction.name);
// // //                   }}
// // //                   title={reaction.label}
// // //                   style={{ color: reaction.color }}
// // //                 >
// // //                   {reaction.icon}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         <button className="post-action-btn" onClick={toggleComments}>
// // //           <FaRegComment /> Comment
// // //         </button>
// // //         <button className="post-action-btn">
// // //           <FaRetweet /> Repost
// // //         </button>
// // //         <button className="post-action-btn">
// // //           <FaRegPaperPlane /> Send
// // //         </button>
// // //       </div>

// // //       {showComments && (
// // //         <div className="post-comments-section">
// // //           <Comments
// // //             postId={id}
// // //             refreshTrigger={commentsRefreshTrigger}
// // //             onNewComment={handleNewComment}
// // //           />
// // //         </div>
// // //       )}

// // //       {showReactionsModal && (
// // //         <div className="reactions-modal">
// // //           <div className="modal-content">
// // //             <h3>Reactions</h3>
// // //             <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
// // //               ×
// // //             </button>
// // //             <div className="reactions-list">
// // //               {postReactions.map(reaction => (
// // //                 <div key={reaction.id} className="reaction-item">
// // //                   <img
// // //                     src={reaction.user.imageFile || defaultProfileFallback}
// // //                     alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
// // //                     className="reaction-user-avatar"
// // //                     onError={(e) => (e.target.src = defaultProfileFallback)}
// // //                   />
// // //                   <div className="reaction-user-info">
// // //                     <span>{reaction.user.firstName} {reaction.user.lastName}</span>
// // //                     <span className="reaction-symbol">{reaction.reactionSymbol}</span>
// // //                     <span className="reaction-time">{reaction.timeAgo}</span>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </Card>
// // //   );
// // // };

// // // export default Post;
// // // import React, { useState, useContext } from 'react';
// // // import { PostContext } from '../../Context/PostContext';
// // // import { useAuthContext } from '../../Context/AuthContext';
// // // import { toast } from 'react-toastify';
// // // import Card from '../UI/Card';
// // // import Button from '../UI/Button';
// // // import Comments from '../Comments/Comments';
// // // import './post.css';
// // // import {
// // //   FaRegThumbsUp,
// // //   FaRegComment,
// // //   FaRetweet,
// // //   FaRegPaperPlane,
// // //   FaEllipsisH,
// // //   FaPlay,
// // //   FaChevronLeft,
// // //   FaChevronRight,
// // // } from 'react-icons/fa';
// // // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // // const Post = ({
// // //   id,
// // //   author,
// // //   content,
// // //   images = [],
// // //   videos = [],
// // //   engagement = {},
// // //   timeAgo,
// // //   isPromoted,
// // //   userReaction, // This comes from backend
// // //   onDeletePost,
// // //   onEditPost
// // // }) => {
// // //   const { user } = useAuthContext();
// // //   const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
// // //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// // //   const [showReactionBar, setShowReactionBar] = useState(false);
// // //   const [isReacting, setIsReacting] = useState(false);
// // //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// // //   const [showComments, setShowComments] = useState(false);
// // //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// // //   const [showOptions, setShowOptions] = useState(false);
// // //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
// // //   const [showReactionsModal, setShowReactionsModal] = useState(false);
// // //   const [postReactions, setPostReactions] = useState([]);

// // //   const allMedia = [
// // //     ...images.map(url => ({ type: 'image', url })),
// // //     ...videos.map(url => ({ type: 'video', url }))
// // //   ];

// // //   const reactions = [
// // //     { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
// // //     { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
// // //     { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
// // //     { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
// // //     { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
// // //     { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' }
// // //   ];

// // //   const handleReactionClick = async (reactionName) => {
// // //     if (!user) {
// // //       toast.error('Please log in to react to posts');
// // //       return;
// // //     }

// // //     setIsReacting(true);
// // //     try {
// // //       if (userReaction === reactionName) {
// // //         // Remove reaction if clicking the same one
// // //         await handleReaction(id, null);
// // //       } else {
// // //         if (userReaction) {
// // //           // Update reaction if different from current
// // //           await handleReaction(id, reactionName);
// // //         } else {
// // //           // Add new reaction
// // //           await addReaction(id, reactionName);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Reaction error:', error);
// // //       toast.error('Failed to update reaction');
// // //     } finally {
// // //       setIsReacting(false);
// // //       setShowReactionBar(false);
// // //     }
// // //   };

// // //   const loadPostReactions = async () => {
// // //     try {
// // //       const reactions = await fetchPostReactions(id);
// // //       setPostReactions(reactions);
// // //       setShowReactionsModal(true);
// // //     } catch (error) {
// // //       console.error('Error loading reactions:', error);
// // //       toast.error('Failed to load reactions');
// // //     }
// // //   };

// // //   const renderMediaItem = (item, index) => {
// // //     if (item.type === 'image') {
// // //       return (
// // //         <img
// // //           key={index}
// // //           src={item.url.startsWith('http') ? item.url : `https://facehiringapi.codingster.in/DisplayImages/${item.url}`}
// // //           alt="Post content"
// // //           className="post-media"
// // //           onError={(e) => { e.target.src = defaultProfileFallback; }}
// // //         />
// // //       );
// // //     } else {
// // //       return (
// // //         <div key={index} className="video-wrapper">
// // //           {!isVideoPlaying ? (
// // //             <>
// // //               <video className="post-media" src={item.url} />
// // //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// // //                 <FaPlay />
// // //               </button>
// // //             </>
// // //           ) : (
// // //             <video
// // //               controls
// // //               autoPlay
// // //               className="post-media"
// // //               src={item.url}
// // //               onEnded={() => setIsVideoPlaying(false)}
// // //             />
// // //           )}
// // //         </div>
// // //       );
// // //     }
// // //   };

// // //   const nextMedia = () => {
// // //     setCurrentMediaIndex(prev => (prev === allMedia.length - 1 ? 0 : prev + 1));
// // //     setIsVideoPlaying(false);
// // //   };

// // //   const prevMedia = () => {
// // //     setCurrentMediaIndex(prev => (prev === 0 ? allMedia.length - 1 : prev - 1));
// // //     setIsVideoPlaying(false);
// // //   };

// // //   const toggleComments = () => {
// // //     if (!user) {
// // //       toast.error('Please log in to view comments');
// // //       return;
// // //     }
// // //     setShowComments(!showComments);
// // //   };

// // //   const handleNewComment = () => {
// // //     setCommentsRefreshTrigger(prev => !prev);
// // //     setCommentCount(prev => prev + 1);
// // //   };

// // //   return (
// // //     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
// // //       <div className="post-header">
// // //         <div className="post-header-left">
// // //           <img
// // //             src={author.avatar || defaultProfileFallback}
// // //             alt={author.name}
// // //             className="post-avatar"
// // //             onError={(e) => (e.target.src = defaultProfileFallback)}
// // //           />
// // //           <div className="post-author-info">
// // //             <h4 className="post-author-name">{author.name}</h4>
// // //             <p className="post-author-title">{author.title}</p>
// // //             <span className="post-time">{timeAgo}</span>
// // //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// // //           </div>
// // //         </div>

// // //         {user?.userId === author.id && (
// // //           <div className="post-options">
// // //             <button className="options-btn" onClick={() => setShowOptions(!showOptions)}>
// // //               <FaEllipsisH />
// // //             </button>
// // //             {showOptions && (
// // //               <div className="options-dropdown">
// // //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// // //                 <button onClick={() => onDeletePost(id)}>Delete Post</button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="post-content">
// // //         <p>{content}</p>
// // //       </div>

// // //       {allMedia.length > 0 && (
// // //         <div className="post-media-container">
// // //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// // //           {allMedia.length > 1 && (
// // //             <>
// // //               <button className="carousel-nav prev" onClick={prevMedia}>
// // //                 <FaChevronLeft />
// // //               </button>
// // //               <button className="carousel-nav next" onClick={nextMedia}>
// // //                 <FaChevronRight />
// // //               </button>
// // //               <div className="media-indicators">
// // //                 {allMedia.map((_, index) => (
// // //                   <button
// // //                     key={index}
// // //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// // //                     onClick={() => {
// // //                       setCurrentMediaIndex(index);
// // //                       setIsVideoPlaying(false);
// // //                     }}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>
// // //       )}

// // //       <div className="post-stats">
// // //         {(engagement.likes > 0 || commentCount > 0) && (
// // //           <div className="stats-container">
// // //             {engagement.likes > 0 && (
// // //               <span
// // //                 className="stat-item clickable"
// // //                 onClick={loadPostReactions}
// // //               >
// // //                 {engagement.likes} {engagement.likes === 1 ? 'like' : 'likes'}
// // //               </span>
// // //             )}
// // //             {commentCount > 0 && (
// // //               <span className="stat-item clickable" onClick={toggleComments}>
// // //                 {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
// // //               </span>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="post-actions">
// // //         {user ? (
// // //           <div className="reaction-container">
// // //             <button
// // //               className={`post-action-btn ${userReaction ? 'active-reaction' : ''}`}
// // //               onClick={() => {
// // //                 if (userReaction) {
// // //                   setShowReactionBar(!showReactionBar);
// // //                 } else {
// // //                   setShowReactionBar(true);
// // //                 }
// // //               }}
// // //               disabled={isReacting}
// // //             >
// // //               <FaRegThumbsUp /> Like
// // //             </button>

// // //             {/* Show user's current reaction if exists */}
// // //             {userReaction && (
// // //               <div className="current-reaction-display">
// // //                 <span 
// // //                   className="reaction-emoji"
// // //                   style={{ 
// // //                     color: reactions.find(r => r.name === userReaction)?.color 
// // //                   }}
// // //                 >
// // //                   {reactions.find(r => r.name === userReaction)?.icon}
// // //                 </span>
// // //                 <span className="reaction-label">
// // //                   {reactions.find(r => r.name === userReaction)?.label}
// // //                 </span>
// // //               </div>
// // //             )}

// // //             {showReactionBar && (
// // //               <div className="reaction-bar">
// // //                 {reactions.map(reaction => (
// // //                   <button
// // //                     key={reaction.name}
// // //                     className={`reaction-button ${userReaction === reaction.name ? 'active' : ''}`}
// // //                     onClick={(e) => {
// // //                       e.stopPropagation();
// // //                       handleReactionClick(reaction.name);
// // //                     }}
// // //                     title={reaction.label}
// // //                     style={{ color: reaction.color }}
// // //                   >
// // //                     {reaction.icon}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         ) : (
// // //           <button 
// // //             className="post-action-btn login-to-react"
// // //             onClick={() => toast.error('Please log in to react')}
// // //           >
// // //             <FaRegThumbsUp /> Like
// // //           </button>
// // //         )}

// // //         <button className="post-action-btn" onClick={toggleComments}>
// // //           <FaRegComment /> Comment
// // //         </button>
// // //         <button className="post-action-btn">
// // //           <FaRetweet /> Repost
// // //         </button>
// // //         <button className="post-action-btn">
// // //           <FaRegPaperPlane /> Send
// // //         </button>
// // //       </div>

// // //       {showComments && (
// // //         <div className="post-comments-section">
// // //           <Comments
// // //             postId={id}
// // //             refreshTrigger={commentsRefreshTrigger}
// // //             onNewComment={handleNewComment}
// // //           />
// // //         </div>
// // //       )}

// // //       {showReactionsModal && (
// // //         <div className="reactions-modal">
// // //           <div className="modal-content">
// // //             <h3>Reactions</h3>
// // //             <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
// // //               ×
// // //             </button>
// // //             <div className="reactions-list">
// // //               {postReactions.map(reaction => (
// // //                 <div key={reaction.id} className="reaction-item">
// // //                   <img
// // //                     src={reaction.user.imageFile || defaultProfileFallback}
// // //                     alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
// // //                     className="reaction-user-avatar"
// // //                     onError={(e) => (e.target.src = defaultProfileFallback)}
// // //                   />
// // //                   <div className="reaction-user-info">
// // //                     <span>{reaction.user.firstName} {reaction.user.lastName}</span>
// // //                     <span className="reaction-symbol">{reaction.reactionSymbol}</span>
// // //                     <span className="reaction-time">{reaction.timeAgo}</span>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </Card>
// // //   );
// // // };

// // // export default Post;
// // import React, { useState, useContext, useEffect } from 'react';
// // import { PostContext } from '../../Context/PostContext';
// // import { useAuthContext } from '../../Context/AuthContext';
// // import { toast } from 'react-toastify';
// // import Card from '../UI/Card';
// // import Button from '../UI/Button';
// // import Comments from '../Comments/Comments';
// // import './post.css';
// // import {
// //   FaRegThumbsUp,
// //   FaRegComment,
// //   FaRetweet,
// //   FaRegPaperPlane,
// //   FaEllipsisH,
// //   FaPlay,
// //   FaChevronLeft,
// //   FaChevronRight,
// // } from 'react-icons/fa';
// // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// // const Post = ({
// //   id,
// //   author,
// //   content,
// //   images = [],
// //   videos = [],
// //   engagement = {},
// //   timeAgo,
// //   isPromoted,
// //   userReaction,
// //   reactions: initialReactions = [],
// //   onDeletePost,
// //   onEditPost,
// //   loading = false,
// // }) => {
// //   const { user } = useAuthContext();
// //   const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
// //   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
// //   const [showReactionBar, setShowReactionBar] = useState(false);
// //   const [isReacting, setIsReacting] = useState(false);
// //   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
// //   const [showComments, setShowComments] = useState(false);
// //   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
// //   const [showOptions, setShowOptions] = useState(false);
// //   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
// //   const [showReactionsModal, setShowReactionsModal] = useState(false);
// //   const [postReactions, setPostReactions] = useState(initialReactions);
// //   const [currentUserReaction, setCurrentUserReaction] = useState(userReaction || null);
// //   const [isLoading, setIsLoading] = useState(loading);
// //   const [localAuthor, setLocalAuthor] = useState(author);
// //   const { fetchPostWithAuthor } = useContext(PostContext);
// //   const allMedia = [
// //     ...images.map(url => ({ type: 'image', url })),
// //     ...videos.map(url => ({ type: 'video', url }))
// //   ];

// //   const reactions = [
// //     { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
// //     { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
// //     { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
// //     { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
// //     { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
// //     { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' }
// //   ];

// //   useEffect(() => {
// //     // Initialize from props
// //     if (userReaction) {
// //       setCurrentUserReaction(userReaction);
// //     }

// //     // Load reactions if there are any likes
// //     if (engagement.likes > 0) {
// //       loadPostReactions();
// //     }
// //   }, [id, userReaction, engagement.likes]);
// //   const loadPostReactions = async () => {
// //     try {
// //       const response = await fetchPostReactions(id);
// //       if (response?.responseCode === 1) {
// //         setPostReactions(response.data.reactions);
  
// //         // Dynamically update the like count
// //         setCommentCount(response.data.commentCount || commentCount);
  
// //         if (user && response.data.alreadyReacted) {
// //           const reaction = reactions.find(r => r.icon === response.data.reactionSymbol);
// //           if (reaction) {
// //             setCurrentUserReaction({
// //               name: reaction.name,
// //               symbol: reaction.icon
// //             });
// //           }
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error loading reactions:', error);
// //     }
// //   };
  
// //   // const loadPostReactions = async () => {
// //   //   try {
// //   //     const response = await fetchPostReactions(id);
// //   //     if (response?.responseCode === 1) {
// //   //       setPostReactions(response.data.reactions);
// //   //       if (user && response.data.alreadyReacted) {
// //   //         const reaction = reactions.find(r => r.icon === response.data.reactionSymbol);
// //   //         if (reaction) {
// //   //           setCurrentUserReaction({
// //   //             name: reaction.name,
// //   //             symbol: reaction.icon
// //   //           });
// //   //         }
// //   //       }
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Error loading reactions:', error);
// //   //   }
// //   // };

// //   // const handleReactionClick = async (reactionName) => {
// //   //   if (!user) {
// //   //     toast.error('Please log in to react to posts');
// //   //     return;
// //   //   }

// //   //   setIsReacting(true);
// //   //   try {
// //   //     let success = false;
      
// //   //     if (currentUserReaction?.name === reactionName) {
// //   //       // Remove reaction
// //   //       success = await handleReaction(id, null);
// //   //       if (success) {
// //   //         setCurrentUserReaction(null);
// //   //       }
// //   //     } else if (currentUserReaction) {
// //   //       // Update reaction
// //   //       success = await handleReaction(id, reactionName);
// //   //       if (success) {
// //   //         const newReaction = reactions.find(r => r.name === reactionName);
// //   //         setCurrentUserReaction({
// //   //           name: reactionName,
// //   //           symbol: newReaction.icon
// //   //         });
// //   //       }
// //   //     } else {
// //   //       // Add new reaction
// //   //       success = await addReaction(id, reactionName);
// //   //       if (success) {
// //   //         const newReaction = reactions.find(r => r.name === reactionName);
// //   //         setCurrentUserReaction({
// //   //           name: reactionName,
// //   //           symbol: newReaction.icon
// //   //         });
// //   //       }
// //   //     }

// //   //     if (success) {
// //   //       await loadPostReactions();
// //   //     }
// //   //   } catch (error) {
// //   //     toast.error('Failed to update reaction');
// //   //   } finally {
// //   //     setIsReacting(false);
// //   //     setShowReactionBar(false);
// //   //   }
// //   // };
// //   const handleReactionClick = async (reactionName) => {
// //     if (!user) {
// //       toast.error('Please log in to react to posts');
// //       return;
// //     }
  
// //     setIsReacting(true);
// //     try {
// //       let success = false;
  
// //       if (currentUserReaction?.name === reactionName) {
// //         success = await handleReaction(id, null); // remove
// //         if (success) setCurrentUserReaction(null);
// //       } else if (currentUserReaction) {
// //         success = await handleReaction(id, reactionName); // update
// //         if (success) {
// //           const newReaction = reactions.find(r => r.name === reactionName);
// //           setCurrentUserReaction({ name: reactionName, symbol: newReaction.icon });
// //         }
// //       } else {
// //         success = await addReaction(id, reactionName); // new
// //         if (success) {
// //           const newReaction = reactions.find(r => r.name === reactionName);
// //           setCurrentUserReaction({ name: reactionName, symbol: newReaction.icon });
// //         }
// //       }
  
// //       if (success) {
// //         await loadPostReactions(); // ✅ live refresh of modal + count
// //       }
// //     } catch (error) {
// //       toast.error('Failed to update reaction');
// //     } finally {
// //       setIsReacting(false);
// //       setShowReactionBar(false);
// //     }
// //   };
  
// //   const renderMediaItem = (item, index) => {
// //     if (item.type === 'image') {
// //       return (
// //         <img
// //           key={index}
// //           src={item.url.startsWith('http') ? item.url : `${item.url}`}
// //           alt="Post content"
// //           className="post-media"
// //           onError={(e) => { e.target.src = defaultProfileFallback; }}
// //         />
// //       );
// //     } else {
// //       return (
// //         <div key={index} className="video-wrapper">
// //           {!isVideoPlaying ? (
// //             <>
// //               <video className="post-media" src={item.url} />
// //               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
// //                 <FaPlay />
// //               </button>
// //             </>
// //           ) : (
// //             <video
// //               controls
// //               autoPlay
// //               className="post-media"
// //               src={item.url}
// //               onEnded={() => setIsVideoPlaying(false)}
// //             />
// //           )}
// //         </div>
// //       );
// //     }
// //   };

// //   const nextMedia = () => {
// //     setCurrentMediaIndex(prev => (prev === allMedia.length - 1 ? 0 : prev + 1));
// //     setIsVideoPlaying(false);
// //   };

// //   const prevMedia = () => {
// //     setCurrentMediaIndex(prev => (prev === 0 ? allMedia.length - 1 : prev - 1));
// //     setIsVideoPlaying(false);
// //   };

// //   const toggleComments = () => {
// //     if (!user) {
// //       toast.error('Please log in to view comments');
// //       return;
// //     }
// //     setShowComments(!showComments);
// //   };

// //   const handleNewComment = () => {
// //     setCommentsRefreshTrigger(prev => !prev);
// //     setCommentCount(prev => prev + 1);
// //   };
// //   useEffect(() => {
// //     if (!author) {
// //       setIsLoading(true);
// //       fetchPostWithAuthor(id).then(data => {
// //         setLocalAuthor(data?.author || {
// //           name: 'User',
// //           avatar: defaultProfileFallback,
// //           title: 'Member'
// //         });
// //         setIsLoading(false);
// //       });
// //     }
// //   }, [id, author, fetchPostWithAuthor]);


// //   return (
    
// //     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
// //       <div className="post-header">
// //         <div className="post-header-left">
// //           <img
// //             src={author.avatar || defaultProfileFallback}
// //             alt={author.name}
// //             className="post-avatar"
// //             onError={(e) => (e.target.src = defaultProfileFallback)}
// //           />
// //           <div className="post-author-info">
// //             <h4 className="post-author-name">{author.name}</h4>
// //             <p className="post-author-title">{author.title}</p>
// //             <span className="post-time">{timeAgo}</span>
// //             {isPromoted && <span className="promoted-tag">Promoted</span>}
// //           </div>
// //         </div>

// //         {user?.userId === author.id && (
// //           <div className="post-options">
// //             <button className="options-btn" onClick={() => setShowOptions(!showOptions)}>
// //               <FaEllipsisH />
// //             </button>
// //             {showOptions && (
// //               <div className="options-dropdown">
// //                 <button onClick={() => onEditPost(id)}>Edit Post</button>
// //                 <button onClick={() => onDeletePost(id)}>Delete Post</button>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <div className="post-content">
// //         <p>{content}</p>
// //       </div>

// //       {allMedia.length > 0 && (
// //         <div className="post-media-container">
// //           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

// //           {allMedia.length > 1 && (
// //             <>
// //               <button className="carousel-nav prev" onClick={prevMedia}>
// //                 <FaChevronLeft />
// //               </button>
// //               <button className="carousel-nav next" onClick={nextMedia}>
// //                 <FaChevronRight />
// //               </button>
// //               <div className="media-indicators">
// //                 {allMedia.map((_, index) => (
// //                   <button
// //                     key={index}
// //                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
// //                     onClick={() => {
// //                       setCurrentMediaIndex(index);
// //                       setIsVideoPlaying(false);
// //                     }}
// //                   />
// //                 ))}
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       )}

// //       <div className="post-stats">
// //         {(engagement.likes > 0 || commentCount > 0) && (
// //           <div className="stats-container">
// //             {engagement.likes > 0 && (
// //               <div className="likes-display" onClick={() => setShowReactionsModal(true)}>
// //                 <div className="like-icons">
// //                   {postReactions.slice(0, 3).map((reaction, index) => (
// //                     <div key={index} className="like-icon-container">
// //                       <span className="reaction-badge">{reaction.reactionSymbol}</span>
// //                       <img
// //                         src={reaction.user.profileimage || defaultProfileFallback}
// //                         alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
// //                         className={`like-avatar ${index > 0 ? 'stacked' : ''}`}
// //                         onError={(e) => (e.target.src = defaultProfileFallback)}
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <span className="like-text">
// //                   {postReactions[0]?.user.firstName}
// //                   {postReactions.length > 1 && ` and ${postReactions.length - 1} others`}
// //                 </span>
// //               </div>
// //             )}
// //             {commentCount > 0 && (
// //               <span className="stat-item clickable" onClick={toggleComments}>
// //                 {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
// //               </span>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <div className="post-actions">
// //         <div className="reaction-container">
// //           <button
// //             className={`post-action-btn ${currentUserReaction ? 'active-reaction' : ''}`}
// //             onClick={() => {
// //               if (!user) {
// //                 // Show reaction but don't allow interaction
// //                 return;
// //               }
// //               setShowReactionBar(!showReactionBar);
// //             }}
// //             disabled={isReacting}
// //           >
// //             {currentUserReaction ? (
// //               <>
// //                 <span className="reaction-emoji">{currentUserReaction.symbol}</span>
// //                 <span className="reaction-label">
// //                   {reactions.find(r => r.name === currentUserReaction.name)?.label}
// //                 </span>
// //               </>
// //             ) : (
// //               <>
// //                 <FaRegThumbsUp /> Like
// //               </>
// //             )}
// //           </button>

// //           {showReactionBar && user && (
// //             <div className="reaction-bar">
// //               {reactions.map(reaction => (
// //                 <button
// //                   key={reaction.name}
// //                   className={`reaction-button ${currentUserReaction?.name === reaction.name ? 'active' : ''}`}
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handleReactionClick(reaction.name);
// //                   }}
// //                   title={reaction.label}
// //                   style={{ color: reaction.color }}
// //                 >
// //                   {reaction.icon}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <button className="post-action-btn" onClick={toggleComments}>
// //           <FaRegComment /> Comment
// //         </button>
// //         <button className="post-action-btn">
// //           <FaRetweet /> Repost
// //         </button>
// //         <button className="post-action-btn">
// //           <FaRegPaperPlane /> Send
// //         </button>
// //       </div>

// //       {showComments && (
// //         <div className="post-comments-section">
// //           <Comments
// //             postId={id}
// //             refreshTrigger={commentsRefreshTrigger}
// //             onNewComment={handleNewComment}
// //           />
// //         </div>
// //       )}

// //       {showReactionsModal && (
// //         <div className="reactions-modal">
// //           <div className="modal-content">
// //             <h3>Reactions</h3>
// //             <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
// //               ×
// //             </button>
// //             <div className="reactions-list">
// //               {postReactions.map(reaction => (
// //                 <div key={reaction.id} className="reaction-item">
// //                   <img
// //                     src={reaction.user.profileimage || defaultProfileFallback}
// //                     alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
// //                     className="reaction-user-avatar"
// //                     onError={(e) => (e.target.src = defaultProfileFallback)}
// //                   />
// //                   <div className="reaction-user-info">
// //                     <span>{reaction.user.firstName} {reaction.user.lastName}</span>
// //                     <span className="reaction-symbol">{reaction.reactionSymbol}</span>
// //                     <span className="reaction-time">{reaction.timeAgo}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </Card>
// //   );
// // };

// // export default Post;
// import React, { useState, useContext, useEffect } from 'react';
// import { PostContext } from '../../Context/PostContext';
// import { useAuthContext } from '../../Context/AuthContext';
// import { toast } from 'react-toastify';
// import Card from '../UI/Card';
// import Button from '../UI/Button';
// import Comments from '../Comments/Comments';
// import './post.css';
// import {
//   FaRegThumbsUp,
//   FaRegComment,
//   FaRetweet,
//   FaRegPaperPlane,
//   FaEllipsisH,
//   FaPlay,
//   FaChevronLeft,
//   FaChevronRight,
// } from 'react-icons/fa';
// import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

// const Post = ({
//   id,
//   author,
//   content,
//   images = [],
//   videos = [],
//   engagement = {},
//   timeAgo,
//   isPromoted,
//   userReaction,
//   reactions: initialReactions = [],
//   onDeletePost,
//   onEditPost,
//   loading = false,
// }) => {
//   const { user } = useAuthContext();
//   const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
//   const [showReactionBar, setShowReactionBar] = useState(false);
//   const [isReacting, setIsReacting] = useState(false);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [commentCount, setCommentCount] = useState(engagement.comments || 0);
//   const [showOptions, setShowOptions] = useState(false);
//   const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
//   const [showReactionsModal, setShowReactionsModal] = useState(false);
//   const [postReactions, setPostReactions] = useState(initialReactions);
//   const [currentUserReaction, setCurrentUserReaction] = useState(userReaction || null);
//   const [isLoading, setIsLoading] = useState(loading);
//   const [localAuthor, setLocalAuthor] = useState(author);
  
//   const allMedia = [
//     ...images.map(url => ({ type: 'image', url })),
//     ...videos.map(url => ({ type: 'video', url }))
//   ];

//   const reactions = [
//     { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
//     { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
//     { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
//     { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
//     { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
//     { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' }
//   ];

//   const loadPostReactions = async () => {
//     try {
//       const response = await fetchPostReactions(id);
//       if (response?.responseCode === 1) {
//         setPostReactions(response.data.reactions || []);
//         if (response.data.alreadyReacted) {
//           const reaction = reactions.find(r => r.icon === response.data.reactionSymbol);
//           if (reaction) {
//             setCurrentUserReaction({
//               name: reaction.name,
//               symbol: reaction.icon
//             });
//           }
//         } else {
//           setCurrentUserReaction(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading reactions:', error);
//     }
//   };

//   useEffect(() => {
//     if (userReaction) {
//       setCurrentUserReaction(userReaction);
//     }
//     if (engagement.likes > 0) {
//       loadPostReactions();
//     }
//   }, [id, userReaction, engagement.likes]);

//   const handleReactionClick = async (reactionName) => {
//     if (!user) {
//       toast.error('Please log in to react to posts');
//       return;
//     }

//     setIsReacting(true);
//     try {
//       let success = false;

//       if (currentUserReaction?.name === reactionName) {
//         success = await handleReaction(id, null);
//         if (success) {
//           setCurrentUserReaction(null);
//           setPostReactions(prev => prev.filter(r => r.user.userId !== user.userId));
//         }
//       } else if (currentUserReaction) {
//         success = await handleReaction(id, reactionName);
//         if (success) {
//           const newReaction = reactions.find(r => r.name === reactionName);
//           setCurrentUserReaction({
//             name: reactionName,
//             symbol: newReaction.icon
//           });
//         }
//       } else {
//         success = await addReaction(id, reactionName);
//         if (success) {
//           const newReaction = reactions.find(r => r.name === reactionName);
//           setCurrentUserReaction({
//             name: reactionName,
//             symbol: newReaction.icon
//           });
//         }
//       }

//       if (success) {
//         await loadPostReactions();
//       }
//     } catch (error) {
//       toast.error('Failed to update reaction');
//     } finally {
//       setIsReacting(false);
//       setShowReactionBar(false);
//     }
//   };

//   const handleLikeButtonClick = () => {
//     if (currentUserReaction) {
//       handleReactionClick(currentUserReaction.name);
//     } else {
//       setShowReactionBar(true);
//     }
//   };

//   const renderMediaItem = (item, index) => {
//     if (item.type === 'image') {
//       return (
//         <img
//           key={index}
//           src={item.url.startsWith('http') ? item.url : `${item.url}`}
//           alt="Post content"
//           className="post-media"
//           onError={(e) => { e.target.src = defaultProfileFallback; }}
//         />
//       );
//     } else {
//       return (
//         <div key={index} className="video-wrapper">
//           {!isVideoPlaying ? (
//             <>
//               <video className="post-media" src={item.url} />
//               <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
//                 <FaPlay />
//               </button>
//             </>
//           ) : (
//             <video
//               controls
//               autoPlay
//               className="post-media"
//               src={item.url}
//               onEnded={() => setIsVideoPlaying(false)}
//             />
//           )}
//         </div>
//       );
//     }
//   };

//   const nextMedia = () => {
//     setCurrentMediaIndex(prev => (prev === allMedia.length - 1 ? 0 : prev + 1));
//     setIsVideoPlaying(false);
//   };

//   const prevMedia = () => {
//     setCurrentMediaIndex(prev => (prev === 0 ? allMedia.length - 1 : prev - 1));
//     setIsVideoPlaying(false);
//   };

//   const toggleComments = () => {
//     if (!user) {
//       toast.error('Please log in to view comments');
//       return;
//     }
//     setShowComments(!showComments);
//   };

//   const handleNewComment = () => {
//     setCommentsRefreshTrigger(prev => !prev);
//     setCommentCount(prev => prev + 1);
//   };

//   return (
//     <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
//       <div className="post-header">
//         <div className="post-header-left">
//           <img
//             src={author.avatar || defaultProfileFallback}
//             alt={author.name}
//             className="post-avatar"
//             onError={(e) => (e.target.src = defaultProfileFallback)}
//           />
//           <div className="post-author-info">
//             <h4 className="post-author-name">{author.name}</h4>
//             <p className="post-author-title">{author.title}</p>
//             <span className="post-time">{timeAgo}</span>
//             {isPromoted && <span className="promoted-tag">Promoted</span>}
//           </div>
//         </div>

//         {user?.userId === author.id && (
//           <div className="post-options">
//             <button className="options-btn" onClick={() => setShowOptions(!showOptions)}>
//               <FaEllipsisH />
//             </button>
//             {showOptions && (
//               <div className="options-dropdown">
//                 <button onClick={() => onEditPost(id)}>Edit Post</button>
//                 <button onClick={() => onDeletePost(id)}>Delete Post</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="post-content">
//         <p>{content}</p>
//       </div>

//       {allMedia.length > 0 && (
//         <div className="post-media-container">
//           {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

//           {allMedia.length > 1 && (
//             <>
//               <button className="carousel-nav prev" onClick={prevMedia}>
//                 <FaChevronLeft />
//               </button>
//               <button className="carousel-nav next" onClick={nextMedia}>
//                 <FaChevronRight />
//               </button>
//               <div className="media-indicators">
//                 {allMedia.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
//                     onClick={() => {
//                       setCurrentMediaIndex(index);
//                       setIsVideoPlaying(false);
//                     }}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       <div className="post-stats">
//         {(engagement.likes > 0 || commentCount > 0) && (
//           <div className="stats-container">
//             {engagement.likes > 0 && (
//               <div className="likes-display" onClick={() => setShowReactionsModal(true)}>
//                 <div className="like-icons">
//                   {postReactions.slice(0, 3).map((reaction, index) => (
//                     <div key={index} className="like-icon-container">
//                       <span className="reaction-badge">{reaction.reactionSymbol}</span>
//                       <img
//                         src={reaction.user.profileimage || defaultProfileFallback}
//                         alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
//                         className={`like-avatar ${index > 0 ? 'stacked' : ''}`}
//                         onError={(e) => (e.target.src = defaultProfileFallback)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <span className="like-text">
//                   {postReactions[0]?.user.firstName}
//                   {postReactions.length > 1 && ` and ${postReactions.length - 1} others`}
//                 </span>
//               </div>
//             )}
//             {commentCount > 0 && (
//               <span className="stat-item clickable" onClick={toggleComments}>
//                 {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="post-actions">
//         <div 
//           className="reaction-container"
//           onMouseEnter={() => setShowReactionBar(true)}
//           onMouseLeave={() => setShowReactionBar(false)}
//         >
//           <button
//             className={`post-action-btn ${currentUserReaction ? 'active-reaction' : ''}`}
//             onClick={handleLikeButtonClick}
//             disabled={isReacting}
//           >
//             {currentUserReaction ? (
//               <>
//                 <span className="reaction-emoji">{currentUserReaction.symbol}</span>
//                 <span className="reaction-label">
//                   {reactions.find(r => r.name === currentUserReaction.name)?.label}
//                 </span>
//               </>
//             ) : (
//               <>
//                 <FaRegThumbsUp /> Like
//               </>
//             )}
//           </button>

//           {showReactionBar && (
//             <div className="reaction-bar">
//               {reactions.map(reaction => (
//                 <button
//                   key={reaction.name}
//                   className={`reaction-button ${currentUserReaction?.name === reaction.name ? 'active' : ''}`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleReactionClick(reaction.name);
//                   }}
//                   title={reaction.label}
//                   style={{ color: reaction.color }}
//                 >
//                   {reaction.icon}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         <button className="post-action-btn" onClick={toggleComments}>
//           <FaRegComment /> Comment
//         </button>
//         <button className="post-action-btn">
//           <FaRetweet /> Repost
//         </button>
//         <button className="post-action-btn">
//           <FaRegPaperPlane /> Send
//         </button>
//       </div>

//       {showComments && (
//         <div className="post-comments-section">
//           <Comments
//             postId={id}
//             refreshTrigger={commentsRefreshTrigger}
//             onNewComment={handleNewComment}
//           />
//         </div>
//       )}

//       {showReactionsModal && (
//         <div className="reactions-modal">
//           <div className="modal-content">
//             <h3>Reactions</h3>
//             <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
//               ×
//             </button>
//             <div className="reactions-list">
//               {postReactions.map(reaction => (
//                 <div key={reaction.id} className="reaction-item">
//                   <img
//                     src={reaction.user.profileimage || defaultProfileFallback}
//                     alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
//                     className="reaction-user-avatar"
//                     onError={(e) => (e.target.src = defaultProfileFallback)}
//                   />
//                   <div className="reaction-user-info">
//                     <span>{reaction.user.firstName} {reaction.user.lastName}</span>
//                     <span className="reaction-symbol">{reaction.reactionSymbol}</span>
//                     <span className="reaction-time">{reaction.timeAgo}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default Post;
import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from '../../Context/PostContext';
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Comments from '../Comments/Comments';
import './post.css';
import {
  FaRegThumbsUp,
  FaRegComment,
  FaRetweet,
  FaRegPaperPlane,
  FaEllipsisH,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import defaultProfileFallback from '../../Assests/Images/profie.jpeg';

const Post = ({
  id,
  author,
  content,
  images = [],
  videos = [],
  engagement = {},
  timeAgo,
  isPromoted,
  userReaction,
  reactions: initialReactions = [],
  onDeletePost,
  onEditPost,
  loading = false,
}) => {
  const { user } = useAuthContext();
  const { handleReaction, addReaction, fetchPostReactions } = useContext(PostContext);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showReactionBar, setShowReactionBar] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(engagement.comments || 0);
  const [showOptions, setShowOptions] = useState(false);
  const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [postReactions, setPostReactions] = useState(initialReactions);
  const [currentUserReaction, setCurrentUserReaction] = useState(userReaction || null);
  const [isLoading, setIsLoading] = useState(loading);

  const allMedia = [
    ...images.map((url) => ({ type: 'image', url })),
    ...videos.map((url) => ({ type: 'video', url })),
  ];

  const reactions = [
    { name: 'like', icon: '👍', label: 'Like', color: '#0a66c2' },
    { name: 'love', icon: '❤️', label: 'Love', color: '#e02835' },
    { name: 'celebrate', icon: '🎉', label: 'Celebrate', color: '#068139' },
    { name: 'funny', icon: '😂', label: 'Funny', color: '#f28c38' },
    { name: 'insightful', icon: '💡', label: 'Insightful', color: '#f7c948' },
    { name: 'sad', icon: '😢', label: 'Sad', color: '#693896' },
  ];

  const loadPostReactions = async () => {
    try {
      const response = await fetchPostReactions(id);
      if (response?.responseCode === 1) {
        setPostReactions(response.reactions || []);
        if (response.alreadyReacted) {
          const reaction = reactions.find((r) => r.icon === response.reactionSymbol);
          if (reaction) {
            setCurrentUserReaction({
              name: reaction.name,
              symbol: reaction.icon,
            });
          }
        } else {
          setCurrentUserReaction(null);
        }
      }
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  };

  useEffect(() => {
    if (userReaction) {
      setCurrentUserReaction(userReaction);
    }
    if (engagement.likes > 0) {
      loadPostReactions();
    }
  }, [id, userReaction, engagement.likes]);

  const handleReactionClick = async (reactionName) => {
    if (!user) {
      toast.error('Please log in to react to posts');
      return;
    }

    setIsReacting(true);
    try {
      let success = false;

      if (currentUserReaction?.name === reactionName) {
        // Remove reaction
        success = await handleReaction(id, null);
        if (success) {
          setCurrentUserReaction(null);
          setPostReactions((prev) => prev.filter((r) => r.user.userId !== user.userId));
        }
      } else {
        // Add or update reaction
        success = currentUserReaction
          ? await handleReaction(id, reactionName)
          : await addReaction(id, reactionName);
        if (success) {
          const newReaction = reactions.find((r) => r.name === reactionName);
          setCurrentUserReaction({
            name: reactionName,
            symbol: newReaction.icon,
          });
          // Update reactions list
          setPostReactions((prev) => {
            const updatedReactions = prev.filter((r) => r.user.userId !== user.userId);
            return [
              ...updatedReactions,
              {
                reactionSymbol: newReaction.icon,
                user: {
                  userId: user.userId,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  profileimage: user.imageFile,
                },
                timeAgo: 'just now',
              },
            ];
          });
        }
      }

      if (success) {
        await loadPostReactions();
      }
    } catch (error) {
      toast.error('Failed to update reaction');
    } finally {
      setIsReacting(false);
      setShowReactionBar(false);
    }
  };

  const handleLikeButtonClick = () => {
    if (currentUserReaction) {
      handleReactionClick(currentUserReaction.name);
    } else {
      setShowReactionBar(true);
    }
  };

  const renderMediaItem = (item, index) => {
    if (item.type === 'image') {
      return (
        <img
          key={index}
          src={item.url.startsWith('http') ? item.url : `${item.url}`}
          alt="Post content"
          className="post-media"
          onError={(e) => {
            e.target.src = defaultProfileFallback;
          }}
        />
      );
    } else {
      return (
        <div key={index} className="video-wrapper">
          {!isVideoPlaying ? (
            <>
              <video className="post-media" src={item.url} />
              <button className="play-button" onClick={() => setIsVideoPlaying(true)}>
                <FaPlay />
              </button>
            </>
          ) : (
            <video
              controls
              autoPlay
              className="post-media"
              src={item.url}
              onEnded={() => setIsVideoPlaying(false)}
            />
          )}
        </div>
      );
    }
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
    setIsVideoPlaying(false);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
    setIsVideoPlaying(false);
  };

  const toggleComments = () => {
    if (!user) {
      toast.error('Please log in to view comments');
      return;
    }
    setShowComments(!showComments);
  };

  const handleNewComment = () => {
    setCommentsRefreshTrigger((prev) => !prev);
    setCommentCount((prev) => prev + 1);
  };

  return (
    <Card className={`linkedin-post ${isPromoted ? 'promoted-post' : ''}`}>
      <div className="post-header">
        <div className="post-header-left">
          <img
            src={author.avatar || defaultProfileFallback}
            alt={author.name}
            className="post-avatar"
            onError={(e) => (e.target.src = defaultProfileFallback)}
          />
          <div className="post-author-info">
            <h4 className="post-author-name">{author.name}</h4>
            <p className="post-author-title">{author.title}</p>
            <span className="post-time">{timeAgo}</span>
            {isPromoted && <span className="promoted-tag">Promoted</span>}
          </div>
        </div>

        {user?.userId === author.id && (
          <div className="post-options">
            <button className="options-btn" onClick={() => setShowOptions(!showOptions)}>
              <FaEllipsisH />
            </button>
            {showOptions && (
              <div className="options-dropdown">
                <button onClick={() => onEditPost(id)}>Edit Post</button>
                <button onClick={() => onDeletePost(id)}>Delete Post</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      {allMedia.length > 0 && (
        <div className="post-media-container">
          {renderMediaItem(allMedia[currentMediaIndex], currentMediaIndex)}

          {allMedia.length > 1 && (
            <>
              <button className="carousel-nav prev" onClick={prevMedia}>
                <FaChevronLeft />
              </button>
              <button className="carousel-nav next" onClick={nextMedia}>
                <FaChevronRight />
              </button>
              <div className="media-indicators">
                {allMedia.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentMediaIndex(index);
                      setIsVideoPlaying(false);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="post-stats">
        {(engagement.likes > 0 || commentCount > 0) && (
          <div className="stats-container">
            {engagement.likes > 0 && (
              <div className="likes-display" onClick={() => setShowReactionsModal(true)}>
                <div className="like-icons">
                  {postReactions.slice(0, 3).map((reaction, index) => (
                    <div key={index} className="like-icon-container">
                      <span className="reaction-badge">{reaction.reactionSymbol}</span>
                      <img
                        src={reaction.user.profileimage || defaultProfileFallback}
                        alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
                        className={`like-avatar ${index > 0 ? 'stacked' : ''}`}
                        onError={(e) => (e.target.src = defaultProfileFallback)}
                      />
                    </div>
                  ))}
                </div>
                <span className="like-text">
                  {postReactions[0]?.user.firstName}
                  {postReactions.length > 1 && ` and ${postReactions.length - 1} others`}
                </span>
              </div>
            )}
            {commentCount > 0 && (
              <span className="stat-item clickable" onClick={toggleComments}>
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="post-actions">
        <div
          className="reaction-container"
          onMouseEnter={() => setShowReactionBar(true)}
          onMouseLeave={() => setShowReactionBar(false)}
        >
          <button
            className={`post-action-btn ${currentUserReaction ? 'active-reaction' : ''}`}
            onClick={handleLikeButtonClick}
            disabled={isReacting}
          >
            {currentUserReaction ? (
              <>
                <span className="reaction-emoji">{currentUserReaction.symbol}</span>
                <span className="reaction-label">
                  {reactions.find((r) => r.name === currentUserReaction.name)?.label}
                </span>
              </>
            ) : (
              <>
                <FaRegThumbsUp /> Like
              </>
            )}
          </button>

          {showReactionBar && (
            <div className="reaction-bar">
              {reactions.map((reaction) => (
                <button
                  key={reaction.name}
                  className={`reaction-button ${currentUserReaction?.name === reaction.name ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReactionClick(reaction.name);
                  }}
                  title={reaction.label}
                  style={{ color: reaction.color }}
                >
                  {reaction.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="post-action-btn" onClick={toggleComments}>
          <FaRegComment /> Comment
        </button>
        <button className="post-action-btn">
          <FaRetweet /> Repost
        </button>
        <button className="post-action-btn">
          <FaRegPaperPlane /> Send
        </button>
      </div>

      {showComments && (
        <div className="post-comments-section">
          <Comments
            postId={id}
            refreshTrigger={commentsRefreshTrigger}
            onNewComment={handleNewComment}
          />
        </div>
      )}

      {showReactionsModal && (
        <div className="reactions-modal">
          <div className="modal-content">
            <h3>Reactions</h3>
            <button className="close-modal" onClick={() => setShowReactionsModal(false)}>
              ×
            </button>
            <div className="reactions-list">
              {postReactions.map((reaction) => (
                <div key={reaction.id} className="reaction-item">
                  <img
                    src={reaction.user.profileimage || defaultProfileFallback}
                    alt={`${reaction.user.firstName} ${reaction.user.lastName}`}
                    className="reaction-user-avatar"
                    onError={(e) => (e.target.src = defaultProfileFallback)}
                  />
                  <div className="reaction-user-info">
                    <span>
                      {reaction.user.firstName} {reaction.user.lastName}
                    </span>
                    <span className="reaction-symbol">{reaction.reactionSymbol}</span>
                    <span className="reaction-time">{reaction.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;