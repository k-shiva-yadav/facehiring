// // import { Col, Container, Row } from "react-bootstrap";
// // import toggle from '../Assests/Images/1 Toggle.png';

// // function Header() {
// //     return ( 
// //         <section className="header">
// //             <Container >
// //                 <div className="header-content d-flex justify-content-between align-items-center">
// //                         <div>
// //                         <p className="logo">Facehiring !</p>
// //                         </div>
// //                         <div className="menu">
// //                             <a href="/" className="menu-item">Skill Connection</a>
// //                             <a href="/" className="menu-item">Jobs</a>
// //                             <a href="/" className="menu-item">Companies</a>
// //                         </div>
// //                         <div className="header-btn">
// //                             <a href="/" className="sidemenu-item"><img src={toggle} alt="Toggle"></img></a>
// //                             <a href="/login" className="sidemenu-item">Log In</a>
// //                             {/* <span style={{color: "#fff"}}>|</span>
// //                             <a href="/" className="sidemenu-item">For Employers</a> */}
// //                         </div>
// //                 </div>
// //             </Container>
// //         </section>
// //      );
// // }

// // export default Header;


// import { Container, Row, Col } from "react-bootstrap";
// import { useHeader } from "../Context/HeaderContext";
// import { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

// function Header() {
//   const { isToggled, toggleHeader } = useHeader();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleToggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <section
//       className="header"
//       style={{
//         backgroundColor: isToggled ? "#3C5898" : "",
//         transition: "background-color 0.3s ease",
//         padding: "15px 0",
//       }}
//     >
//       <Container>
//         <Row className="align-items-center">
//           {/* Logo */}
//           <Col xs={9} lg={2}>
//             <a href="/" className="logo m-0" style={{ color: isToggled ? "#fff" : "", textDecoration: "none" }}>
//               Facehiring!
//             </a>

//           </Col>

//           {/* Hamburger (Mobile Only) */}
//           <Col xs={4} className="d-lg-none text-end">
//             <div onClick={handleToggleMenu}>
//               {menuOpen ? (
//                 <FaTimes color={isToggled ? "#fff" : "#000"} size={24} />
//               ) : (
//                 <FaBars color={isToggled ? "#fff" : "#000"} size={24} />
//               )}
//             </div>
//           </Col>

//           {/* Menu Links */}
//           <Col
//             lg={6}
//             className={`menu d-lg-flex justify-content-center gap-3 ${menuOpen ? "d-flex flex-column mt-3 text-center" : "d-none"
//               } d-lg-block`}
//           >
//             <a href="/" className="menu-item" style={{ color: isToggled ? "#fff" : "" }}>
//               Home
//             </a>
//             <a href="/" className="menu-item" style={{ color: isToggled ? "#fff" : "" }}>
//               Job
//             </a>
//             <a href="/" className="menu-item" style={{ color: isToggled ? "#fff" : "" }}>
//               My Network
//             </a>
//             <a href="/" className="menu-item" style={{ color: isToggled ? "#fff" : "" }}>
//               Competitions
//             </a>
//           </Col>

//           {/* Right Side Buttons */}
//           <Col
//             lg={3}
//             className={`header-btn d-lg-flex justify-content-end gap-3 align-items-center ${menuOpen ? "d-flex flex-column mt-3 text-center" : "d-none"
//               }`}
//           >
//             <div className="checkbox-apple">
//               <input
//                 className="yep"
//                 id="check-apple"
//                 type="checkbox"
//                 checked={isToggled}
//                 onChange={toggleHeader}
//               />
//               <label htmlFor="check-apple"></label>
//             </div>
//             <a href="/login" className="sidemenu-item" style={{ color: isToggled ? "#fff" : "" }}>
//               Log In
//             </a>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }

// export default Header;
// import { Container, Row, Col } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useHeader } from "../Context/HeaderContext";
// import { useAuthContext } from "../Context/AuthContext";

// function Header() {
//   const { isToggled, toggleHeader } = useHeader();
//   const { user, loading, logout } = useAuthContext();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [menuOpenDropdown, setMenuOpenDropdown] = useState(false);

//   // Image URL formatting function
//   const formatImageUrl = (url) => {
//     if (!url) return 'https://via.placeholder.com/150';
//     if (url.startsWith('http')) return url;
//     return `https://facehiringapi.codingster.in/DisplayImages/Images/${url}`;
//   };

//   // Derived state with proper image URL handling
//   const isLoggedIn = !!user;
//   const profileImage = formatImageUrl(user?.imageFile);
//   const userName = user
//     ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Profile'
//     : 'Profile';

