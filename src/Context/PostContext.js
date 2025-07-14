// // // import React, { createContext, useState, useEffect, useCallback } from 'react';
// // // import axios from 'axios';
// // // import { useAuthContext } from './AuthContext';
// // // import { toast } from 'react-toastify';

// // // export const PostContext = createContext();

// // // export const PostProvider = ({ children }) => {
// // //   const { user } = useAuthContext();
// // //   const [posts, setPosts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const formatTimeAgo = (dateString) => {
// // //     const postDate = new Date(dateString);
// // //     const now = new Date();
// // //     const diffInSeconds = Math.floor((now - postDate) / 1000);

// // //     if (diffInSeconds < 60) return 'just now';
// // //     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
// // //     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
// // //     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
// // //     return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// // //   };

// // //   const fetchPosts = useCallback(async () => {
// // //     try {
// // //       const response = await axios.get('https://facehiringapi.codingster.in/Post/Get_All_Posts', {
// // //         headers: {
// // //           Authorization: `Bearer ${localStorage.getItem('token')}`,
// // //         },
// // //       });
// // //       console.log("Fetched posts:", response.data);
// // //       if (response.data?.responseCode === 1) {
// // //         const postsWithReactions = await Promise.all(
// // //           response.data.data.map(async (post) => {
// // //             let reactions = [];
// // //             let currentUserReaction = null;
            
// // //             try {
// // //               const res = await axios.get(
// // //                 `https://facehiringapi.codingster.in/Post/GetPostLikes/${post.id}`,
// // //                 { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// // //               );
// // //               if (res.data?.responseCode === 1) {
// // //                 reactions = res.data.data.reactions;
// // //                 if (res.data.data.alreadyReacted) {
// // //                   currentUserReaction = {
// // //                     symbol: res.data.data.reactionSymbol,
// // //                     name: Object.entries({
// // //                       like: '👍',
// // //                       love: '❤️',
// // //                       celebrate: '🎉',
// // //                       funny: '😂',
// // //                       insightful: '💡',
// // //                       sad: '😢'
// // //                     }).find(([_, v]) => v === res.data.data.reactionSymbol)?.[0] || 'like'
// // //                   };
// // //                 }
// // //               }
// // //             } catch (error) {
// // //               console.error('Error fetching reactions:', error);
// // //             }

// // //             return {
// // //               id: post.id,
// // //               author: {
// // //                 id: post.userId,
// // //                 name: post.userName,
// // //                 avatar: post.userAvatar,
// // //                 title: post.designation || 'Member'
// // //               },
// // //               content: post.description,
// // //               images: (post.imageUrls || []).filter(url => url && url.trim() !== ''),
// // //               videos: (post.videoUrls || []).filter(url => url && url.trim() !== ''),
// // //               engagement: {
// // //                 likes: post.likeCount || 0,
// // //                 comments: post.commentCount || 0,
// // //                 reposts: post.repostCount || 0
// // //               },
// // //               timeAgo: formatTimeAgo(post.createdOn),
// // //               isPromoted: post.isPromoted || false,
// // //               userReaction: currentUserReaction,
// // //               reactions
// // //             };
// // //           })
// // //         );
// // //         setPosts(postsWithReactions);
// // //       }
// // //     } catch (error) {
// // //       setError(error.message);
// // //       toast.error('Failed to load posts');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   const handleReaction = async (postId, reactionName) => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       let response;

// // //       if (reactionName === null) {
// // //         response = await axios.delete(
// // //           `https://facehiringapi.codingster.in/Post/DeleteReactToPost/${postId}`,
// // //           { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //       } else {
// // //         response = await axios.post(
// // //           `https://facehiringapi.codingster.in/Post/UpdateReactToPost/${postId}?reactionText=${reactionName}`,
// // //           {},
// // //           { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //       }

// // //       if (response.data.responseCode === 1) {
// // //         setPosts(prev => prev.map(post => {
// // //           if (post.id === postId) {
// // //             const likeChange = reactionName === null ? -1 : (!post.userReaction ? 1 : 0);
// // //             return {
// // //               ...post,
// // //               engagement: {
// // //                 ...post.engagement,
// // //                 likes: post.engagement.likes + likeChange
// // //               },
// // //               userReaction: reactionName ? {
// // //                 name: reactionName,
// // //                 symbol: {
// // //                   like: '👍',
// // //                   love: '❤️',
// // //                   celebrate: '🎉',
// // //                   funny: '😂',
// // //                   insightful: '💡',
// // //                   sad: '😢'
// // //                 }[reactionName]
// // //               } : null
// // //             };
// // //           }
// // //           return post;
// // //         }));
// // //         return true;
// // //       }
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || 'Failed to update reaction');
// // //       return false;
// // //     }
// // //   };

