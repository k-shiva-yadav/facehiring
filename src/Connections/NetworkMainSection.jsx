// // import React, { useState } from 'react';
// // import n1 from '../Assests/Images/Network1.jpg';
// // import n2 from '../Assests/Images/Network2.jpg';
// // import n3 from '../Assests/Images/Network3.jpg';
// // import n4 from '../Assests/Images/Network4.jpg';
// // import n5 from '../Assests/Images/Network5.jpg';
// // import n6 from '../Assests/Images/Network6.jpg';



// // const people = [
// //     {
// //         name: "Ranbhir Mehra",
// //         role: "UI/UX Designer",
// //         company: "XYZ software company Ltd.",
// //         bgImg: "https://storage.googleapis.com/a1aa/image/bcdd74de-f980-40df-8b0b-f621974cf7b2.jpg",
// //         profileImg: n3,
// //     },
// //     {
// //         name: "Ranbhir Mehra",
// //         role: "UI/UX Designer",
// //         company: "XYZ software company Ltd.",
// //         bgImg: "https://storage.googleapis.com/a1aa/image/195d6855-5e4e-44a1-9334-9e2305b92652.jpg",
// //         profileImg: n4,
// //     },
// //     {
// //         name: "Ranbhir Mehra",
// //         role: "UI/UX Designer",
// //         company: "XYZ software company Ltd.",
// //         bgImg: "https://storage.googleapis.com/a1aa/image/232ac4dc-609c-4b98-ba0f-3924dbabc455.jpg",
// //         profileImg: n5,
// //     },
// //     {
// //         name: "Ranbhir Mehra",
// //         role: "UI/UX Designer",
// //         company: "XYZ software company Ltd.",
// //         bgImg: "https://storage.googleapis.com/a1aa/image/fadf530e-5ad5-4a45-a4ad-3d3f3cf23bed.jpg",
// //         profileImg: n6,
// //     },
// //     {
// //         name: "Ranbhir Mehra",
// //         role: "UI/UX Designer",
// //         company: "XYZ software company Ltd.",
// //         bgImg: "https://storage.googleapis.com/a1aa/image/fadf530e-5ad5-4a45-a4ad-3d3f3cf23bed.jpg",
// //         profileImg: n5,
// //     },
// //     {
// //         name: "Ranbhir Mehra",
// //         role: "UI/UX Designer",
// //         company: "XYZ software company Ltd.",
// //         bgImg: "https://storage.googleapis.com/a1aa/image/232ac4dc-609c-4b98-ba0f-3924dbabc455.jpg",
// //         profileImg: n4,
// //     },
// // ];

// // const NetworkMainSection = () => {



// //     const [view, setView] = useState('received');

// //     // Sample data
// //     const connections = [
// //         {
// //             name: 'Brandon Wilson',
// //             role: 'Sr. UI Designer',
// //             image: n1,
// //             connections: 825,
// //             message: 'Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment ?',
// //             status: 'pending'
// //         },
// //         {
// //             name: 'Theresa Steward',
// //             role: 'iOS developer',
// //             image: n2,
// //             connections: 78,
// //             message: 'Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment ?',
// //             status: 'sent'
// //         }
// //     ];
// //     // Handling state changes for buttons in Sent mode
// //     const handleActionClick = (person, action) => {

// //         person.status = action === 'cancel' ? 'canceled' : action;
// //         setView(view);
// //     };


// //     return (
// //         <section className="flex-grow-1 d-flex flex-column gap-4">
// //             <div className="mt-4">
// //                 {/*Button Navigation*/}
// //                 <div className="d-flex border rounded overflow-hidden w-100" style={{ maxWidth: '880px' }}>
// //                     <button
// //                         type="button"
// //                         className={`flex-grow-1 btn btn-sm fw-semibold rounded-0 ${view === 'received' ? 'text-white' : 'btn-light'}`}
// //                         style={{
// //                             backgroundColor: view === 'received' ? '#3C5898' : '',
// //                         }}
// //                         onClick={() => setView('received')}
// //                     >
// //                         Received
// //                     </button>
// //                     <button
// //                         type="button"
// //                         className={`flex-grow-1 btn btn-sm fw-semibold rounded-0 border-start ${view === 'sent' ? 'text-white' : 'btn-light'}`}
// //                         style={{
// //                             backgroundColor: view === 'sent' ? '#3C5898' : '',
// //                         }}
// //                         onClick={() => setView('sent')}
// //                     >
// //                         Sent
// //                     </button>
// //                 </div>