//   const handleToggleDropdown = () => {
//     setMenuOpenDropdown((prev) => !prev);
//   };

//   const handleToggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuOpenDropdown && !event.target.closest('.profile-dropdown-container')) {
//         setMenuOpenDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [menuOpenDropdown]);

//   if (loading) {
//     return (
//       <section className="header" style={{ padding: "15px 0" }}>
//         <Container>
//           <Row className="align-items-center">
//             <Col xs={9} lg={2}>
//               <a
//                 href="/"
//                 className="logo m-0"
//                 style={{
//                   color: isToggled ? "#fff" : "",
//                   textDecoration: "none"
//                 }}
//               >
//                 Facehiring!
//               </a>
//             </Col>
//             <Col className="text-end">
//               <div className="spinner-border text-secondary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     );
//   }

//   return (
//     <section
//       className="header"
//       style={{
//         backgroundColor: isToggled ? "#3C5898" : "",
//         transition: "background-color 0.3s ease",
//         padding: "15px 0",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000
//       }}
//     >
//       <Container>
//         <Row className="align-items-center">
//           {/* Logo */}
//           <Col xs={9} lg={2}>
//             {/* <a
//               href="/"
//               className="logo m-0"
//               style={{ 
//                 color: isToggled ? "#fff" : "", 
//                 textDecoration: "none",
//                 fontWeight: "bold",
//                 fontSize: "1.5rem"
//               }}
//             >
//               Facehiring!
//             </a> */}
//             <a
//               href={isLoggedIn ? "/uipost" : "/"}
//               className="logo m-0"
//               style={{
//                 color: isToggled ? "#fff" : "",
//                 textDecoration: "none",
//                 fontWeight: "bold",
//                 fontSize: "1.5rem"
//               }}
//             >
//               Facehiring!
//             </a>

//           </Col>

//           {/* Hamburger Menu (Mobile) */}
//           <Col xs={4} className="d-lg-none text-end">
//             <div
//               onClick={handleToggleMenu}
//               style={{ cursor: "pointer" }}
//             >
//               {menuOpen ? (
//                 <FaTimes color={isToggled ? "#fff" : "#000"} size={24} />
//               ) : (
//                 <FaBars color={isToggled ? "#fff" : "#000"} size={24} />
//               )}
//             </div>
//           </Col>

//           {/* Navigation Links */}
//           <Col
//             lg={6}
//             className={`menu d-lg-flex justify-content-center gap-4 ${menuOpen ? "d-flex flex-column mt-3 text-center" : "d-none"
//               } d-lg-block`}
//           >
//             {/* <a
//               href="/"
//               className="menu-item"
//               style={{
//                 color: isToggled ? "#fff" : "#333",
//                 fontWeight: "500",
//                 textDecoration: "none"
//               }}
//             >
//               Home
//             </a> */}
//             <a
//               href={isLoggedIn ? "/uipost" : "/"}
//               className="menu-item"
//               style={{
//                 color: isToggled ? "#fff" : "#333",
//                 fontWeight: "500",
//                 textDecoration: "none",
//                 fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//               }}
//             >
//               Home
//             </a>
//             <a
//               href="/joblistings"
//               className="menu-item"
//               style={{
//                 color: isToggled ? "#fff" : "#333",
//                 fontWeight: "500",
//                 textDecoration: "none",
//                 fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//               }}
//             >
//               Jobs
//             </a>

//             <a
//               href="/network"
//               className="menu-item"
//               style={{
//                 color: isToggled ? "#fff" : "#333",
//                 fontWeight: "500",
//                 textDecoration: "none",
//                 fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//               }}
//             >
//               My Network
//             </a>
//             <a
//               href="/competitions"
//               className="menu-item"
//               style={{
//                 color: isToggled ? "#fff" : "#333",
//                 fontWeight: "500",
//                 textDecoration: "none",
//                 fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//               }}
//             >
//               Competitions
//             </a>
//           </Col>

//           {/* Right Side - Theme Toggle and Profile/Login */}
//           <Col
//             lg={3}
//             className={`header-btn d-lg-flex justify-content-end gap-3 align-items-center ${menuOpen ? "d-flex flex-column mt-3 text-center" : "d-none"
//               } d-lg-block`}
//           >
//             {/* Theme Toggle */}
//             <div className="checkbox-apple">
//               <input
//                 className="yep"
//                 id="check-apple"
//                 type="checkbox"
//                 checked={isToggled}
//                 onChange={toggleHeader}
//               />
//               <label htmlFor="check-apple"></label>
//             </div>