// // //   const addReaction = async (postId, reactionName) => {
// // //     try {
// // //       const response = await axios.post(
// // //         `https://facehiringapi.codingster.in/Post/React_To_Post/${postId}?reactionText=${reactionName}`,
// // //         {},
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// // //       );

// // //       if (response.data.responseCode === 1) {
// // //         setPosts(prev => prev.map(post => {
// // //           if (post.id === postId) {
// // //             return {
// // //               ...post,
// // //               engagement: {
// // //                 ...post.engagement,
// // //                 likes: post.engagement.likes + 1
// // //               },
// // //               userReaction: {
// // //                 name: reactionName,
// // //                 symbol: {
// // //                   like: '👍',
// // //                   love: '❤️',
// // //                   celebrate: '🎉',
// // //                   funny: '😂',
// // //                   insightful: '💡',
// // //                   sad: '😢'
// // //                 }[reactionName]
// // //               }
// // //             };
// // //           }
// // //           return post;
// // //         }));
// // //         return true;
// // //       }
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || 'Failed to add reaction');
// // //       return false;
// // //     }
// // //   };

// // //   const fetchPostReactions = async (postId) => {
// // //     try {
// // //       const response = await axios.get(
// // //         `https://facehiringapi.codingster.in/Post/GetPostLikes/${postId}`,
// // //         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// // //       );
// // //       return response.data?.data || { reactions: [], alreadyReacted: false };
// // //     } catch (error) {
// // //       console.error('Error fetching reactions:', error);
// // //       return { reactions: [], alreadyReacted: false };
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchPosts();
// // //   }, [fetchPosts]);

// // //   return (
// // //     <PostContext.Provider value={{
// // //       posts,
// // //       loading,
// // //       error,
// // //       fetchPosts,
// // //       handleReaction,
// // //       addReaction,
// // //       fetchPostReactions
// // //     }}>
// // //       {children}
// // //     </PostContext.Provider>
// // //   );
// // // };
// // import React, { createContext, useState, useEffect, useCallback } from 'react';
// // import axios from 'axios';
// // import { useAuthContext } from './AuthContext';
// // import { toast } from 'react-toastify';

// // export const PostContext = createContext();

