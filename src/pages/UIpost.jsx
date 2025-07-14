// import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/Navbar/Navbar';
// import LeftSidebar from '../Components/Sidebar/LeftSidebar';
// import RightSidebar from '../Components/Sidebar/RightSidebar';
// import ShareBox from '../Components/Feed/ShareBox';
// import Post from '../Components/Feed/Post';
// import './Home.css';
// import defaultProfile from "../../src/Assests/Images/profie.jpeg";
// import { FaSpinner } from 'react-icons/fa';

// const UIpost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('https://facehiringapi.codingster.in/Post/Get_All_Posts');
//         const data = await response.json();
        
//         if (data.responseCode === 1) {
//           const processedPosts = data.data.map(post => ({
//             id: post.id,
//             author: {
//               name: post.userName,
//               avatar: post.userAvatar || defaultProfile,
//               title: post.designation || 'Member',
//               connection: '1st' // Simulate connection degree
//             },
//             content: post.description,
//             images: post.imageUrls.map(url => 
//               url.startsWith('http') ? url : `https://facehiringapi.codingster.in/DisplayImages/${url}`
//             ),
//             videos: post.videoUrls.map(url => 
//               url.startsWith('http') ? url : `https://facehiringapi.codingster.in/DisplayImages/${url}`
//             ),
//             engagement: {
//               likes: post.likeCount,
//               comments: post.commentCount,
//               reposts: post.repostCount,
//               views: Math.floor(Math.random() * 1000) // Simulate views
//             },
//             timeAgo: formatTimeAgo(post.createdOn),
//             commentsList: post.comments,
//             isPromoted: Math.random() > 0.8 // Random promoted posts
//           }));
          
//           processedPosts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
//           setPosts(processedPosts);
//         } else {
//           throw new Error(data.message || 'Failed to fetch posts');
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//     const interval = setInterval(fetchPosts, 30000);
//     return () => clearInterval(interval);
//   }, []);

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

//   if (loading) {
//     return (
//       <div className="home-page linkedin-style">
//         <div className="container mt-4">
//           <div className="row">
//             <div className="col-lg-3"><LeftSidebar /></div>
//             <div className="col-lg-6 text-center py-5">
//               <div className="loading-spinner">
//                 <FaSpinner className="spinner-icon" />
//                 <p>Loading your feed...</p>
//               </div>
//             </div>
//             <div className="col-lg-3"><RightSidebar /></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="home-page linkedin-style">
//         <div className="container mt-4">
//           <div className="row">
//             <div className="col-lg-3"><LeftSidebar /></div>
//             <div className="col-lg-6">
//               <div className="error-card">
//                 <h4>Error loading posts</h4>
//                 <p>{error}</p>
//                 <button 
//                   className="retry-button"
//                   onClick={() => window.location.reload()}
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </div>
//             <div className="col-lg-3"><RightSidebar /></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-page linkedin-style">
//       {/* <Navbar /> */}
//       <div className="container mt-4">
//         <div className="row">
//           <div className="col-lg-3"><LeftSidebar /></div>
//           <div className="col-lg-6 main-feed">
//             <ShareBox />
//             <div className="posts-container">
//               {posts.map(post => (
//                 <Post 
//                   key={post.id}
//                   {...post}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="col-lg-3"><RightSidebar /></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UIpost;
// src/pages/UIpost.jsx
// src/pages/UIpost.jsx
import React, { useContext } from 'react';
import { PostContext } from '../../src/Context/PostContext';
import ProfileSidebar from '../Components/Sidebar/ProfileSidebar';
import RightSidebar from '../Components/Sidebar/RightSidebar';
import ShareBox from '../Components/Feed/ShareBox';
import Post from '../Components/Feed/Post';
import './Home.css';
import { FaSpinner } from 'react-icons/fa';

const UIpost = () => {
  const { posts, loading, error, fetchPosts } = useContext(PostContext);

  if (loading) {
    return (
      <div className="home-page linkedin-style">
        <div className="container-main mt-4">
          <div className="row">
            <div className="col-lg-3 right-sidebar ">
              <ProfileSidebar />
            </div>
            <div className="col-lg-6 text-center py-5">
              <div className="loading-spinner">
                <FaSpinner className="spinner-icon" />
                <p>Loading your feed...</p>
              </div>
            </div>
            <div className="col-lg-3">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page linkedin-style">
        <div className="container-main mt-4">
          <div className="row">
            <div className="col-lg-3 ">
              <ProfileSidebar />
            </div>
            <div className="col-lg-6">
              <div className="error-card">
                <h4>Error loading posts</h4>
                <p>{error}</p>
                <button className="retry-button" onClick={fetchPosts}>
                  Try Again
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="home-page linkedin-style">
        <div className="container-main mt-4">
          <div className="row">
            <div className="col-lg-3" style={{ backgroundColor: '#f3f6f8' }}>
              <ProfileSidebar />
            </div>
            <div className="col-lg-6 main-feed">
              <ShareBox />
              <div className="posts-container">
                {posts.map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>
            </div>
            <div className="col-lg-3" style={{ backgroundColor: '#f3f6f8' }}>
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    );
};

export default UIpost;