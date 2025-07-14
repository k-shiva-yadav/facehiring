// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useAuthContext } from '../../Context/AuthContext';
// // import { toast } from 'react-toastify';
// // import axios from 'axios';
// // import './comments.css';
// // import defaultProfileFallback from '../../Assests/Images/profie.jpeg';
// // import { FaEllipsisH, FaRegThumbsUp, FaThumbsUp, FaReply, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
// // import { MdSend } from 'react-icons/md';

// // const Comment = ({
// //   comment,
// //   level = 0,
// //   onLike,
// //   onReply,
// //   onUpdate,
// //   onDelete,
// //   onEditReply,
// //   onDeleteReply,
// //   currentUserId,
// //   isReply = false
// // }) => {
// //   const { user } = useAuthContext();
// //   const [replyText, setReplyText] = useState('');
// //   const [showReplyInput, setShowReplyInput] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedText, setEditedText] = useState(isReply ? comment.repliedComment || comment.replyText : comment.comment);
// //   const [showReplies, setShowReplies] = useState(false);
// //   const [showOptions, setShowOptions] = useState(false);
// //   const [isLiking, setIsLiking] = useState(false);

// //   // Replies are already included in the comment object
// //   const replies = comment.replies || [];

// //   const handleShowReplies = () => {
// //     setShowReplies(!showReplies);
// //   };

// //   const handleUpdate = async () => {
// //     if (!editedText.trim()) {
// //       toast.error('Comment cannot be empty');
// //       return;
// //     }

// //     try {
// //       if (isReply) {
// //         await onEditReply(comment.id || comment.replyId, editedText);
// //       } else {
// //         await onUpdate(comment.commentId, editedText);
// //       }
// //       setIsEditing(false);
// //     } catch (error) {
// //       console.error('Update error:', error);
// //       toast.error('Failed to update comment');
// //     }
// //   };

// //   const handleDelete = async () => {
// //     const idToDelete = isReply ? (comment.id || comment.replyId) : comment.commentId;
// //     if (!idToDelete) {
// //       console.error('No comment ID available', comment);
// //       toast.error('Cannot delete - missing comment ID');
// //       return;
// //     }

// //     if (window.confirm('Are you sure you want to delete this comment?')) {
// //       try {
// //         if (isReply) {
// //           await onDeleteReply(idToDelete);
// //         } else {
// //           await onDelete(comment.commentId);
// //         }
// //       } catch (error) {
// //         console.error('Delete error:', error);
// //         toast.error('Failed to delete comment');
// //       }
// //     }
// //   };

// //   const handleReplySubmit = async () => {
// //     if (!replyText.trim()) {
// //       toast.error('Reply cannot be empty');
// //       return;
// //     }
    
// //     try {
// //       const success = await onReply(comment.commentId, replyText);
// //       if (success) {
// //         setReplyText('');
// //         setShowReplyInput(false);
// //         setShowReplies(true);
// //       }
// //     } catch (error) {
// //       console.error('Reply error:', error);
// //       toast.error('Failed to post reply');
// //     }
// //   };

// //   const handleLike = async () => {
// //     if (isLiking) return;
// //     setIsLiking(true);
// //     try {
// //       await onLike(isReply ? (comment.id || comment.replyId) : comment.commentId);
// //     } catch (error) {
// //       console.error('Like error:', error);
// //     } finally {
// //       setIsLiking(false);
// //     }
// //   };

// //   const userData = isReply ? comment.user : comment.user;
// //   const commentText = isReply ? comment.repliedComment || comment.replyText : comment.comment;
// //   const likeCount = comment.likeCount || 0;
// //   const isLiked = comment.isLiked || false;
// //   const replyCount = replies.length;

// //   return (
// //     <div className={`linkedin-comment ${level > 0 ? 'reply' : ''}`} style={{ marginLeft: level * 20 }}>
// //       <div className="comment-header">
// //         <img
// //           src={userData?.profileImage || userData?.imageFile || defaultProfileFallback}
// //           alt={userData?.fullName}
// //           className="comment-avatar"
// //           onError={(e) => (e.target.src = defaultProfileFallback)}
// //         />
// //         <div className="comment-content-container">
// //           <div className="comment-author-info">
// //             <h4 className="comment-author-name">{userData?.fullName || 'Anonymous'}</h4>
// //             <p className="comment-time">{comment.timeAgo || 'Just now'}</p>
// //           </div>