// // export const PostProvider = ({ children }) => {
// //   const { user } = useAuthContext();
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const formatTimeAgo = (dateString) => {
// //     const postDate = new Date(dateString);
// //     const now = new Date();
// //     const diffInSeconds = Math.floor((now - postDate) / 1000);

// //     if (diffInSeconds < 60) return 'just now';
// //     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
// //     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
// //     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
// //     return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// //   };

// //   const fetchPosts = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get('https://facehiringapi.codingster.in/Post/Get_All_Posts', {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem('token')}`,
// //         },
// //       });

// //       if (response.data?.responseCode === 1) {
// //         const postsWithReactions = await Promise.all(
// //           response.data.data.map(async (post) => {
// //             let reactions = [];
// //             let currentUserReaction = null;

// //             try {
// //               const res = await axios.get(
// //                 `https://facehiringapi.codingster.in/Post/GetPostLikes/${post.id}`,
// //                 { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// //               );
// //               if (res.data?.responseCode === 1) {
// //                 reactions = res.data.data.reactions;
// //                 if (res.data.data.alreadyReacted) {
// //                   currentUserReaction = {
// //                     symbol: res.data.data.reactionSymbol,
// //                     name: Object.entries({
// //                       like: '👍',
// //                       love: '❤️',
// //                       celebrate: '🎉',
// //                       funny: '😂',
// //                       insightful: '💡',
// //                       sad: '😢'
// //                     }).find(([_, v]) => v === res.data.data.reactionSymbol)?.[0] || 'like'
// //                   };
// //                 }
// //               }
// //             } catch (error) {
// //               console.error('Error fetching reactions:', error);
// //             }

// //             return {
// //               id: post.id,
// //               content: post.description,
// //               images: (post.imageUrls || []).filter(url => url?.trim() !== ''),
// //               videos: (post.videoUrls || []).filter(url => url?.trim() !== ''),
// //               engagement: {
// //                 likes: post.likeCount || 0,
// //                 comments: post.commentCount || 0,
// //                 reposts: post.repostCount || 0
// //               },
// //               timeAgo: formatTimeAgo(post.createdOn),
// //               isPromoted: post.isPromoted || false,
// //               userReaction: currentUserReaction,
// //               reactions,
// //               author: {
// //                 name: post.userName,
// //                 title: post.designation || '',
// //                 avatar: post.profileimage || '',
// //                 id: post.userId || post.id
// //               }
// //             };
// //           })
// //         );
// //         setPosts(postsWithReactions);
// //       }
// //     } catch (error) {
// //       setError(error.message);
// //       toast.error('Failed to load posts');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const handleReaction = async (postId, reactionName) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       let response;

// //       if (reactionName === null) {
// //         response = await axios.delete(
// //           `https://facehiringapi.codingster.in/Post/DeleteReactToPost/${postId}`,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //       } else {
// //         response = await axios.post(
// //           `https://facehiringapi.codingster.in/Post/UpdateReactToPost/${postId}?reactionText=${reactionName}`,
// //           {},
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //       }

// //       if (response.data.responseCode === 1) {
// //         setPosts(prev => prev.map(post => {
// //           if (post.id === postId) {
// //             const likeChange = reactionName === null ? -1 : (!post.userReaction ? 1 : 0);
// //             return {
// //               ...post,
// //               engagement: {
// //                 ...post.engagement,
// //                 likes: post.engagement.likes + likeChange
// //               },
// //               userReaction: reactionName ? {
// //                 name: reactionName,
// //                 symbol: {
// //                   like: '👍',
// //                   love: '❤️',
// //                   celebrate: '🎉',
// //                   funny: '😂',
// //                   insightful: '💡',
// //                   sad: '😢'
// //                 }[reactionName]
// //               } : null
// //             };
// //           }
// //           return post;
// //         }));
// //         return true;
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'Failed to update reaction');
// //       return false;
// //     }
// //   };

// //   const addReaction = async (postId, reactionName) => {
// //     try {
// //       const response = await axios.post(
// //         `https://facehiringapi.codingster.in/Post/React_To_Post/${postId}?reactionText=${reactionName}`,
// //         {},
// //         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// //       );

// //       if (response.data.responseCode === 1) {
// //         setPosts(prev => prev.map(post => {
// //           if (post.id === postId) {
// //             return {
// //               ...post,
// //               engagement: {
// //                 ...post.engagement,
// //                 likes: post.engagement.likes + 1
// //               },
// //               userReaction: {
// //                 name: reactionName,
// //                 symbol: {
// //                   like: '👍',
// //                   love: '❤️',
// //                   celebrate: '🎉',
// //                   funny: '😂',
// //                   insightful: '💡',
// //                   sad: '😢'
// //                 }[reactionName]
// //               }
// //             };
// //           }
// //           return post;
// //         }));
// //         return true;
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'Failed to add reaction');
// //       return false;
// //     }
// //   };

// //   const fetchPostReactions = async (postId) => {
// //     try {
// //       const response = await axios.get(
// //         `https://facehiringapi.codingster.in/Post/GetPostLikes/${postId}`,
// //         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// //       );
// //       return response.data?.data || { reactions: [], alreadyReacted: false };
// //     } catch (error) {
// //       console.error('Error fetching reactions:', error);
// //       return { reactions: [], alreadyReacted: false };
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, [fetchPosts]);

// //   return (
// //     <PostContext.Provider value={{
// //       posts,
// //       loading,
// //       error,
// //       fetchPosts,
// //       handleReaction,
// //       addReaction,
// //       fetchPostReactions
// //     }}>
// //       {children}
// //     </PostContext.Provider>
// //   );
// // };
// import React, { createContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuthContext } from './AuthContext';
// import { toast } from 'react-toastify';

// export const PostContext = createContext();

// export const PostProvider = ({ children }) => {
//   const { user } = useAuthContext();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const formatTimeAgo = (dateString) => {
//     const postDate = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - postDate) / 1000);

//     if (diffInSeconds < 60) return 'just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
//     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
//     return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://facehiringapi.codingster.in/Post/Get_All_Posts', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (response.data?.responseCode === 1) {
//         const postsWithReactions = await Promise.all(
//           response.data.data.map(async (post) => {
//             let reactions = [];
//             let currentUserReaction = null;

