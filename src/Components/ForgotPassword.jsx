// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import sideimg from '../Assests/Images/HeroImg.png';  // Path to your other image
// import "../Assests/Css/login.css";  // Ensure this path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// import { Container, Row } from 'react-bootstrap';
// import { CgArrowLongRight } from "react-icons/cg";
// const ForgotPassword = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();  // To handle redirect

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Basic validation
//     if (!email) {
//       setErrorMessage('Please fill in both fields.');
//       return;
//     }

//     // Simulate successful login (For demo purposes, you can use actual authentication)
//     if (email === 'admin@gmail.com') {
//       setErrorMessage('');
//       onLogin(true);  // Set logged-in state to true
//       navigate('/otp');  // Redirect to dashboard
//     } else {
//       setErrorMessage('Invalid credentials. Please try again.');
//       navigate('/otp');
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* <Row className='mb-5'>
//         <img src={totalthis} alt="LogoImage" className="logo-image" />
//       </Row> */}
//       <Container>
//         <Row className="row w-100 align-content-center p-5 align-items-center">
//           {/* Image Column (col-8) */}
//           <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5 ">
//             <div className="image-container">
//               <img src={sideimg} alt="Main_Image" className="main-image w-100" />
//             </div>
//           </div>

//           {/* Login Form and Logo Column (col-4) */}
//           <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
//             <div className="">
//               <div className="logo-container text-center mb-4">
//                 <h3 className='mb-5'>Forgot Password</h3>
//               </div>
//               {errorMessage && <p className="error-message text-center">{errorMessage}</p>}

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mb-3">
//                   <label htmlFor="email" className="form-label">Email / Mobile No.</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="form-control form-control-rounded"
//                     placeholder="Enter email/mobile no."
//                   />
//                 </div>

//                 {/* <button type="submit" className="submit-btn btn btn-primary w-100 mt-3">
//                 Continue <CgArrowLongRight className="arrow-icon" />
//               </button> */}
//                 <button type="submit" className="submit-btn custom-flex-btn">
//                   Submit <CgArrowLongRight className="arrow-icon" />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ForgotPassword;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import sideimg from '../Assests/Images/HeroImg.png';
// import "../Assests/Css/login.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row } from 'react-bootstrap';
// import { CgArrowLongRight } from "react-icons/cg";

// const ForgotPassword = ({ onLogin }) => {
//   const [emailOrMobile, setEmailOrMobile] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!emailOrMobile.trim()) {
//       setErrorMessage('Please enter your email or mobile number.');
//       return;
//     }

//     const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
//     const queryParam = isEmail
//       ? `Email=${encodeURIComponent(emailOrMobile)}`
//       : `Mobile=${encodeURIComponent(emailOrMobile)}`;

//       debugger;
//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/User/User_ForgetPassword?${queryParam}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       const data = response.data;

//       if (response.status === 200 && data.responceCode === 1) {
//         setErrorMessage('');
//         navigate('/otp', { state: { user: data.userData } });
//       } else {
//         setErrorMessage(data.message || 'Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Network error. Please try again later.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <Container>
//         <Row className="row w-100 align-content-center p-5 align-items-center">
//           {/* Image Column */}
//           <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5">
//             <div className="image-container">
//               <img src={sideimg} alt="Main_Image" className="main-image w-100" />
//             </div>
//           </div>

//           {/* Form Column */}
//           <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
//             <div className="">
//               <div className="logo-container text-center mb-4">
//                 <h3 className='mb-5'>Forgot Password</h3>
//               </div>
//               {errorMessage && <p className="error-message text-center text-danger">{errorMessage}</p>}

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mb-3">
//                   <label htmlFor="emailOrMobile" className="form-label">Email / Mobile No.</label>
//                   <input
//                     type="text"
//                     id="emailOrMobile"
//                     value={emailOrMobile}
//                     onChange={(e) => setEmailOrMobile(e.target.value)}
//                     required
//                     className="form-control form-control-rounded"
//                     placeholder="Enter email or mobile number"
//                   />
//                 </div>

//                 <button type="submit" className="submit-btn custom-flex-btn">
//                   Submit <CgArrowLongRight className="arrow-icon" />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sideimg from '../Assests/Images/HeroImg.png';
import "../Assests/Css/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { CgArrowLongRight } from "react-icons/cg";

const ForgotPassword = ({ onLogin }) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailOrMobile.trim()) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }

    const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
    const queryParam = isEmail
      ? `Email=${encodeURIComponent(emailOrMobile)}`
      : `Mobile=${encodeURIComponent(emailOrMobile)}`;

    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/User/User_ForgetPassword?${queryParam}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data;

      if (response.status === 200 && data.responceCode === 1) {
        setErrorMessage('');
        navigate('/otp', { state: { user: data.userData, contact: emailOrMobile } });
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="row w-100 align-content-center p-5 align-items-center">
          <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5">
            <div className="image-container">
              <img src={sideimg} alt="Main_Image" className="main-image w-100" />
            </div>
          </div>

          <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
            <div className="">
              <div className="logo-container text-center mb-4">
                <h3 className='mb-5'>Forgot Password</h3>
              </div>
              {errorMessage && <p className="error-message text-center text-danger">{errorMessage}</p>}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="emailOrMobile" className="form-label">Email / Mobile No.</label>
                  <input
                    type="text"
                    id="emailOrMobile"
                    value={emailOrMobile}
                    onChange={(e) => setEmailOrMobile(e.target.value)}
                    required
                    className="form-control form-control-rounded"
                    placeholder="Enter email or mobile number"
                  />
                </div>

                <button type="submit" className="submit-btn custom-flex-btn">
                  Submit <CgArrowLongRight className="arrow-icon" />
                </button>
              </form>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