// //                 {/* Connection Requests */}
// //                 <div className="d-flex justify-content-between mt-3 mb-2 small fw-semibold text-dark">
// //                     <span>
// //                         {view === 'sent' ? (
// //                             <span className="text-dark">Request Sent</span>
// //                         ) : (
// //                             <>You have{' '}
// //                                 <a href="#" className="text-primary text-decoration-none">
// //                                     2 new connections
// //                                 </a>
// //                             </>
// //                         )}
// //                     </span>
// //                     <a href="#" className="text-decoration-none text-secondary">Show all</a>
// //                 </div>

// //                 {/* Connection Requests */}
// //                 <div className="d-grid gap-3">
// //                     {connections.map((person, index) => (
// //                         <div className="bg-white rounded shadow-sm p-3 d-flex align-items-start gap-3" key={index}>
// //                             <img
// //                                 src={person.image}
// //                                 alt={person.name}
// //                                 className="rounded-circle"
// //                                 width="40"
// //                                 height="40"
// //                                 style={{ objectFit: 'cover' }}
// //                             />
// //                             <div className="flex-grow-1 small pe-3 border-end border-primary">
// //                                 <p className="fw-semibold mb-0 text-dark" style={{ whiteSpace: 'nowrap' }}>
// //                                     {person.name}
// //                                 </p>
// //                                 <p className="text-muted mb-1"><small>{person.role}</small></p>
// //                                 {person.connections && (
// //                                     <a href="#" className="text-primary text-decoration-none" style={{ fontSize: '10px' }}>
// //                                         {person.connections} connections
// //                                     </a>
// //                                 )}
// //                             </div>
// //                             {person.message && (
// //                                 <div className="flex-grow-1 text-muted small pe-3" style={{ fontSize: '10px' }}>
// //                                     {person.message}
// //                                 </div>
// //                             )}
// //                             <div className="d-flex flex-row gap-2">
// //                                 {view === 'sent' ? (
// //                                     <>
// //                                         <button
// //                                             className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1"
// //                                             onClick={() => handleActionClick(person, 'pending')}
// //                                         >
// //                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                                                 <path fillRule="evenodd" clipRule="evenodd" d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z" fill="black" />
// //                                             </svg>

// //                                             Pending

// //                                         </button>
// //                                         <button
// //                                             className="btn btn-sm rounded-pill px-3 py-1 text-white" style={{ backgroundColor: "#3C5898" }}
// //                                             onClick={() => handleActionClick(person, 'canceled')}
// //                                         >
// //                                             Cancel
// //                                         </button>
// //                                     </>
// //                                 ) : (
// //                                     <>
// //                                         <button className="btn btn-sm rounded-pill text-white px-3 py-1" style={{ backgroundColor: "#3C5898" }}>
// //                                             Accept
// //                                         </button>
// //                                         <button className="btn btn-outline-dark btn-sm text-secondary rounded-pill px-3 py-1">
// //                                             Ignore
// //                                         </button>
// //                                     </>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>


// //                 {/* Recent Connections */}
// //                 <div className="d-flex justify-content-between small fw-semibold text-dark mt-4 mb-2">
// //                     <span>Recent connections</span>
// //                     <a href="#" className="text-decoration-none text-secondary">Show all</a>
// //                 </div>

// //                 <div className="row g-3">
// //                     {[{
// //                         name: 'Audrey Alexander',
// //                         role: 'Trainer at Google',
// //                         time: 'Yesterday, 14:20',
// //                         image: n3
// //                     }, {
// //                         name: 'Kyle Fisher',
// //                         role: 'Product Designer at Commerce Corp',
// //                         time: 'Yesterday, 12:15',
// //                         image: n4
// //                     }, {
// //                         name: 'Darlene Black',
// //                         role: 'HR Manager, 10,000 connections',
// //                         time: '26 Jul, 11:07',
// //                         image: n5
// //                     }, {
// //                         name: 'Eduardo Russell',
// //                         role: 'Full stack developer at Yandex',
// //                         time: '25 Aug, Sunday',
// //                         image: n6
// //                     }].map((person, index) => (
// //                         <div className="col-12 col-sm-6" key={index}>
// //                             <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center justify-content-between">
// //                                 <div className="d-flex align-items-center gap-3">
// //                                     <img src={person.image} alt={person.name} className="rounded-circle" width="40" height="40" style={{ objectFit: 'cover' }} />
// //                                     <div className="small">
// //                                         <p className="fw-semibold mb-0 text-dark">{person.name}</p>
// //                                         <p className="text-muted mb-1"><small>{person.role}</small></p>
// //                                         <p className="text-secondary mb-2" style={{ fontSize: '10px' }}>{person.time}</p>
// //                                     </div>
// //                                 </div>
// //                                 <button className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1">Message</button>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>