//             try {
//               const res = await axios.get(
//                 `https://facehiringapi.codingster.in/Post/GetPostLikes/${post.id}`,
//                 { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//               );
//               if (res.data?.responseCode === 1) {
//                 reactions = res.data.data.reactions || [];
//                 if (res.data.data.alreadyReacted) {
//                   currentUserReaction = {
//                     symbol: res.data.data.reactionSymbol,
//                     name: Object.entries({
//                       like: '👍',
//                       love: '❤️',
//                       celebrate: '🎉',
//                       funny: '😂',
//                       insightful: '💡',
//                       sad: '😢'
//                     }).find(([_, v]) => v === res.data.data.reactionSymbol)?.[0] || 'like'
//                   };
//                 }
//               }
//             } catch (error) {
//               console.error('Error fetching reactions:', error);
//             }

//             return {
//               id: post.id,
//               content: post.description,
//               images: (post.imageUrls || []).filter(url => url?.trim() !== ''),
//               videos: (post.videoUrls || []).filter(url => url?.trim() !== ''),
//               engagement: {
//                 likes: post.likeCount || 0,
//                 comments: post.commentCount || 0,
//                 reposts: post.repostCount || 0
//               },
//               timeAgo: formatTimeAgo(post.createdOn),
//               isPromoted: post.isPromoted || false,
//               userReaction: currentUserReaction,
//               reactions,
//               author: {
//                 name: post.userName,
//                 title: post.designation || '',
//                 avatar: post.profileimage || '',
//                 id: post.userId || post.id
//               }
//             };
//           })
//         );
//         setPosts(postsWithReactions);
//       }
//     } catch (error) {
//       setError(error.message);
//       toast.error('Failed to load posts');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleReaction = async (postId, reactionName) => {
//     try {
//       const token = localStorage.getItem('token');
//       let response;
// debugger
//       if (reactionName === null) {
//         response = await axios.post(
//           `https://facehiringapi.codingster.in/Post/ReactToPost/${postId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         response = await axios.post(
//           `https://facehiringapi.codingster.in/Post/UpdateReactToPost/${postId}?reactionText=${reactionName}`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       if (response.data.responseCode === 1) {
//         setPosts(prev => prev.map(post => {
//           if (post.id === postId) {
//             const isRemoving = reactionName === null;
//             const isNewReaction = !post.userReaction;
//             const isUpdating = post.userReaction && !isRemoving;

//             return {
//               ...post,
//               engagement: {
//                 ...post.engagement,
//                 likes: isRemoving ? post.engagement.likes - 1 : 
//                        isNewReaction ? post.engagement.likes + 1 : 
//                        post.engagement.likes
//               },
//               userReaction: isRemoving ? null : {
//                 name: reactionName,
//                 symbol: {
//                   like: '👍',
//                   love: '❤️',
//                   celebrate: '🎉',
//                   funny: '😂',
//                   insightful: '💡',
//                   sad: '😢'
//                 }[reactionName]
//               }
//             };
//           }
//           return post;
//         }));
//         return true;
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to update reaction');
//       return false;
//     }
//   };

//   const addReaction = async (postId, reactionName) => {
//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/Post/React_To_Post/${postId}?reactionText=${reactionName}`,
//         {},
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );

//       if (response.data.responseCode === 1) {
//         setPosts(prev => prev.map(post => {
//           if (post.id === postId) {
//             return {
//               ...post,
//               engagement: {
//                 ...post.engagement,
//                 likes: post.engagement.likes + 1
//               },
//               userReaction: {
//                 name: reactionName,
//                 symbol: {
//                   like: '👍',
//                   love: '❤️',
//                   celebrate: '🎉',
//                   funny: '😂',
//                   insightful: '💡',
//                   sad: '😢'
//                 }[reactionName]
//               }
//             };
//           }
//           return post;
//         }));
//         return true;
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to add reaction');
//       return false;
//     }
//   };