// //           {!isEditing ? (
// //             <div className="comment-text">{commentText}</div>
// //           ) : (
// //             <div className="edit-comment-container">
// //               <input
// //                 type="text"
// //                 value={editedText}
// //                 onChange={(e) => setEditedText(e.target.value)}
// //                 className="edit-comment-input"
// //                 autoFocus
// //               />
// //               <div className="edit-comment-actions">
// //                 <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
// //                   Cancel
// //                 </button>
// //                 <button className="save-edit-btn" onClick={handleUpdate}>
// //                   Save
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="comment-actions">
// //             <button 
// //               className={`comment-action-btn like-btn ${isLiked ? 'liked' : ''}`}
// //               onClick={handleLike}
// //               disabled={isLiking}
// //             >
// //               {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
// //               <span>{likeCount}</span>
// //             </button>
            
// //             {!isReply && (
// //               <button 
// //                 className="comment-action-btn reply-btn" 
// //                 onClick={() => setShowReplyInput(!showReplyInput)}
// //               >
// //                 <FaReply /> Reply
// //               </button>
// //             )}

// //             {(userData?.userId === currentUserId || userData?.id === currentUserId) && (
// //               <div className="comment-options">
// //                 <button 
// //                   className="options-btn" 
// //                   onClick={() => setShowOptions(!showOptions)}
// //                 >
// //                   <FaEllipsisH />
// //                 </button>
// //                 {showOptions && (
// //                   <div className="options-dropdown">
// //                     <button onClick={() => setIsEditing(true)}>
// //                       <FaRegEdit /> Edit
// //                     </button>
// //                     <button onClick={handleDelete}>
// //                       <FaTrashAlt /> Delete
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {!isReply && replyCount > 0 && (
// //             <button className="view-replies-btn" onClick={handleShowReplies}>
// //               {showReplies ? 'Hide replies' : `View ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
// //             </button>
// //           )}

// //           {!isReply && showReplyInput && (
// //             <div className="reply-input-container">
// //               <img
// //                 src={user?.avatar || defaultProfileFallback}
// //                 alt="Your profile"
// //                 className="comment-avatar"
// //               />
// //               <div className="reply-input-wrapper">
// //                 <input
// //                   type="text"
// //                   value={replyText}
// //                   onChange={(e) => setReplyText(e.target.value)}
// //                   placeholder="Add a reply..."
// //                   className="reply-input"
// //                   onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
// //                 />
// //                 <button
// //                   className="reply-post-btn"
// //                   onClick={handleReplySubmit}
// //                   disabled={!replyText.trim()}
// //                 >
// //                   <MdSend />
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {!isReply && showReplies && (
// //         <div className="replies-container">
// //           {replies.length > 0 ? (
// //             replies.map((reply) => (
// //               <Comment
// //                 key={reply.id || reply.replyId}
// //                 comment={reply}
// //                 level={level + 1}
// //                 onLike={onLike}
// //                 onReply={onReply}
// //                 onUpdate={onUpdate}
// //                 onDelete={onDelete}
// //                 onEditReply={onEditReply}
// //                 onDeleteReply={onDeleteReply}
// //                 currentUserId={currentUserId}
// //                 isReply={true}
// //               />
// //             ))
// //           ) : (
// //             <div className="no-replies">No replies yet</div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const Comments = ({ postId, refreshTrigger, onNewComment }) => {
// //   const { user } = useAuthContext();
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [newComment, setNewComment] = useState('');
// //   const [isPosting, setIsPosting] = useState(false);

// //   const fetchComments = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         `https://facehiringapi.codingster.in/Post/GetAllPostComments/${postId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //           },
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         setComments(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error('Fetch comments error:', error);
// //       toast.error('Failed to load comments');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [postId]);

// //   const handleCommentSubmit = async () => {
// //     if (!newComment.trim()) {
// //       toast.error('Comment cannot be empty');
// //       return;
// //     }

// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       toast.error('Please log in to post a comment');
// //       return;
// //     }

// //     setIsPosting(true);
// //     try {
// //       const response = await axios.post(
// //         'https://facehiringapi.codingster.in/Post/CreatePostComment',
// //         {
// //           id: user?.userId,
// //           postId: postId,
// //           comment: newComment,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         setNewComment('');
// //         toast.success('Comment posted!');
// //         onNewComment();
// //         fetchComments();
// //       }
// //     } catch (error) {
// //       console.error('Comment error:', error);
// //       toast.error(error.response?.data?.message || 'Failed to post comment');
// //     } finally {
// //       setIsPosting(false);
// //     }
// //   };

// //   const handleLikeComment = async (commentId) => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       toast.error('Please log in to like comments');
// //       return;
// //     }

// //     try {
// //       await axios.post(
// //         'https://facehiringapi.codingster.in/Post/LikeComment',
// //         { commentId, userId: user?.userId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       fetchComments();
// //     } catch (error) {
// //       console.error('Like error:', error);
// //       toast.error('Failed to like comment');
// //     }
// //   };

// //   const handleReplySubmit = async (commentId, replyText) => {
// //     const token = localStorage.getItem('token');
// //     if (!token || !replyText.trim()) {
// //       toast.error('Please log in and enter a reply');
// //       return false;
// //     }

// //     try {
// //       const response = await axios.post(
// //         'https://facehiringapi.codingster.in/Post/CreateCommentReplies',
// //         {
// //           id: user?.userId,
// //           commentId: commentId,
// //           repliedBy: user?.userId,
// //           postId: postId,
// //           repliedComment: replyText
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         toast.success('Reply posted!');
// //         fetchComments();
// //         return true;
// //       }
// //       return false;
// //     } catch (error) {
// //       console.error('Reply error:', error);
// //       toast.error('Failed to post reply');
// //       return false;
// //     }
// //   };

// //   const handleUpdateComment = async (commentId, newText) => {
// //     try {
// //       const response = await axios.post(
// //         `https://facehiringapi.codingster.in/Post/UpdatePostComment/${commentId}`,
// //         { comment: newText },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         toast.success('Comment updated!');
// //         fetchComments();
// //       }
// //     } catch (error) {
// //       console.error('Update error:', error);
// //       toast.error('Failed to update comment');
// //     }
// //   };

// //   const handleDeleteComment = async (commentId) => {
// //     if (!commentId) {
// //       toast.error('Invalid comment ID');
// //       return;
// //     }

// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       toast.error('Please log in to delete comments');
// //       return;
// //     }

// //     try {
// //       const response = await axios.delete(
// //         `https://facehiringapi.codingster.in/Post/DeletePostComment/${commentId}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         toast.success('Comment deleted!');
// //         fetchComments();
// //       } else {
// //         toast.error(response.data?.message || 'Failed to delete comment');
// //       }
// //     } catch (error) {
// //       console.error('Delete error:', error);
// //       if (error.response?.status === 401) {
// //         toast.error('Session expired. Please log in again.');
// //       } else {
// //         toast.error('Failed to delete comment');
// //       }
// //     }
// //   };

// //   const handleEditReply = async (replyId, newText) => {
// //     try {
// //       const response = await axios.post(
// //         `https://facehiringapi.codingster.in/Post/EditCommentReply?id=${replyId}`,
// //         { comment: newText },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         toast.success('Reply updated!');
// //         fetchComments();
// //       }
// //     } catch (error) {
// //       console.error('Update reply error:', error);
// //       toast.error('Failed to update reply');
// //     }
// //   };

// //   const handleDeleteReply = async (replyId) => {
// //     if (!replyId) {
// //       console.error('Delete failed - no reply ID');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `https://facehiringapi.codingster.in/Post/DeleteCommentReply?id=${replyId}`,
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('token')}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (response.data?.responseCode === 1) {
// //         toast.success('Reply deleted!');
// //         fetchComments();
// //       }
// //     } catch (error) {
// //       console.error('Delete error:', error);
// //       toast.error('Failed to delete reply');
// //     }
// //   };

// //   useEffect(() => {
// //     fetchComments();
// //   }, [postId, refreshTrigger, fetchComments]);

// //   return (
// //     <div className="linkedin-comments-section">
// //       <div className="comment-input-container">
// //         <img
// //           src={user?.avatar || defaultProfileFallback}
// //           alt="Your profile"
// //           className="comment-avatar"
// //           onError={(e) => (e.target.src = defaultProfileFallback)}
// //         />
// //         <div className="comment-input-wrapper">
// //           <input
// //             type="text"
// //             value={newComment}
// //             onChange={(e) => setNewComment(e.target.value)}
// //             placeholder="Add a comment..."
// //             className="comment-input"
// //             onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
// //           />
// //           <button
// //             className="comment-post-btn"
// //             onClick={handleCommentSubmit}
// //             disabled={!newComment.trim() || isPosting}
// //           >
// //             {isPosting ? 'Posting...' : 'Post'}
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="loading-comments">
// //           <div className="spinner"></div> Loading comments...
// //         </div>
// //       ) : comments.length > 0 ? (
// //         <div className="comments-list">
// //           {comments.map((comment) => (
// //             <Comment
// //               key={comment.commentId}
// //               comment={comment}
// //               level={0}
// //               onLike={handleLikeComment}
// //               onReply={handleReplySubmit}
// //               onUpdate={handleUpdateComment}
// //               onDelete={handleDeleteComment}
// //               onEditReply={handleEditReply}
// //               onDeleteReply={handleDeleteReply}
// //               currentUserId={user?.userId}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="no-comments">No comments yet. Be the first to comment!</div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Comments;
// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuthContext } from '../../Context/AuthContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import './comments.css';
// import defaultProfileFallback from '../../Assests/Images/profie.jpeg';
// import { FaEllipsisH, FaRegThumbsUp, FaThumbsUp, FaReply, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
// import { MdSend } from 'react-icons/md';

// const Comment = ({
//   comment,
//   level = 0,
//   onLike,
//   onReply,
//   onUpdate,
//   onDelete,
//   onEditReply,
//   onDeleteReply,
//   currentUserId,
//   isReply = false
// }) => {
//   const { user } = useAuthContext();
//   const [replyText, setReplyText] = useState('');
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(isReply ? comment.repliedComment || comment.replyText : comment.comment);
//   const [showReplies, setShowReplies] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);

//   const replies = comment.replies || [];

//   const handleShowReplies = () => {
//     setShowReplies(!showReplies);
//   };

//   const handleUpdate = async () => {
//     if (!editedText.trim()) {
//       toast.error('Comment cannot be empty');
//       return;
//     }

//     try {
//       if (isReply) {
//         await onEditReply(comment.id || comment.replyId, editedText);
//       } else {
//         await onUpdate(comment.commentId, editedText);
//       }
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Update error:', error);
//       toast.error('Failed to update comment');
//     }
//   };

//   const handleDelete = async () => {
//     const idToDelete = isReply ? (comment.id || comment.replyId) : comment.commentId;
//     if (!idToDelete) {
//       console.error('No comment ID available', comment);
//       toast.error('Cannot delete - missing comment ID');
//       return;
//     }

//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       try {
//         if (isReply) {
//           await onDeleteReply(idToDelete);
//         } else {
//           await onDelete(comment.commentId);
//         }
//       } catch (error) {
//         console.error('Delete error:', error);
//         toast.error('Failed to delete comment');
//       }
//     }
//   };

//   const handleReplySubmit = async () => {
//     if (!replyText.trim()) {
//       toast.error('Reply cannot be empty');
//       return;
//     }
    
//     try {
//       const success = await onReply(comment.commentId, replyText);
//       if (success) {
//         setReplyText('');
//         setShowReplyInput(false);
//         setShowReplies(true);
//       }
//     } catch (error) {
//       console.error('Reply error:', error);
//       toast.error('Failed to post reply');
//     }
//   };

//   const handleLike = async () => {
//     if (isLiking) return;
//     setIsLiking(true);
//     try {
//       await onLike(isReply ? (comment.id || comment.replyId) : comment.commentId);
//     } catch (error) {
//       console.error('Like error:', error);
//     } finally {
//       setIsLiking(false);
//     }
//   };

//   const userData = isReply ? comment.user : comment.user;
//   const commentText = isReply ? comment.repliedComment || comment.replyText : comment.comment;
//   const likeCount = comment.likeCount || 0;
//   const isLiked = comment.isLiked || false;
//   const replyCount = replies.length;

//   return (
//     <div className={`linkedin-comment ${level > 0 ? 'reply' : ''}`} style={{ marginLeft: level * 20 }}>
//       <div className="comment-header">
//         <img
//           src={userData?.profileImage || userData?.imageFile || defaultProfileFallback}
//           alt={userData?.fullName}
//           className="comment-avatar"
//           onError={(e) => (e.target.src = defaultProfileFallback)}
//         />
//         <div className="comment-content-container">
//           <div className="comment-author-info">
//             <h4 className="comment-author-name">{userData?.fullName || 'Anonymous'}</h4>
//             <p className="comment-time">{comment.timeAgo || 'Just now'}</p>
//           </div>

//           {!isEditing ? (
//             <div className="comment-text">{commentText}</div>
//           ) : (
//             <div className="edit-comment-container">
//               <input
//                 type="text"
//                 value={editedText}
//                 onChange={(e) => setEditedText(e.target.value)}
//                 className="edit-comment-input"
//                 autoFocus
//               />
//               <div className="edit-comment-actions">
//                 <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </button>
//                 <button className="save-edit-btn" onClick={handleUpdate}>
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="comment-actions">
//             <button 
//               className={`comment-action-btn like-btn ${isLiked ? 'liked' : ''}`}
//               onClick={handleLike}
//               disabled={isLiking}
//             >
//               {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
//               <span>{likeCount}</span>
//             </button>
            
//             {!isReply && (
//               <button 
//                 className="comment-action-btn reply-btn" 
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//               >
//                 <FaReply /> Reply
//               </button>
//             )}

//             {(userData?.userId === currentUserId || userData?.id === currentUserId) && (
//               <div className="comment-options">
//                 <button 
//                   className="options-btn" 
//                   onClick={() => setShowOptions(!showOptions)}
//                 >
//                   <FaEllipsisH />
//                 </button>
//                 {showOptions && (
//                   <div className="options-dropdown">
//                     <button onClick={() => setIsEditing(true)}>
//                       <FaRegEdit /> Edit
//                     </button>
//                     <button onClick={handleDelete}>
//                       <FaTrashAlt /> Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {!isReply && replyCount > 0 && (
//             <button className="view-replies-btn" onClick={handleShowReplies}>
//               {showReplies ? 'Hide replies' : `View ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
//             </button>
//           )}

//           {!isReply && showReplyInput && (
//             <div className="reply-input-container">
//               <img
//                 src={user?.avatar || defaultProfileFallback}
//                 alt="Your profile"
//                 className="comment-avatar"
//               />
//               <div className="reply-input-wrapper">
//                 <input
//                   type="text"
//                   value={replyText}
//                   onChange={(e) => setReplyText(e.target.value)}
//                   placeholder="Add a reply..."
//                   className="reply-input"
//                   onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
//                 />
//                 <button
//                   className="reply-post-btn"
//                   onClick={handleReplySubmit}
//                   disabled={!replyText.trim()}
//                 >
//                   <MdSend />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {!isReply && showReplies && (
//         <div className="replies-container">
//           {replies.length > 0 ? (
//             replies.map((reply) => (
//               <Comment
//                 key={reply.id || reply.replyId}
//                 comment={reply}
//                 level={level + 1}
//                 onLike={onLike}
//                 onReply={onReply}
//                 onUpdate={onUpdate}
//                 onDelete={onDelete}
//                 onEditReply={onEditReply}
//                 onDeleteReply={onDeleteReply}
//                 currentUserId={currentUserId}
//                 isReply={true}
//               />
//             ))
//           ) : (
//             <div className="no-replies">No replies yet</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const Comments = ({ postId, refreshTrigger, onNewComment }) => {
//   const { user } = useAuthContext();
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newComment, setNewComment] = useState('');
//   const [isPosting, setIsPosting] = useState(false);

//   const fetchComments = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://facehiringapi.codingster.in/Post/GetAllPostComments/${postId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         setComments(response.data.data || []);
//       }
//     } catch (error) {
//       console.error('Fetch comments error:', error);
//       toast.error('Failed to load comments');
//     } finally {
//       setLoading(false);
//     }
//   }, [postId]);

//   const handleCommentSubmit = async () => {
//     if (!newComment.trim()) {
//       toast.error('Comment cannot be empty');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please log in to post a comment');
//       return;
//     }

//     setIsPosting(true);
//     try {
//       const response = await axios.post(
//         'https://facehiringapi.codingster.in/Post/CreatePostComment',
//         {
//           id: user?.userId,
//           postId: postId,
//           comment: newComment,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         setNewComment('');
//         toast.success('Comment posted!');
//         onNewComment();
//         fetchComments();
//       }
//     } catch (error) {
//       console.error('Comment error:', error);
//       toast.error(error.response?.data?.message || 'Failed to post comment');
//     } finally {
//       setIsPosting(false);
//     }
//   };

//   const handleLikeComment = async (commentId) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please log in to like comments');
//       return;
//     }

//     try {
//       await axios.post(
//         'https://facehiringapi.codingster.in/Post/LikeComment',
//         { commentId, userId: user?.userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchComments();
//     } catch (error) {
//       console.error('Like error:', error);
//       toast.error('Failed to like comment');
//     }
//   };

//   const handleReplySubmit = async (commentId, replyText) => {
//     const token = localStorage.getItem('token');
//     if (!token || !replyText.trim()) {
//       toast.error('Please log in and enter a reply');
//       return false;
//     }

//     try {
//       const response = await axios.post(
//         'https://facehiringapi.codingster.in/Post/CreateCommentReplies',
//         {
//           id: user?.userId,
//           commentId: commentId,
//           repliedBy: user?.userId,
//           postId: postId,
//           repliedComment: replyText
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         toast.success('Reply posted!');
//         fetchComments();
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Reply error:', error);
//       toast.error('Failed to post reply');
//       return false;
//     }
//   };

//   const handleUpdateComment = async (commentId, newText) => {
//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/Post/UpdatePostComment/${commentId}`,
//         { comment: newText },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         toast.success('Comment updated!');
//         fetchComments();
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       toast.error('Failed to update comment');
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!commentId) {
//       toast.error('Invalid comment ID');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Please log in to delete comments');
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `https://facehiringapi.codingster.in/Post/DeletePostComment/${commentId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         toast.success('Comment deleted!');
//         fetchComments();
//       } else {
//         toast.error(response.data?.message || 'Failed to delete comment');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please log in again.');
//       } else {
//         toast.error('Failed to delete comment');
//       }
//     }
//   };

//   const handleEditReply = async (replyId, newText) => {
//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/Post/EditCommentReply?id=${replyId}`,
//         { comment: newText },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         toast.success('Reply updated!');
//         fetchComments();
//       }
//     } catch (error) {
//       console.error('Update reply error:', error);
//       toast.error('Failed to update reply');
//     }
//   };

//   const handleDeleteReply = async (replyId) => {
//     if (!replyId) {
//       console.error('Delete failed - no reply ID');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/Post/DeleteCommentReply?id=${replyId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data?.responseCode === 1) {
//         toast.success('Reply deleted!');
//         fetchComments();
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Failed to delete reply');
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postId, refreshTrigger, fetchComments]);

//   return (
//     <div className="linkedin-comments-section">
//       <div className="comment-input-container">
//         <img
//           src={user?.avatar || defaultProfileFallback}
//           alt="Your profile"
//           className="comment-avatar"
//           onError={(e) => (e.target.src = defaultProfileFallback)}
//         />
//         <div className="comment-input-wrapper">
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="comment-input"
//             onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
//           />
//           <button
//             className="comment-post-btn"
//             onClick={handleCommentSubmit}
//             disabled={!newComment.trim() || isPosting}
//           >
//             {isPosting ? 'Posting...' : 'Post'}
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading-comments">
//           <div className="spinner"></div> Loading comments...
//         </div>
//       ) : comments.length > 0 ? (
//         <div className="comments-list">
//           {comments.map((comment) => (
//             <Comment
//               key={comment.commentId}
//               comment={comment}
//               level={0}
//               onLike={handleLikeComment}
//               onReply={handleReplySubmit}
//               onUpdate={handleUpdateComment}
//               onDelete={handleDeleteComment}
//               onEditReply={handleEditReply}
//               onDeleteReply={handleDeleteReply}
//               currentUserId={user?.userId}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="no-comments">No comments yet. Be the first to comment!</div>
//       )}
//     </div>
//   );
// };

// export default Comments;
import React, { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './comments.css';
import defaultProfileFallback from '../../Assests/Images/profie.jpeg';
import { 
  FaEllipsisH, 
  FaRegThumbsUp, 
  FaThumbsUp, 
  FaReply, 
  FaRegEdit, 
  FaTrashAlt,
  FaSmile
} from 'react-icons/fa';
import { MdSend } from 'react-icons/md';

// Reaction types with emojis
const REACTIONS = [
  { name: 'like', emoji: '👍', label: 'Like', color: '#0a66c2' },
  { name: 'love', emoji: '❤️', label: 'Love', color: '#e02835' },
  { name: 'celebrate', emoji: '🎉', label: 'Celebrate', color: '#068139' },
  { name: 'funny', emoji: '😂', label: 'Funny', color: '#f28c38' },
  { name: 'insightful', emoji: '💡', label: 'Insightful', color: '#f7c948' },
  { name: 'sad', emoji: '😢', label: 'Sad', color: '#693896' }
];

const Comment = ({
  comment,
  level = 0,
  onLike,
  onReply,
  onUpdate,
  onDelete,
  onEditReply,
  onDeleteReply,
  currentUserId,
  isReply = false
}) => {
  const { user } = useAuthContext();
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(isReply ? comment.repliedComment || comment.replyText : comment.comment);
  const [showReplies, setShowReplies] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showReactionsModal, setShowReactionsModal] = useState(false);
  const [commentReactions, setCommentReactions] = useState(comment.reactions || []);

  const replies = comment.replies || [];

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleUpdate = async () => {
    if (!editedText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      if (isReply) {
        await onEditReply(comment.id || comment.replyId, editedText);
      } else {
        await onUpdate(comment.commentId, editedText);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update comment');
    }
  };

  const handleDelete = async () => {
    const idToDelete = isReply ? (comment.id || comment.replyId) : comment.commentId;
    if (!idToDelete) {
      console.error('No comment ID available', comment);
      toast.error('Cannot delete - missing comment ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        if (isReply) {
          await onDeleteReply(idToDelete);
        } else {
          await onDelete(comment.commentId);
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete comment');
      }
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }
    
    try {
      const success = await onReply(comment.commentId, replyText);
      if (success) {
        setReplyText('');
        setShowReplyInput(false);
        setShowReplies(true);
      }
    } catch (error) {
      console.error('Reply error:', error);
      toast.error('Failed to post reply');
    }
  };

  const handleReaction = async (reactionName) => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const updatedReactions = await onLike(
        isReply ? (comment.id || comment.replyId) : comment.commentId,
        reactionName
      );
      setCommentReactions(updatedReactions);
    } catch (error) {
      console.error('Reaction error:', error);
    } finally {
      setIsLiking(false);
      setShowReactions(false);
    }
  };

  const userData = isReply ? comment.user : comment.user;
  const commentText = isReply ? comment.repliedComment || comment.replyText : comment.comment;
  const likeCount = comment.likeCount || 0;
  const isLiked = comment.isLiked || false;
  const userReaction = comment.userReaction;
  const replyCount = replies.length;

  return (
    <div className={`linkedin-comment ${level > 0 ? 'reply' : ''}`} style={{ marginLeft: level * 20 }}>
      <div className="comment-header">
        <img
          src={userData?.profileImage || userData?.imageFile || defaultProfileFallback}
          alt={userData?.fullName}
          className="comment-avatar"
          onError={(e) => (e.target.src = defaultProfileFallback)}
        />
        <div className="comment-content-container">
          <div className="comment-author-info">
            <h4 className="comment-author-name">{userData?.fullName || 'Anonymous'}</h4>
            <p className="comment-time">{comment.timeAgo || 'Just now'}</p>
          </div>

          {!isEditing ? (
            <div className="comment-text">{commentText}</div>
          ) : (
            <div className="edit-comment-container">
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="edit-comment-input"
                autoFocus
              />
              <div className="edit-comment-actions">
                <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="save-edit-btn" onClick={handleUpdate}>
                  Save
                </button>
              </div>
            </div>
          )}

          <div className="comment-actions">
            <div className="reaction-container">
              <button 
                className={`comment-action-btn like-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => handleReaction(userReaction?.name === 'like' ? null : 'like')}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
                disabled={isLiking}
              >
                {userReaction ? (
                  <span className="reaction-emoji">
                    {REACTIONS.find(r => r.name === userReaction.name)?.emoji || '👍'}
                  </span>
                ) : (
                  <FaRegThumbsUp />
                )}
                <span>{likeCount > 0 ? likeCount : ''}</span>
              </button>
              
              {showReactions && (
                <div 
                  className="reaction-bar"
                  onMouseEnter={() => setShowReactions(true)}
                  onMouseLeave={() => setShowReactions(false)}
                >
                  {REACTIONS.map(reaction => (
                    <button
                      key={reaction.name}
                      className={`reaction-button ${userReaction?.name === reaction.name ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReaction(reaction.name);
                      }}
                      title={reaction.label}
                      style={{ color: reaction.color }}
                    >
                      {reaction.emoji}
                    </button>
                  ))}
                </div>
              )}
              
              {likeCount > 0 && (
                <button 
                  className="reactions-count-btn" 
                  onClick={() => setShowReactionsModal(true)}
                >
                  {likeCount}
                </button>
              )}
            </div>
            
            {!isReply && (
              <button 
                className="comment-action-btn reply-btn" 
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                <FaReply /> Reply
              </button>
            )}

            {(userData?.userId === currentUserId || userData?.id === currentUserId) && (
              <div className="comment-options">
                <button 
                  className="options-btn" 
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <FaEllipsisH />
                </button>
                {showOptions && (
                  <div className="options-dropdown">
                    <button onClick={() => setIsEditing(true)}>
                      <FaRegEdit /> Edit
                    </button>
                    <button onClick={handleDelete}>
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {!isReply && replyCount > 0 && (
            <button className="view-replies-btn" onClick={handleShowReplies}>
              {showReplies ? 'Hide replies' : `View ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
            </button>
          )}

          {!isReply && showReplyInput && (
            <div className="reply-input-container">
              <img
                src={user?.avatar || defaultProfileFallback}
                alt="Your profile"
                className="comment-avatar"
              />
              <div className="reply-input-wrapper">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Add a reply..."
                  className="reply-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
                />
                <button
                  className="reply-post-btn"
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                >
                  <MdSend />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isReply && showReplies && (
        <div className="replies-container">
          {replies.length > 0 ? (
            replies.map((reply) => (
              <Comment
                key={reply.id || reply.replyId}
                comment={reply}
                level={level + 1}
                onLike={onLike}
                onReply={onReply}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onEditReply={onEditReply}
                onDeleteReply={onDeleteReply}
                currentUserId={currentUserId}
                isReply={true}
              />
            ))
          ) : (
            <div className="no-replies">No replies yet</div>
          )}
        </div>
      )}

      {showReactionsModal && (
        <div className="reactions-modal">
          <div className="modal-content">
            <h3>Reactions</h3>
            <button 
              className="close-modal" 
              onClick={() => setShowReactionsModal(false)}
            >
              ×
            </button>
            <div className="reactions-list">
              {commentReactions.length > 0 ? (
                commentReactions.map(reaction => (
                  <div key={reaction.userId} className="reaction-item">
                    <img
                      src={reaction.user?.profileImage || defaultProfileFallback}
                      alt={reaction.user?.fullName}
                      className="reaction-user-avatar"
                      onError={(e) => (e.target.src = defaultProfileFallback)}
                    />
                    <div className="reaction-user-info">
                      <span>{reaction.user?.fullName || 'User'}</span>
                      <span className="reaction-symbol">
                        {REACTIONS.find(r => r.name === reaction.reactionName)?.emoji || '👍'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reactions">No reactions yet</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Comments = ({ postId, refreshTrigger, onNewComment }) => {
  const { user } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://facehiringapi.codingster.in/Post/GetAllPostComments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data?.responseCode === 1) {
        // Format comments with reactions data
        const formattedComments = response.data.data.map(comment => ({
          ...comment,
          reactions: comment.reactions || [],
          userReaction: comment.userReaction || null
        }));
        setComments(formattedComments);
      }
    } catch (error) {
      console.error('Fetch comments error:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to post a comment');
      return;
    }

    setIsPosting(true);
    try {
      const response = await axios.post(
        'https://facehiringapi.codingster.in/Post/CreatePostComment',
        {
          id: user?.userId,
          postId: postId,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.responseCode === 1) {
        setNewComment('');
        toast.success('Comment posted!');
        onNewComment();
        fetchComments();
      }
    } catch (error) {
      console.error('Comment error:', error);
      toast.error(error.response?.data?.message || 'Failed to post comment');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLikeComment = async (commentId, reactionName) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to react to comments');
      return [];
    }

    try {
      let response;
      
      if (reactionName === null) {
        // Remove reaction
        response = await axios.delete(
          `https://facehiringapi.codingster.in/Post/DeleteCommentReaction/${commentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Add/update reaction
        response = await axios.post(
          `https://facehiringapi.codingster.in/Post/ReactToComment/${commentId}`,
          { reactionName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data?.responseCode === 1) {
        // Fetch updated reactions
        const reactionsResponse = await axios.get(
          `https://facehiringapi.codingster.in/Post/GetCommentReactions/${commentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (reactionsResponse.data?.responseCode === 1) {
          fetchComments(); // Refresh comments to update counts
          return reactionsResponse.data.data || [];
        }
      }
      return [];
    } catch (error) {
      console.error('Reaction error:', error);
      toast.error('Failed to update reaction');
      return [];
    }
  };

  const handleReplySubmit = async (commentId, replyText) => {
    const token = localStorage.getItem('token');
    if (!token || !replyText.trim()) {
      toast.error('Please log in and enter a reply');
      return false;
    }

    try {
      const response = await axios.post(
        'https://facehiringapi.codingster.in/Post/CreateCommentReplies',
        {
          id: user?.userId,
          commentId: commentId,
          repliedBy: user?.userId,
          postId: postId,
          repliedComment: replyText
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.responseCode === 1) {
        toast.success('Reply posted!');
        fetchComments();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Reply error:', error);
      toast.error('Failed to post reply');
      return false;
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/Post/UpdatePostComment/${commentId}`,
        { comment: newText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.responseCode === 1) {
        toast.success('Comment updated!');
        fetchComments();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      toast.error('Invalid comment ID');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to delete comments');
      return;
    }

    try {
      const response = await axios.delete(
        `https://facehiringapi.codingster.in/Post/DeletePostComment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.responseCode === 1) {
        toast.success('Comment deleted!');
        fetchComments();
      } else {
        toast.error(response.data?.message || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error('Failed to delete comment');
      }
    }
  };

  const handleEditReply = async (replyId, newText) => {
    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/Post/EditCommentReply?id=${replyId}`,
        { comment: newText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.responseCode === 1) {
        toast.success('Reply updated!');
        fetchComments();
      }
    } catch (error) {
      console.error('Update reply error:', error);
      toast.error('Failed to update reply');
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!replyId) {
      console.error('Delete failed - no reply ID');
      return;
    }

    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/Post/DeleteCommentReply?id=${replyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.responseCode === 1) {
        toast.success('Reply deleted!');
        fetchComments();
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete reply');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, refreshTrigger, fetchComments]);

  return (
    <div className="linkedin-comments-section">
      <div className="comment-input-container">
        <img
          src={user?.avatar || defaultProfileFallback}
          alt="Your profile"
          className="comment-avatar"
          onError={(e) => (e.target.src = defaultProfileFallback)}
        />
        <div className="comment-input-wrapper">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
            onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
          />
          <button
            className="comment-post-btn"
            onClick={handleCommentSubmit}
            disabled={!newComment.trim() || isPosting}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-comments">
          <div className="spinner"></div> Loading comments...
        </div>
      ) : comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              level={0}
              onLike={handleLikeComment}
              onReply={handleReplySubmit}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
              onEditReply={handleEditReply}
              onDeleteReply={handleDeleteReply}
              currentUserId={user?.userId}
            />
          ))}
        </div>
      ) : (
        <div className="no-comments">No comments yet. Be the first to comment!</div>
      )}
    </div>
  );
};

export default Comments;