// //                 { /*skill matches*/}
// //                 <div className="mb-4 mt-3">
// //                     <div className="d-flex justify-content-between text-dark small fw-semibold mb-2">
// //                         <span>Skill matches</span>
// //                         <a href="#" className="text-decoration-none text-secondary">Show all</a>
// //                     </div>
// //                     <div className="row g-3">
// //                         {people.map((person, index) => (
// //                             <div className="col-12 col-sm-4 col-md-4 col-lg-4" key={index}>
// //                                 <article className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column">
// //                                     <img
// //                                         src={person.bgImg}
// //                                         alt="Background"
// //                                         className="w-100"
// //                                         style={{ height: "80px", objectFit: "cover" }}
// //                                     />
// //                                     <div className="d-flex flex-column align-items-center px-3 pb-3" style={{ marginTop: "-40px" }}>
// //                                         <img
// //                                             src={person.profileImg}
// //                                             alt={person.name}
// //                                             className="rounded-circle border border-white"
// //                                             style={{ width: "72px", height: "72px", objectFit: "cover", borderWidth: "4px" }}
// //                                         />
// //                                         <p className="fw-semibold small mt-2 mb-0">{person.name}</p>
// //                                         <p className="text-muted small mb-0">{person.role}</p>
// //                                         <p className="text-secondary small d-flex align-items-center mt-1">
// //                                             <i className="far fa-building me-1"></i>
// //                                             <span>{person.company}</span>
// //                                         </p>
// //                                         <button
// //                                             className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2 d-flex align-items-center justify-content-center"
// //                                             type="button"
// //                                         >
// //                                             <i className="fas fa-user-plus me-1"></i> Connect
// //                                         </button>
// //                                     </div>
// //                                 </article>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>


// //                 {/*People you may know*/}
// //                 <div className="mb-4 mt-3">
// //                     <div className="d-flex justify-content-between text-dark small fw-semibold mb-2">
// //                         <span>People you may know</span>
// //                         <a href="#" className="text-decoration-none text-secondary">Show all</a>
// //                     </div>
// //                     <div className="row g-3">
// //                         {people.map((person, index) => (
// //                             <div className="col-12 col-sm-4 col-md-4 col-lg-4" key={index}>
// //                                 <article className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column">
// //                                     <img
// //                                         src={person.bgImg}
// //                                         alt="Background"
// //                                         className="w-100"
// //                                         style={{ height: "80px", objectFit: "cover" }}
// //                                     />
// //                                     <div className="d-flex flex-column align-items-center px-3 pb-3" style={{ marginTop: "-40px" }}>
// //                                         <img
// //                                             src={person.profileImg}
// //                                             alt={person.name}
// //                                             className="rounded-circle border border-white"
// //                                             style={{ width: "72px", height: "72px", objectFit: "cover", borderWidth: "4px" }}
// //                                         />
// //                                         <p className="fw-semibold small mt-2 mb-0">{person.name}</p>
// //                                         <p className="text-muted small mb-0">{person.role}</p>
// //                                         <p className="text-secondary small d-flex align-items-center mt-1">
// //                                             <i className="far fa-building me-1"></i>
// //                                             <span>{person.company}</span>
// //                                         </p>
// //                                         <button
// //                                             className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2 d-flex align-items-center justify-content-center"
// //                                             type="button"
// //                                         >
// //                                             <i className="fas fa-user-plus me-1"></i> Connect
// //                                         </button>
// //                                     </div>
// //                                 </article>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>


// //             </div>
// //         </section>
// //     );
// // };

// // export default NetworkMainSection;
// import React, { useState, useEffect, useContext } from 'react';
// import { useAuthContext } from '../Context/AuthContext';