//   const fetchPostReactions = async (postId) => {
//     try {
//       const response = await axios.get(
//         `https://facehiringapi.codingster.in/Post/GetPostLikes/${postId}`,
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//       return response.data?.data || { reactions: [], alreadyReacted: false };
//     } catch (error) {
//       console.error('Error fetching reactions:', error);
//       return { reactions: [], alreadyReacted: false };
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   return (
//     <PostContext.Provider value={{
//       posts,
//       loading,
//       error,
//       fetchPosts,
//       handleReaction,
//       addReaction,
//       fetchPostReactions
//     }}>
//       {children}
//     </PostContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://facehiringapi.codingster.in/Post/Get_All_Posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data?.responseCode === 1) {
        const postsWithReactions = await Promise.all(
          response.data.data.map(async (post) => {
            let reactions = [];
            let currentUserReaction = null;

            try {
              const res = await axios.get(
                `https://facehiringapi.codingster.in/Post/GetPostLikes/${post.id}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
              );
              if (res.data?.responseCode === 1) {
                reactions = res.data.data.reactions || [];
                if (res.data.data.alreadyReacted) {
                  currentUserReaction = {
                    symbol: res.data.data.reactionSymbol,
                    name: Object.entries({
                      like: '👍',
                      love: '❤️',
                      celebrate: '🎉',
                      funny: '😂',
                      insightful: '💡',
                      sad: '😢',
                    }).find(([_, v]) => v === res.data.data.reactionSymbol)?.[0] || 'like',
                  };
                }
              }
            } catch (error) {
              console.error('Error fetching reactions:', error);
            }

            return {
              id: post.id,
              content: post.description,
              images: (post.imageUrls || []).filter((url) => url?.trim() !== ''),
              videos: (post.videoUrls || []).filter((url) => url?.trim() !== ''),
              engagement: {
                likes: post.likeCount || 0,
                comments: post.commentCount || 0,
                reposts: post.repostCount || 0,
              },
              timeAgo: formatTimeAgo(post.createdOn),
              isPromoted: post.isPromoted || false,
              userReaction: currentUserReaction,
              reactions,
              author: {
                name: post.userName,
                title: post.designation || '',
                avatar: post.profileimage || '',
                id: post.userId || post.id,
              },
            };
          })
        );
        setPosts(postsWithReactions);
      }
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReaction = async (postId, reactionName) => {
    try {
      const token = localStorage.getItem('token');
      let response;

      if (reactionName === null) {
        // Remove reaction
        response = await axios.post(
          `https://facehiringapi.codingster.in/Post/ReactToPost/${postId}/delete`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Update or add reaction
        response = await axios.post(
          `https://facehiringapi.codingster.in/Post/UpdateReactToPost/${postId}?reactionText=${reactionName}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.responseCode === 1) {
        setPosts((prev) =>
          prev.map((post) => {
            if (post.id === postId) {
              const isRemoving = reactionName === null;
              const isNewReaction = !post.userReaction;
              const isUpdating = post.userReaction && !isRemoving;

              return {
                ...post,
                engagement: {
                  ...post.engagement,
                  likes: isRemoving
                    ? post.engagement.likes - 1
                    : isNewReaction
                    ? post.engagement.likes + 1
                    : post.engagement.likes,
                },
                userReaction: isRemoving
                  ? null
                  : {
                      name: reactionName,
                      symbol: {
                        like: '👍',
                        love: '❤️',
                        celebrate: '🎉',
                        funny: '😂',
                        insightful: '💡',
                        sad: '😢',
                      }[reactionName],
                    },
              };
            }
            return post;
          })
        );
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update reaction');
      return false;
    }
  };

  const addReaction = async (postId, reactionName) => {
    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/Post/React_To_Post/${postId}?reactionText=${reactionName}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.data.responseCode === 1) {
        setPosts((prev) =>
          prev.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                engagement: {
                  ...post.engagement,
                  likes: post.engagement.likes + 1,
                },
                userReaction: {
                  name: reactionName,
                  symbol: {
                    like: '👍',
                    love: '❤️',
                    celebrate: '🎉',
                    funny: '😂',
                    insightful: '💡',
                    sad: '😢',
                  }[reactionName],
                },
              };
            }
            return post;
          })
        );
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add reaction');
      return false;
    }
  };

  const fetchPostReactions = async (postId) => {
    try {
      const response = await axios.get(
        `https://facehiringapi.codingster.in/Post/GetPostLikes/${postId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data?.data || { reactions: [], alreadyReacted: false };
    } catch (error) {
      console.error('Error fetching reactions:', error);
      return { reactions: [], alreadyReacted: false };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        handleReaction,
        addReaction,
        fetchPostReactions,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};