//             {/* Dynamic Profile/Login Section */}
//             {isLoggedIn ? (
//               <div className="profile-dropdown-container position-relative">
//                 <div
//                   className="d-flex align-items-center gap-2"
//                   onClick={handleToggleDropdown}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div style={{
//                     width: "36px",
//                     height: "36px",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     border: `2px solid ${isToggled ? '#fff' : '#3C5898'}`
//                   }}>
//                     <img
//                       src={profileImage}
//                       alt="Profile"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                       }}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: ""
//                       }}
//                     />
//                   </div>
//                   <span style={{
//                     color: isToggled ? "#fff" : "#000",
//                     fontWeight: "500"
//                   }}>
//                     {userName}
//                   </span>
//                 </div>

//                 {/* Dropdown Menu */}
//                 {menuOpenDropdown && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: 0,
//                       top: "100%",
//                       background: isToggled ? "#2a3f6d" : "#fff",
//                       borderRadius: "8px",
//                       boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                       zIndex: 1000,
//                       minWidth: "160px",
//                       padding: "8px 0",
//                       marginTop: "8px",
//                       border: `1px solid ${isToggled ? '#3C5898' : '#ddd'}`
//                     }}
//                   >

//                     <a
//                       href="/profile"
//                       style={{
//                         display: "block",
//                         padding: "8px 16px",
//                         color: isToggled ? "#fff" : "#000",
//                         textDecoration: "none",
//                         transition: "background-color 0.2s",
//                         fontWeight: "500",
//                         ":hover": {
//                           backgroundColor: isToggled ? "#3C5898" : "#f5f5f5"
//                         }
//                       }}
//                       onClick={() => setMenuOpenDropdown(false)}
//                     >
//                       My Profile
//                     </a>
//                     <div
//                       style={{
//                         display: "block",
//                         padding: "8px 16px",
//                         color: isToggled ? "#fff" : "#000",
//                         cursor: "pointer",
//                         transition: "background-color 0.2s",
//                         fontWeight: "500",
//                         ":hover": {
//                           backgroundColor: isToggled ? "#3C5898" : "#f5f5f5"
//                         }
//                       }}
//                       onClick={logout}
//                     >
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <a
//                 href="/login"
//                 style={{
//                   color: isToggled ? "#fff" : "#3C5898",
//                   textDecoration: "none",
//                   padding: "8px 16px",
//                   borderRadius: "4px",
//                   border: `1px solid ${isToggled ? '#fff' : '#3C5898'}`,
//                   fontWeight: "500",
//                   transition: "all 0.2s",
//                   ":hover": {
//                     backgroundColor: isToggled ? "#2a3f6d" : "#f5f5f5"
//                   }
//                 }}
//               >
//                 Log In
//               </a>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </section >
//   );
// }

// export default Header;


import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useHeader } from "../Context/HeaderContext";
import { useAuthContext } from "../Context/AuthContext";

function Header() {
  const { isToggled, toggleHeader } = useHeader();
  const { user, loading, logout } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenDropdown, setMenuOpenDropdown] = useState(false);

const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1078);