// const NetworkMainSection = () => {
//   const { 
//     networkData, 
//     sendConnectionRequest, 
//     respondToRequest, 
//     cancelRequest,
//     fetchConnections,
//     fetchRecommendations,
//     fetchPendingRequests,
//     user
//   } = useAuthContext();
  
//   const [view, setView] = useState('received');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         if (view === 'received') {
//           await fetchPendingRequests();
//         } else if (view === 'sent') {
//           // You might need to implement fetchSentRequests if your API supports it
//           await fetchPendingRequests(); // Using same for now
//         }
//         await fetchConnections();
//         await fetchRecommendations();
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [view]);

//   const handleConnect = (userId) => {
//     sendConnectionRequest(user.id, userId);
//   };

//   const handleAccept = (connectionId) => {
//     respondToRequest(connectionId, true);
//   };

//   const handleReject = (connectionId) => {
//     respondToRequest(connectionId, false);
//   };

//   const handleCancel = (connectionId) => {
//     cancelRequest(connectionId);
//   };

//   return (
//     <section className="flex-grow-1 d-flex flex-column gap-4">
//       <div className="mt-4">
//         {/* Button Navigation */}
//         <div className="d-flex border rounded overflow-hidden w-100" style={{ maxWidth: '880px' }}>
//           <button
//             type="button"
//             className={`flex-grow-1 btn btn-sm fw-semibold rounded-0 ${view === 'received' ? 'text-white' : 'btn-light'}`}
//             style={{
//               backgroundColor: view === 'received' ? '#3C5898' : '',
//             }}
//             onClick={() => setView('received')}
//           >
//             Received
//           </button>
//           <button
//             type="button"
//             className={`flex-grow-1 btn btn-sm fw-semibold rounded-0 border-start ${view === 'sent' ? 'text-white' : 'btn-light'}`}
//             style={{
//               backgroundColor: view === 'sent' ? '#3C5898' : '',
//             }}
//             onClick={() => setView('sent')}
//           >
//             Sent
//           </button>
//         </div>

//         {/* Connection Requests */}
//         <div className="d-flex justify-content-between mt-3 mb-2 small fw-semibold text-dark">
//           <span>
//             {view === 'sent' ? (
//               <span className="text-dark">Request Sent</span>
//             ) : (
//               <>You have{' '}
//                 <a href="#" className="text-primary text-decoration-none">
//                   {networkData.pendingRequests.length} new connections
//                 </a>
//               </>
//             )}
//           </span>
//           <a href="#" className="text-decoration-none text-secondary">Show all</a>
//         </div>

//         {/* Connection Requests */}
//         {loading ? (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : (
//           <div className="d-grid gap-3">
//             {view === 'received' ? (
//               networkData.pendingRequests.length > 0 ? (
//                 networkData.pendingRequests.map((request, index) => (
//                   <div className="bg-white rounded shadow-sm p-3 d-flex align-items-start gap-3" key={index}>
//                     <img
//                       src={request.user?.imageFile || "https://via.placeholder.com/40"}
//                       alt={request.user?.fullName}
//                       className="rounded-circle"
//                       width="40"
//                       height="40"
//                       style={{ objectFit: '' }}
//                     />
//                     <div className="flex-grow-1 small pe-3 border-end border-primary">
//                       <p className="fw-semibold mb-0 text-dark" style={{ whiteSpace: 'nowrap' }}>
//                         {request.user?.fullName}
//                       </p>
//                       <p className="text-muted mb-1"><small>{request.user?.email}</small></p>
//                     </div>
//                     <div className="d-flex flex-row gap-2">
//                       <button 
//                         className="btn btn-sm rounded-pill text-white px-3 py-1" 
//                         style={{ backgroundColor: "#3C5898" }}
//                         onClick={() => handleAccept(request.id)}
//                       >
//                         Accept
//                       </button>
//                       <button 
//                         className="btn btn-outline-dark btn-sm text-secondary rounded-pill px-3 py-1"
//                         onClick={() => handleReject(request.id)}
//                       >
//                         Ignore
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="bg-white rounded shadow-sm p-3 text-center text-muted">
//                   No pending requests
//                 </div>
//               )
//             ) : (
//               networkData.connections.filter(c => c.isSent && !c.isAccepted).length > 0 ? (
//                 networkData.connections.filter(c => c.isSent && !c.isAccepted).map((connection, index) => (
//                   <div className="bg-white rounded shadow-sm p-3 d-flex align-items-start gap-3" key={index}>
//                     <img
//                       src={connection.user?.imageFile || "https://via.placeholder.com/40"}
//                       alt={connection.user?.fullName}
//                       className="rounded-circle"
//                       width="40"
//                       height="40"
//                       style={{ objectFit: '' }}
//                     />
//                     <div className="flex-grow-1 small pe-3 border-end border-primary">
//                       <p className="fw-semibold mb-0 text-dark" style={{ whiteSpace: 'nowrap' }}>
//                         {connection.user?.fullName}
//                       </p>
//                       <p className="text-muted mb-1"><small>{connection.user?.email}</small></p>
//                     </div>
//                     <div className="d-flex flex-row gap-2">
//                       <button
//                         className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1"
//                       >
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path fillRule="evenodd" clipRule="evenodd" d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z" fill="black" />
//                         </svg>
//                         Pending
//                       </button>
//                       <button
//                         className="btn btn-sm rounded-pill px-3 py-1 text-white" 
//                         style={{ backgroundColor: "#3C5898" }}
//                         onClick={() => handleCancel(connection.id)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="bg-white rounded shadow-sm p-3 text-center text-muted">
//                   No sent requests
//                 </div>
//               )
//             )}
//           </div>
//         )}

