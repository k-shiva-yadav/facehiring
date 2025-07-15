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
import React, { useContext, useRef, useEffect, useState } from 'react';
import { PostContext } from '../../src/Context/PostContext';
import { useAuthContext } from '../../src/Context/AuthContext';
import ShareBox from '../Components/Feed/ShareBox';
import Post from '../Components/Feed/Post';
import './Home.css';
import { FaSpinner, FaMapMarkerAlt, FaBuilding, FaVideo, FaBookmark, FaChevronRight, FaUserPlus } from 'react-icons/fa';

const ProfileCard = () => {
  const { user } = useAuthContext();
  // Placeholder analytics
  const analytics = {
    profileViews: 350,
    postImpressions: 1200,
    followers: 12000,
    searchAppearances: 800,
  };
  return (
    <div className="profile-card-exact">
      <div className="profile-banner-exact">
        <img src={user?.bannerImage || '/images/FACEHIRE-LOGO-DARK.png'} alt="Banner" className="profile-banner-img-exact" />
      </div>
      <div className="profile-avatar-wrapper-exact">
        <img
          src={user?.imageFile || '/images/FACEHIRE-LOGO.png'}
          alt="Profile"
          className="profile-avatar-img-exact"
        />
      </div>
      <div className="profile-info-section-exact">
        <div className="profile-name-exact">{user?.fullName || user?.fullname || user?.firstName + ' ' + user?.lastName || 'User Name'}</div>
        <div className="profile-title-exact">{user?.designation || user?.title || 'UI/UX Designer'}</div>
        <div className="profile-company-exact"><FaBuilding style={{marginRight: 4}}/>{user?.companyName || 'XYZ software company Ltd.'}</div>
        <div className="profile-location-exact"><FaMapMarkerAlt style={{marginRight: 4}}/>{user?.location || 'Hyderabad, Telangana'}</div>
      </div>
      <button className="profile-main-btn-exact"><FaVideo style={{marginRight: 8, fontSize: '1.1em'}}/> My Video Pitch</button>
      <div className="profile-divider-exact" />
      <a href="#" className="profile-analytics-link-exact">View all analytics</a>
      <div className="profile-analytics-exact">
        <div>
          <div className="profile-analytics-label-exact">Profile Viewers</div>
          <div className="profile-analytics-value-exact">{analytics.profileViews}</div>
        </div>
        <div>
          <div className="profile-analytics-label-exact">Post Impressions</div>
          <div className="profile-analytics-value-exact">{analytics.postImpressions}</div>
        </div>
        <div>
          <div className="profile-analytics-label-exact">Followers</div>
          <div className="profile-analytics-value-exact">{analytics.followers.toLocaleString()}</div>
        </div>
        <div>
          <div className="profile-analytics-label-exact">Search Appearances</div>
          <div className="profile-analytics-value-exact">{analytics.searchAppearances}</div>
        </div>
      </div>
      <div className="profile-divider-exact" />
      <button className="profile-view-btn-exact">View Profile</button>
    </div>
  );
};

const SavedItemsCard = () => (
  <div className="saved-items-card-exact">
    <FaBookmark className="saved-items-icon-exact" />
    <span className="saved-items-text-exact">Saved items</span>
    <FaChevronRight className="saved-items-arrow-exact" />
  </div>
);

const SkillMatchesCard = () => {
  const matches = [
    {
      name: 'Mohit Reddy',
      subtitle: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Laxmi Seoni',
      subtitle: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Satish Mina',
      subtitle: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Alia Mithali',
      subtitle: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];
  return (
    <div className="skill-matches-card-exact">
      <div className="skill-matches-title-exact">Skill matches</div>
      <div className="skill-matches-divider-exact" />
      <div className="skill-matches-list-exact">
        {matches.map((m, i) => (
          <div className="skill-matches-item-exact" key={i}>
            <img src={m.avatar} alt={m.name} className="skill-matches-avatar-exact" />
            <div className="skill-matches-info-exact">
              <div className="skill-matches-name-exact">{m.name}</div>
              <div className="skill-matches-subtitle-exact">{m.subtitle}</div>
              <button className="skill-matches-connect-btn-exact">
                <FaUserPlus style={{marginRight: 6, fontSize: '1.1em'}}/> Connect
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="skill-matches-bottom-divider-exact" />
      <button className="skill-matches-discover-btn-exact">Discover more</button>
    </div>
  );
};

const RequestInvitationCard = () => {
  const requests = [
    {
      name: 'Keshav Mukarji',
      title: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    },
    {
      name: 'Sai Devant',
      title: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Sunny Leli',
      title: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    {
      name: 'Priya Jha',
      title: 'UI/UI Design at ABC software Pvt. Ltd.',
      avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
  ];
  return (
    <div className="request-invitation-card-exact">
      <div className="request-invitation-title-exact">
        Request / Invitation <span className="request-invitation-count-exact">(26)</span>
      </div>
      <div className="request-invitation-divider-exact" />
      <div className="request-invitation-list-exact">
        {requests.map((req, i) => (
          <div className="request-invitation-item-exact" key={i}>
            <img src={req.avatar} alt={req.name} className="request-invitation-avatar-exact" />
            <div className="request-invitation-info-exact">
              <div className="request-invitation-name-exact">{req.name}</div>
              <div className="request-invitation-title2-exact">{req.title}</div>
              <div className="request-invitation-actions-exact">
                <button className="request-invitation-accept-exact">Accept</button>
                <button className="request-invitation-ignore-exact">Ignore</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="request-invitation-footer-exact">Discover more</div>
    </div>
  );
};

const AdvertisementCard = () => (
  <div className="advertisement-card-exact">
    <div className="advertisement-content-exact">
      <div className="advertisement-title-exact">Advertisement</div>
      <div className="advertisement-image-exact">
        {/* Mock ad image or color block */}
        <img src="https://via.placeholder.com/320x120?text=Your+Ad+Here" alt="Ad" style={{width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px'}} />
      </div>
      <div className="advertisement-text-exact">Boost your brand with FaceHiring!<br/>Contact us for advertising opportunities.</div>
      <button className="advertisement-btn-exact">Learn More</button>
    </div>
  </div>
);

// Remove useFixedSidebar and all related JS logic

const LinkedInLeftSidebar = () => (
  <aside className="linkedin-left-col sidebar-sticky">
    <ProfileCard />
    <SavedItemsCard />
  </aside>
);

const LinkedInRightSidebar = () => (
  <aside className="linkedin-right-col">
    <SkillMatchesCard />
    <RequestInvitationCard />
    <div className="sidebar-sticky-top">
      <AdvertisementCard />
    </div>
  </aside>
);




const UIpost = () => {
  const { posts, loading, error, fetchPosts } = useContext(PostContext);

  return (
    <div className="linkedin-home-wrapper">
      <div className="linkedin-container">
        <LinkedInLeftSidebar />
        <main className="linkedin-main-feed">
          {loading ? (
            <div className="loading-spinner">
              <FaSpinner className="spinner-icon" />
              <p>Loading your feed...</p>
            </div>
          ) : error ? (
            <div className="error-card">
              <h4>Error loading posts</h4>
              <p>{error}</p>
              <button className="retry-button" onClick={fetchPosts}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              <ShareBox />
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
            </>
          )}
        </main>
        <LinkedInRightSidebar />
      </div>
    </div>
  );
};

export default UIpost;