useEffect(() => {
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1078);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

const sectionStyle = {
  backgroundColor: isToggled ? "#3C5898" : "",
  padding: isLargeScreen ? "15px 40px" : "15px 0px",
  transition: "background-color 0.3s ease",
  position: "sticky",
  top: 0,
  zIndex: 1000
};


  // Image URL formatting function
  const formatImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/150';
    if (url.startsWith('http')) return url;
    return `https://facehiringapi.codingster.in/DisplayImages/Images/${url};`
  };

  // Derived state with proper image URL handling
  const isLoggedIn = !!user;
  const profileImage = formatImageUrl(user?.imageFile);
  const userName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Profile'
    : 'Profile';

  const handleToggleDropdown = () => {
    setMenuOpenDropdown((prev) => !prev);
  };

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpenDropdown && !event.target.closest('.profile-dropdown-container')) {
        setMenuOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpenDropdown]);

  if (loading) {
    return (
      <section className="header" style={{ padding: "15px 0" }}>
        <Container fluid>
          <Row className="align-items-center ">
            <Col xs={9} lg={2}>
              <a
                href="/"
                className="logo m-0"
                style={{
                  color: isToggled ? "#fff" : "",
                  textDecoration: "none"
                }}
              >
               {/* <img
    src="/images/FACEHIRE-LOGO.png"
    alt="Facehiring Logo"
    style={{ height: "40px", objectFit: "contain" }}
  /> */}
  {/* Facehiring! */}
  <img
  src={isToggled ? "/images/FACEHIRE-LOGO.png" : "/images/FACEHIRE-LOGO-DARK.png"}
  alt="Facehiring Logo"
  style={{ height: "40px", objectFit: "contain" }}
/>
              </a>
            </Col>
            <Col className="text-end">
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section
      className="header"
    style={sectionStyle}
    >
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          {/* Logo */}
          <Col xs="auto" lg={2}>
            <a
              href={isLoggedIn ? "/uipost" : "/"}
              className="logo m-0"
              style={{
                color: isToggled ? "#fff" : "",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.5rem"
              }}
            >
              {/* Facehiring! */}
                {/* <img
    src="/images/FACEHIRE-LOGO.png"
    alt="Facehiring Logo"
    style={{ height: "40px", objectFit: "contain" }}
  /> */}
  <img
  src={isToggled ? "/images/FACEHIRE-LOGO.png" : "/images/FACEHIRE-LOGO-DARK.png"}
  alt="Facehiring Logo"
  style={{ height: "40px", objectFit: "contain" }}
/>
            </a>
          </Col>

          {/* Hamburger Menu (Mobile) */}
          <Col xs={4} className="d-lg-none text-end">
            <div
              onClick={handleToggleMenu}
              style={{ cursor: "pointer" }}
            >
              {menuOpen ? (
                <FaTimes color={isToggled ? "#fff" : "#000"} size={24} />
              ) : (
                <FaBars color={isToggled ? "#fff" : "#000"} size={24} />
              )}
            </div>
          </Col>

          {/* Navigation Links */}
          <Col
            lg={4}
            className={`menu d-lg-flex  ${menuOpen ? "d-flex flex-column mt-3 text-center" : "d-none"} d-lg-block`}
          >
            <a
              href={isLoggedIn ? "/uipost" : "/"}
              className="menu-item"
              style={{
                color: isToggled ? "#fff" : "#333",
                fontWeight: "500",
                fontSize: '15px',
                textDecoration: "none",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            >
              Home
            </a>
            <a
              href="/joblistings"
              className="menu-item"
              style={{
                color: isToggled ? "#fff" : "#333",
                fontWeight: "500",
                fontSize: '15px',
                textDecoration: "none",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            >
              Jobs
            </a>
            <a
              href="/network"
              className="menu-item"
              style={{
                color: isToggled ? "#fff" : "#333",
                fontWeight: "500",
                fontSize: '15px',
                textDecoration: "none",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            >
              My Network
            </a>
            <a
              href="/competitions"
              className="menu-item"
              style={{
                color: isToggled ? "#fff" : "#333",
                fontWeight: "500",
                fontSize: '15px',
                textDecoration: "none",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            >
              Competitions
            </a>
          </Col>

          {/* Right Side - Search, Theme Toggle, Message, Notification, and Profile/Login */}
          <Col
            lg={5}
            className={`header-btn d-lg-flex justify-content-end gap-3 align-items-center ${menuOpen ? "d-flex flex-column mt-3 text-center" : "d-none"} d-lg-block`}
          >
            {/* Search Bar */}
            {isLoggedIn && (
              <>
                <div
                  className="search-bar"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    background: isToggled ? "#2a3f6d" : "#f5f5f5",
                    borderRadius: "20px",
                    padding: "8px 15px",
                    width: "250px",
                    border: `1px solid ${isToggled ? "#3C5898" : "#ddd"}`
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isToggled ? "#fff" : "#333"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "10px" }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: isToggled ? "#fff" : "#333",
                      fontSize: "16px",
                      width: "100%",
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                    }}
                  />
                </div>
              </>
            )}

            {/* Theme Toggle */}
            <div className="checkbox-apple">
              <input
                className="yep"
                id="check-apple"
                type="checkbox"
                checked={isToggled}
                onChange={toggleHeader}
              />
              <label htmlFor="check-apple"></label>
            </div>
            {isLoggedIn && (
              <>
                {/* Message Icon */}
                <div style={{ cursor: "pointer" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isToggled ? "#fff" : "#333"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.11111 7.47059H16.8889M7.11111 12.6471H14.4444M19.3333 1C20.3058 1 21.2384 1.40903 21.9261 2.13712C22.6137 2.8652 23 3.85269 23 4.88235V15.2353C23 16.265 22.6137 17.2525 21.9261 17.9805C21.2384 18.7086 20.3058 19.1176 19.3333 19.1176H13.2222L7.11111 23V19.1176H4.66667C3.69421 19.1176 2.76158 18.7086 2.07394 17.9805C1.38631 17.2525 1 16.265 1 15.2353V4.88235C1 3.85269 1.38631 2.8652 2.07394 2.13712C2.76158 1.40903 3.69421 1 4.66667 1H19.3333Z"
                      stroke={isToggled ? "#fff" : "#333"}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Notification Icon */}
                <div style={{ cursor: "pointer" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isToggled ? "#fff" : "#333"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5.58784 12.4486C5.50875 13.9609 5.59975 15.5708 4.24884 16.5837C3.93825 16.8161 3.68622 17.1178 3.51281 17.4648C3.3394 17.8118 3.24941 18.1945 3.25 18.5824C3.25 19.6625 4.09717 20.5833 5.2 20.5833H20.8C21.9028 20.5833 22.75 19.6625 22.75 18.5824C22.75 17.7959 22.3795 17.0549 21.7512 16.5837C20.4003 15.5708 20.4913 13.9609 20.4122 12.4486C20.3147 10.5485 19.4912 8.75843 18.1119 7.44802C16.7325 6.13762 14.9026 5.40697 13 5.40697C11.0974 5.40697 9.2675 6.13762 7.88814 7.44802C6.50878 8.75843 5.68533 10.5485 5.58784 12.4486Z"
                      stroke={isToggled ? "#fff" : "#333"}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.25 20.5833C16.25 21.4453 15.9076 22.2719 15.2981 22.8814C14.6886 23.4909 13.862 23.8333 13 23.8333C12.138 23.8333 11.3114 23.4909 10.7019 22.8814C10.0924 22.2719 9.75 21.4453 9.75 20.5833M11.375 3.38542C11.375 4.28242 12.103 5.41667 13 5.41667C13.897 5.41667 14.625 4.28242 14.625 3.38542C14.625 2.48842 13.897 2.16667 13 2.16667C12.103 2.16667 11.375 2.48842 11.375 3.38542Z"
                      stroke={isToggled ? "#fff" : "#333"}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </>
            )}

            {/* Dynamic Profile/Login Section */}
            {isLoggedIn ? (
              <div className="profile-dropdown-container" style={{ position: "relative", zIndex: 2000 }} >
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={handleToggleDropdown}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `2px solid ${isToggled ? '#fff' : '#3C5898'}`
                    }}
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                      style={{
                        width: "100%",
                        height: "100%",

                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: isToggled ? "#fff" : "#000",
                      fontWeight: "500"
                    }}
                  >
                    {userName}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {/* {menuOpenDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      background: isToggled ? "#2a3f6d" : "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      zIndex: 9999,
                      minWidth: "160px",
                      padding: "8px 0",
                      // marginTop: "8px",
                      border: 1px solid ${isToggled ? '#3C5898' : '#ddd'}
                    }}
                  >
                    <a
                      href="/profile"
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        color: isToggled ? "#fff" : "#000",
                        textDecoration: "none",
                        transition: "background-color 0.2s",
                        fontWeight: "500",
                      }}
                      onClick={() => setMenuOpenDropdown(false)}
                    >
                      My Profile
                    </a>
                    <div
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        color: isToggled ? "#fff" : "#000",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        fontWeight: "500",
                      }}
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </div>
                )} */}
                {menuOpenDropdown && (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "100%",
        background: isToggled ? "#2a3f6d" : "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        zIndex: 3000, // Make sure it's on top
        minWidth: "160px",
        padding: "8px 0",
        marginTop: "8px",
        border: `1px solid ${isToggled ? '#3C5898' : '#ddd'}`
      }}
    >
      <a
        href="/profile"
        style={{
          display: "block",
          padding: "8px 16px",
          color: isToggled ? "#fff" : "#000",
          textDecoration: "none",
          transition: "background-color 0.2s",
          fontWeight: "500",
        }}
        onClick={() => setMenuOpenDropdown(false)}
      >
        My Profile
      </a>
      <div
        style={{
          display: "block",
          padding: "8px 16px",
          color: isToggled ? "#fff" : "#000",
          cursor: "pointer",
          transition: "background-color 0.2s",
          fontWeight: "500",
        }}
        onClick={logout}
      >
        Logout
      </div>
    </div>
  )}
              </div>
            ) : (
              <a
                href="/login"
                style={{
                  color: isToggled ? "#fff" : "#3C5898",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: `1px solid ${isToggled ? '#fff' : '#3C5898'}`,
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
              >
                Log In
              </a>
            )}
          </Col>
        </Row>
      </Container>
    </section >
  );
}

export default Header;