//         {/* Recent Connections */}
//         <div className="d-flex justify-content-between small fw-semibold text-dark mt-4 mb-2">
//           <span>Recent connections</span>
//           <a href="#" className="text-decoration-none text-secondary">Show all</a>
//         </div>

//         {loading ? (
//           <div className="text-center py-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : (
//           <div className="row g-3">
//             {networkData.connections
//               .filter(c => c.isAccepted)
//               .slice(0, 4)
//               .map((connection, index) => (
//                 <div className="col-12 col-sm-6" key={index}>
//                   <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center justify-content-between">
//                     <div className="d-flex align-items-center gap-3">
//                       <img 
//                         src={connection.user?.imageFile || "https://via.placeholder.com/40"} 
//                         alt={connection.user?.fullName} 
//                         className="rounded-circle" 
//                         width="40" 
//                         height="40" 
//                         style={{ objectFit: '' }} 
//                       />
//                       <div className="small">
//                         <p className="fw-semibold mb-0 text-dark">{connection.user?.fullName}</p>
//                         <p className="text-muted mb-1"><small>{connection.user?.email}</small></p>
//                         <p className="text-secondary mb-2" style={{ fontSize: '10px' }}>
//                           {new Date(connection.createdOn).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <button className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1">Message</button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}

//         {/* Skill matches */}
//         <div className="mb-4 mt-3">
//           <div className="d-flex justify-content-between text-dark small fw-semibold mb-2">
//             <span>Skill matches</span>
//             <a href="#" className="text-decoration-none text-secondary">Show all</a>
//           </div>
//           {loading ? (
//             <div className="text-center py-4">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <div className="row g-3">
//               {networkData.recommendations.slice(3, 9).map((recommendation, index) => (
//                 <div className="col-12 col-sm-4 col-md-4 col-lg-4" key={index}>
//                   <article className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column">
//                     <div 
//                       className="w-100 bg-secondary" 
//                       style={{ height: "80px", backgroundColor: '#f5f5f5' }}
//                     />
//                     <div className="d-flex flex-column align-items-center px-3 pb-3" style={{ marginTop: "-40px" }}>
//                       <img
//                         src={recommendation.imageFile || "https://via.placeholder.com/72"}
//                         alt={recommendation.fullName}
//                         className="rounded-circle border border-white"
//                         style={{ width: "72px", height: "72px", objectFit: "", borderWidth: "4px" }}
//                       />
//                       <p className="fw-semibold small mt-2 mb-0">{recommendation.fullName}</p>
//                       <p className="text-muted small mb-0">{recommendation.source}</p>
//                       <p className="text-secondary small d-flex align-items-center mt-1">
//                         <i className="far fa-building me-1"></i>
//                         <span>{recommendation.email}</span>
//                       </p>
//                       <button
//                         className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2 d-flex align-items-center justify-content-center"
//                         type="button"
//                         onClick={() => handleConnect(recommendation.id)}
//                       >
//                         <i className="fas fa-user-plus me-1"></i> Connect
//                       </button>
//                     </div>
//                   </article>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* People you may know */}
//         <div className="mb-4 mt-3">
//           <div className="d-flex justify-content-between text-dark small fw-semibold mb-2">
//             <span>People you may know</span>
//             <a href="#" className="text-decoration-none text-secondary">Show all</a>
//           </div>
//           {loading ? (
//             <div className="text-center py-4">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <div className="row g-3">
//               {networkData.recommendations.slice(3, 22).map((recommendation, index) => (
//                 <div className="col-12 col-sm-4 col-md-4 col-lg-4" key={index}>
//                   <article className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column">
//                     <div 
//                       className="w-100 bg-secondary" 
//                       style={{ height: "80px", backgroundColor: '#f5f5f5' }}
//                     />
//                     <div className="d-flex flex-column align-items-center px-3 pb-3" style={{ marginTop: "-40px" }}>
//                       <img
//                         src={recommendation.imageFile || "https://via.placeholder.com/72"}
//                         alt={recommendation.fullName}
//                         className="rounded-circle border border-white"
//                         style={{ width: "72px", height: "72px", objectFit: "", borderWidth: "4px" }}
//                       />
//                       <p className="fw-semibold small mt-2 mb-0">{recommendation.fullName}</p>
//                       <p className="text-muted small mb-0">{recommendation.source}</p>
//                       <p className="text-secondary small d-flex align-items-center mt-1">
//                         <i className="far fa-building me-1"></i>
//                         <span>{recommendation.email}</span>
//                       </p>
//                       <button
//                         className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2 d-flex align-items-center justify-content-center"
//                         type="button"
//                         onClick={() => handleConnect(recommendation.id)}
//                       >
//                         <i className="fas fa-user-plus me-1"></i> Connect
//                       </button>
//                     </div>
//                   </article>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NetworkMainSection;
import React, { useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../Context/AuthContext';

const NetworkMainSection = () => {
  const {
    networkData,
    sendConnectionRequest,
    respondToRequest,
    cancelRequest,
    fetchConnections,
    fetchRecommendations,
    fetchPendingRequests,
    user,
  } = useAuthContext();

  const [view, setView] = useState('received');
  const [loading, setLoading] = useState(false);
  // Track the status of each recommendation's connection request
  const [connectionStatus, setConnectionStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (view === 'received') {
          await fetchPendingRequests();
        } else if (view === 'sent') {
          await fetchPendingRequests(); // Using same for now
        }
        await fetchConnections();
        await fetchRecommendations();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [view]);

  // Handle the "Connect" button click
  const handleConnect = async (userId, recommendationId) => {
    // Set the status to "pending" for this recommendation
    setConnectionStatus((prev) => ({
      ...prev,
      [recommendationId]: 'pending',
    }));

    try {
      await sendConnectionRequest(user.id, userId);
      // On success, update the status to "sent"
      setConnectionStatus((prev) => ({
        ...prev,
        [recommendationId]: 'sent',
      }));
    } catch (error) {
      console.error('Error sending connection request:', error);
      // On failure, revert the status to "notSent"
      setConnectionStatus((prev) => ({
        ...prev,
        [recommendationId]: 'notSent',
      }));
    }
  };

  const handleAccept = (connectionId) => {
    respondToRequest(connectionId, true);
  };

  const handleReject = (connectionId) => {
    respondToRequest(connectionId, false);
  };

  const handleCancel = (connectionId) => {
    cancelRequest(connectionId);
  };

  return (
    <section className="flex-grow-1 d-flex flex-column gap-4">
      <div className="mt-4">
        {/* Button Navigation */}
        <div className="d-flex border rounded overflow-hidden w-100" style={{ maxWidth: '880px' }}>
          <button
            type="button"
            className={`flex-grow-1 btn btn-sm fw-semibold rounded-0 ${view === 'received' ? 'text-white' : 'btn-light'}`}
            style={{
              backgroundColor: view === 'received' ? '#3C5898' : '',
            }}
            onClick={() => setView('received')}
          >
            Received
          </button>
          <button
            type="button"
            className={`flex-grow-1 btn btn-sm fw-semibold rounded-0 border-start ${view === 'sent' ? 'text-white' : 'btn-light'}`}
            style={{
              backgroundColor: view === 'sent' ? '#3C5898' : '',
            }}
            onClick={() => setView('sent')}
          >
            Sent
          </button>
        </div>

        {/* Connection Requests */}
        <div className="d-flex justify-content-between mt-3 mb-2 small fw-semibold text-dark">
          <span>
            {view === 'sent' ? (
              <span className="text-dark">Request Sent</span>
            ) : (
              <>
                You have{' '}
                <a href="#" className="text-primary text-decoration-none">
                  {networkData.pendingRequests.length} new connections
                </a>
              </>
            )}
          </span>
          <a href="#" className="text-decoration-none text-secondary">
            Show all
          </a>
        </div>

        {/* Connection Requests */}
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="d-grid gap-3">
            {view === 'received' ? (
              networkData.pendingRequests.length > 0 ? (
                networkData.pendingRequests.map((request, index) => (
                  <div className="bg-white rounded shadow-sm p-3 d-flex align-items-start gap-3" key={index}>
                    <img
                      src={request.user?.imageFile || 'https://via.placeholder.com/40'}
                      alt={request.user?.fullName}
                      className="rounded-circle"
                      width="40"
                      height="40"
                      // style={{ objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1 small pe-3 border-end border-primary">
                      <p className="fw-semibold mb-0 text-dark" style={{ whiteSpace: 'nowrap' }}>
                        {request.user?.fullName}
                      </p>
                      <p className="text-muted mb-1">
                        <small>{request.user?.email}</small>
                      </p>
                    </div>
                    <div className="d-flex flex-row gap-2">
                      <button
                        className="btn btn-sm rounded-pill text-white px-3 py-1"
                        style={{ backgroundColor: '#3C5898' }}
                        onClick={() => handleAccept(request.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm text-secondary rounded-pill px-3 py-1"
                        onClick={() => handleReject(request.id)}
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded shadow-sm p-3 text-center text-muted">
                  No pending requests
                </div>
              )
            ) : (
              networkData.connections.filter((c) => c.isSent && !c.isAccepted).length > 0 ? (
                networkData.connections
                  .filter((c) => c.isSent && !c.isAccepted)
                  .map((connection, index) => (
                    <div className="bg-white rounded shadow-sm p-3 d-flex align-items-start gap-3" key={index}>
                      <img
                        src={connection.user?.imageFile || 'https://via.placeholder.com/40'}
                        alt={connection.user?.fullName}
                        className="rounded-circle"
                        width="40"
                        height="40"
                        // style={{ objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1 small pe-3 border-end border-primary">
                        <p className="fw-semibold mb-0 text-dark" style={{ whiteSpace: 'nowrap' }}>
                          {connection.user?.fullName}
                        </p>
                        <p className="text-muted mb-1">
                          <small>{connection.user?.email}</small>
                        </p>
                      </div>
                      <div className="d-flex flex-row gap-2">
                        <button className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z"
                              fill="black"
                            />
                          </svg>
                          Pending
                        </button>
                        <button
                          className="btn btn-sm rounded-pill px-3 py-1 text-white"
                          style={{ backgroundColor: '#3C5898' }}
                          onClick={() => handleCancel(connection.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="bg-white rounded shadow-sm p-3 text-center text-muted">
                  No sent requests
                </div>
              )
            )}
          </div>
        )}

        {/* Recent Connections */}
        <div className="d-flex justify-content-between small fw-semibold text-dark mt-4 mb-2">
          <span>Recent connections</span>
          <a href="#" className="text-decoration-none text-secondary">
            Show all
          </a>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {networkData.connections
              .filter((c) => c.isAccepted)
              .slice(0, 4)
              .map((connection, index) => (
                <div className="col-12 col-sm-6" key={index}>
                  <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={connection.user?.imageFile || 'https://via.placeholder.com/40'}
                        alt={connection.user?.fullName}
                        className="rounded-circle"
                        width="40"
                        height="40"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="small">
                        <p className="fw-semibold mb-0 text-dark">{connection.user?.fullName}</p>
                        <p className="text-muted mb-1">
                          <small>{connection.user?.email}</small>
                        </p>
                        <p className="text-secondary mb-2" style={{ fontSize: '10px' }}>
                          {new Date(connection.createdOn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1">Message</button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Skill matches */}
        <div className="mb-4 mt-3">
          <div className="d-flex justify-content-between text-dark small fw-semibold mb-2">
            <span>Skill matches</span>
            <a href="#" className="text-decoration-none text-secondary">
              Show all
            </a>
          </div>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {networkData.recommendations.slice(3, 9).map((recommendation, index) => (
                <div className="col-12 col-sm-4 col-md-4 col-lg-4" key={index}>
                  <article className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column">
                    <div className="w-100 bg-secondary" style={{ height: '80px', backgroundColor: '#f5f5f5' }} />
                    <div className="d-flex flex-column align-items-center px-3 pb-3" style={{ marginTop: '-40px' }}>
                      <img
                        src={recommendation.imageFile || 'https://via.placeholder.com/72'}
                        alt={recommendation.fullName}
                        className="rounded-circle border border-white"
                        style={{ width: '72px', height: '72px', objectFit: 'cover', borderWidth: '4px' }}
                      />
                      <p className="fw-semibold small mt-2 mb-0">{recommendation.fullName}</p>
                      <p className="text-muted small mb-0">{recommendation.source}</p>
                      <p className="text-secondary small d-flex align-items-center mt-1">
                        <i className="far fa-building me-1"></i>
                        <span>{recommendation.email}</span>
                      </p>
                      {connectionStatus[recommendation.id] === 'pending' ? (
                        <button className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1 w-100 justify-content-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z"
                              fill="black"
                            />
                          </svg>
                          Pending
                        </button>
                      ) : connectionStatus[recommendation.id] === 'sent' ? (
                        <button className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1 w-100 justify-content-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z"
                              fill="black"
                            />
                          </svg>
                          Pending
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2 d-flex align-items-center justify-content-center"
                          type="button"
                          onClick={() => handleConnect(recommendation.id, recommendation.id)}
                        >
                          <i className="fas fa-user-plus me-1"></i> Connect
                        </button>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* People you may know */}
        <div className="mb-4 mt-3">
          <div className="d-flex justify-content-between text-dark small fw-semibold mb-2">
            <span>People you may know</span>
            <a href="#" className="text-decoration-none text-secondary">
              Show all
            </a>
          </div>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-3">
              {networkData.recommendations.slice(3, 22).map((recommendation, index) => (
                <div className="col-12 col-sm-4 col-md-4 col-lg-4" key={index}>
                  <article className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column">
                    <div className="w-100 bg-secondary" style={{ height: '80px', backgroundColor: '#f5f5f5' }} />
                    <div className="d-flex flex-column align-items-center px-3 pb-3" style={{ marginTop: '-40px' }}>
                      <img
                        src={recommendation.imageFile || 'https://via.placeholder.com/72'}
                        alt={recommendation.fullName}
                        className="rounded-circle border border-white"
                        style={{ width: '72px', height: '72px', objectFit: 'cover', borderWidth: '4px' }}
                      />
                      <p className="fw-semibold small mt-2 mb-0">{recommendation.fullName}</p>
                      <p className="text-muted small mb-0">{recommendation.source}</p>
                      <p className="text-secondary small d-flex align-items-center mt-1">
                        <i className="far fa-building me-1"></i>
                        <span>{recommendation.email}</span>
                      </p>
                      {connectionStatus[recommendation.id] === 'pending' ? (
                        <button className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1 w-100 justify-content-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z"
                              fill="black"
                            />
                          </svg>
                          Pending
                        </button>
                      ) : connectionStatus[recommendation.id] === 'sent' ? (
                        <button className="btn btn-outline-dark text-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1 w-100 justify-content-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.39967 7.66866L10.9937 10.2627L10.4283 10.8287L7.59967 7.99999V3.99999H8.39967V7.66866ZM7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.99967 13.8667C9.55561 13.8667 11.0478 13.2486 12.148 12.1484C13.2482 11.0481 13.8663 9.55593 13.8663 7.99999C13.8663 6.44406 13.2482 4.95185 12.148 3.85163C11.0478 2.75142 9.55561 2.13333 7.99967 2.13333C6.44374 2.13333 4.95153 2.75142 3.85131 3.85163C2.7511 4.95185 2.13301 6.44406 2.13301 7.99999C2.13301 9.55593 2.7511 11.0481 3.85131 12.1484C4.95153 13.2486 6.44374 13.8667 7.99967 13.8667Z"
                              fill="black"
                            />
                          </svg>
                          Pending
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill w-100 mt-2 d-flex align-items-center justify-content-center"
                          type="button"
                          onClick={() => handleConnect(recommendation.id, recommendation.id)}
                        >
                          <i className="fas fa-user-plus me-1"></i> Connect
                        </button>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NetworkMainSection;