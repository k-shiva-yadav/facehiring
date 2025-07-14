// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import sideimage from '../Assests/Images/HeroImg.png';  
// // import "../Assests/Css/login.css";  // Ensure this path is correct
// // import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// // import { CgArrowLongRight } from "react-icons/cg";
// // import { Container, Row } from 'react-bootstrap';
// // const OTP = ({ onLogin }) => {
// //   const [otp, setOtp] = useState(['', '', '', '']);

// //   const [errorMessage, setErrorMessage] = useState('');
// //   const navigate = useNavigate();  // To handle redirect

// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     const otpValue = otp.join('');

// //     // Basic validation
// //     if (otpValue.length !== 4) {
// //       setErrorMessage('Please enter the complete 4-digit OTP.');
// //       return;
// //     }

// //     // Here you would validate the OTP with your backend
// //     // For demo purposes:
// //     if (otpValue === '1234') {
// //       setErrorMessage('');
// //       onLogin(true);  // Set logged-in state to true
// //       navigate('/dashboard');  // Redirect to dashboard
// //     } else {
// //       setErrorMessage('Invalid OTP. Please try again.');
// //       navigate('/setpassword');
// //     }
// //   };


// //   return (
// //     <div className="login-container">
// //       {/* <Row className='mb-5'>
// //         <img src={totalthis} alt="LogoImage" className="logo-image" />
// //       </Row> */}
// //       <Container>
// //       <Row className="row w-100 align-items-center">
// //         {/* Image Column (col-8) */}
// //         <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5 ">
// //           <div className="image-container">
// //             <img src={sideimage} alt="Main_Image" className="main-image w-100" />
// //           </div>
// //         </div>

// //         {/* Login Form and Logo Column (col-4) */}
// //         <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
// //           <div className="">
// //             <div className="logo-container text-center mb-4">
// //               <h3>Enter OTP?</h3>
// //               <p className='otptext'>An 4 digit code has been sent to <br/>
// //               Email address or +91 **********</p>
// //             </div>

// //             {errorMessage && <p className="error-message text-center">{errorMessage}</p>}

// //             <form onSubmit={handleSubmit}>
// //             <div className="form-group mb-3">
// //                 {/* <label htmlFor="otp" className="form-label">Enter OTP</label> */}
// //                 <div className="d-flex justify-content-center otp">
// //                   {[0, 1, 2, 3].map((index) => (
// //                     <input
// //                       key={index}
// //                       type="text"
// //                       maxLength="1"
// //                       className="form-control form-control-rounded text-center mx-1"
// //                       onChange={(e) => {
// //                         const newOtp = [...otp];
// //                         newOtp[index] = e.target.value;
// //                         setOtp(newOtp);

// //                         // Auto-focus next input after entering a digit
// //                         if (e.target.value && e.target.nextElementSibling) {
// //                           e.target.nextElementSibling.focus();
// //                         }
// //                       }}
// //                       onKeyDown={(e) => {
// //                         // Handle backspace to go to previous input
// //                         if (e.key === 'Backspace' && !e.target.value && e.target.previousElementSibling) {
// //                           e.target.previousElementSibling.focus();
// //                         }
// //                       }}
// //                     />
// //                   ))}
// //                 </div>
// //               </div>



// //               <p className='m-0 policytext text-center '>Don’t receive OTP ? <a href="/login">Resend</a>  </p>
// //               <button type="submit" className="submit-btn btn btn-primary w-100 mt-5">
// //                 Verify <CgArrowLongRight className="arrow-icon" />
// //               </button>

// //             </form>
// //           </div>
// //         </div>
// //       </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default OTP;





// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import sideimage from '../Assests/Images/HeroImg.png';
// // import "../Assests/Css/login.css";  // Ensure this path is correct
// // import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// // import { CgArrowLongRight } from "react-icons/cg";
// // import { Container, Row } from 'react-bootstrap';
// // import axios from 'axios';

// // const OTP = () => {
// //   const [otp, setOtp] = useState(['', '', '', '']);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const navigate = useNavigate();  // To handle redirect

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     const otpValue = otp.join('');

// //     // Basic validation
// //     if (otpValue.length !== 4) {
// //       setErrorMessage('Please enter the complete 4-digit OTP.');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `https://facehiringapi.codingster.in/User/OTP_userVerify?otp=${otpValue}`,
// //         {}, // Empty body if only OTP is required
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       console.log('OTP verified successfully:', response.data);

// //       // Handle successful OTP verification
// //       if (response.data.responceCode === 1) {
// //         setErrorMessage('');
// //         localStorage.setItem('resetUserId', response.data.userData.id);
// //         navigate('/resetpassword');  // Redirect to reset password page
// //       } else {
// //         setErrorMessage(response.data.message || 'Invalid OTP. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Error during OTP verification:', error);
// //       setErrorMessage('An error occurred. Please try again later.');
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <Container>
// //         <Row className="row w-100 align-items-center">
// //           {/* Image Column (col-8) */}
// //           <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5">
// //             <div className="image-container">
// //               <img src={sideimage} alt="Main_Image" className="main-image w-100" />
// //             </div>
// //           </div>

// //           {/* OTP Form Column (col-4) */}
// //           <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
// //             <div className="">
// //               <div className="logo-container text-center mb-4">
// //                 <h3>Enter OTP</h3>
// //                 <p className='otptext'>
// //                   A 4-digit code has been sent to <br />
// //                   Email address or +91 **********
// //                 </p>
// //               </div>

// //               {errorMessage && <p className="error-message text-center">{errorMessage}</p>}

// //               <form onSubmit={handleSubmit}>
// //                 <div className="form-group mb-3">
// //                   <div className="d-flex justify-content-center otp">
// //                     {[0, 1, 2, 3].map((index) => (
// //                       <input
// //                         key={index}
// //                         type="text"
// //                         maxLength="1"
// //                         className="form-control form-control-rounded text-center mx-1"
// //                         value={otp[index]}
// //                         onChange={(e) => {
// //                           const newOtp = [...otp];
// //                           newOtp[index] = e.target.value;
// //                           setOtp(newOtp);

// //                           // Auto-focus next input after entering a digit
// //                           if (e.target.value && e.target.nextElementSibling) {
// //                             e.target.nextElementSibling.focus();
// //                           }
// //                         }}
// //                         onKeyDown={(e) => {
// //                           // Handle backspace to go to previous input
// //                           if (e.key === 'Backspace' && !e.target.value && e.target.previousElementSibling) {
// //                             e.target.previousElementSibling.focus();
// //                           }
// //                         }}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <p className='m-0 policytext text-center'>Don’t receive OTP? <a href="/login">Resend</a></p>
// //                 <button type="submit" className="submit-btn btn btn-primary w-100 mt-5">
// //                   Verify <CgArrowLongRight className="arrow-icon" />
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default OTP;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import sideimage from '../Assests/Images/HeroImg.png';
// import '../Assests/Css/login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { CgArrowLongRight } from 'react-icons/cg';
// import { Container, Row } from 'react-bootstrap';
// import axios from 'axios';

// const OTP = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isResendDisabled, setIsResendDisabled] = useState(true); // Start disabled for initial cooldown
//   const [cooldown, setCooldown] = useState(20); // 20-second cooldown
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract emailOrMobile from location.state
//   const emailOrMobile = location.state?.contact || 'your email or mobile number';

//   // Handle initial 20-second cooldown when component mounts
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCooldown((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setIsResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const otpValue = otp.join('');

//     if (otpValue.length !== 4) {
//       setErrorMessage('Please enter the complete 4-digit OTP.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/User/OTP_userVerify?otp=${otpValue}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.responceCode === 1) {
//         setErrorMessage('');
//         localStorage.setItem('resetUserId', response.data.userData.id);
//         navigate('/resetpassword');
//       } else {
//         setErrorMessage(response.data.message || 'Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during OTP verification:', error);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   const handleResendOTP = async () => {
//     if (isResendDisabled) return;

//     setIsResendDisabled(true);
//     setCooldown(20); // Reset cooldown to 20 seconds
//     setSuccessMessage('');
//     setErrorMessage('');

//     const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
//     const queryParam = isEmail
//       ? `Email=${encodeURIComponent(emailOrMobile)}`
//       : `Mobile=${encodeURIComponent(emailOrMobile)}`;

//     try {
//       const response = await axios.post(
//         `https://facehiringapi.codingster.in/User/User_ForgetPassword?${queryParam}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const data = response.data;

//       if (response.status === 200 && data.responceCode === 1) {
//         setErrorMessage('');
//         setSuccessMessage('OTP resent successfully!');
//         setOtp(['', '', '', '']); // Reset OTP inputs
//         // Start cooldown timer
//         const interval = setInterval(() => {
//           setCooldown((prev) => {
//             if (prev <= 1) {
//               clearInterval(interval);
//               setIsResendDisabled(false);
//               return 0;
//             }
//             return prev - 1;
//           });
//         }, 1000);
//       } else {
//         setErrorMessage(data.message || 'Failed to resend OTP. Please try again.');
//         setSuccessMessage('');
//         setIsResendDisabled(false); // Re-enable if API fails
//         setCooldown(0);
//       }
//     } catch (error) {
//       console.error('Error resending OTP:', error);
//       setErrorMessage('Network error. Please try again later.');
//       setSuccessMessage('');
//       setIsResendDisabled(false); // Re-enable on network error
//       setCooldown(0);
//     }
//   };

//   return (
//     <div className="login-container">
//       <Container>
//         <Row className="row w-100 align-items-center">
//           <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5">
//             <div className="image-container">
//               <img src={sideimage} alt="Main_Image" className="main-image w-100" />
//             </div>
//           </div>

//           <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
//             <div>
//               <div className="logo-container text-center mb-4">
//                 <h3>Enter OTP</h3>
//                 <p className="otptext">
//                   A 4-digit code has been sent to <br />
//                   <strong>{emailOrMobile}</strong>
//                 </p>
//               </div>

//               {errorMessage && (
//                 <p className="error-message text-center text-danger">{errorMessage}</p>
//               )}
//               {successMessage && (
//                 <p className="success-message text-center text-success">{successMessage}</p>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group mb-3">
//                   <div className="d-flex justify-content-center otp">
//                     {[0, 1, 2, 3].map((index) => (
//                       <input
//                         key={index}
//                         type="text"
//                         maxLength="1"
//                         className="form-control form-control-rounded text-center mx-1"
//                         value={otp[index]}
//                         onChange={(e) => {
//                           const newOtp = [...otp];
//                           newOtp[index] = e.target.value;
//                           setOtp(newOtp);
//                           if (e.target.value && e.target.nextElementSibling) {
//                             e.target.nextElementSibling.focus();
//                           }
//                         }}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Backspace' && !e.target.value && e.target.previousElementSibling) {
//                             e.target.previousElementSibling.focus();
//                           }
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <p className="m-0 policytext text-center">
//                   Don’t receive OTP?{' '}
//                   {isResendDisabled ? (
//                     <span>Resend in {cooldown}s</span>
//                   ) : (
//                     <a href="#" onClick={handleResendOTP} style={{ cursor: 'pointer' }}>
//                       Resend
//                     </a>
//                   )}
//                 </p>
//                 <button type="submit" className="submit-btn btn btn-primary w-100 mt-5">
//                   Verify <CgArrowLongRight className="arrow-icon" />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default OTP;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import sideimage from '../Assests/Images/HeroImg.png';
import '../Assests/Css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CgArrowLongRight } from 'react-icons/cg';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [cooldown, setCooldown] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const emailOrMobile = location.state?.contact || 'your email or mobile number';

  // DRY cooldown logic
  const startCooldown = () => {
    setCooldown(20);
    setIsResendDisabled(true);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCooldown();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 4) {
      setErrorMessage('Please enter the complete 4-digit OTP.');
      return;
    }

    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/User/OTP_userVerify?otp=${otpValue}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.responceCode === 1) {
        setErrorMessage('');
        localStorage.setItem('resetUserId', response.data.userData.id);
        navigate('/resetpassword');
      } else {
        setErrorMessage(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      if (error.response) {
        setErrorMessage(error.response.data?.message || 'Server error.');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    }
  };

  const handleResendOTP = async () => {
    if (isResendDisabled) return;

    setSuccessMessage('');
    setErrorMessage('');
    startCooldown();

    const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
    const queryParam = isEmail
      ? `Email=${encodeURIComponent(emailOrMobile)}`
      : `Mobile=${encodeURIComponent(emailOrMobile)}`;

    try {
      const response = await axios.post(
        `https://facehiringapi.codingster.in/User/User_ForgetPassword?${queryParam}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 && response.data.responceCode === 1) {
        setSuccessMessage('OTP resent successfully!');
        setOtp(['', '', '', '']);
      } else {
        setErrorMessage(response.data.message || 'Failed to resend OTP. Please try again.');
        setIsResendDisabled(false);
        setCooldown(0);
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      if (error.response) {
        setErrorMessage(error.response.data?.message || 'Server error.');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
      setIsResendDisabled(false);
      setCooldown(0);
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="w-100 align-items-center">
          <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5">
            <div className="image-container">
              <img src={sideimage} alt="Main_Image" className="main-image w-100" />
            </div>
          </div>

          <div className="col-lg-5 col-md-7 col-12 login-card mb-5 px-5">
            <div>
              <div className="logo-container text-center mb-4">
                <h3>Enter OTP</h3>
                <p className="otptext">
                  A 4-digit code has been sent to <br />
                  <strong>{emailOrMobile}</strong>
                </p>
              </div>

              {errorMessage && (
                <p className="error-message text-center text-danger">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="success-message text-center text-success">{successMessage}</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <div className="d-flex justify-content-center otp">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        aria-label={`OTP Digit ${index + 1}`}
                        className="form-control form-control-rounded text-center mx-1"
                        maxLength="1"
                        autoFocus={index === 0}
                        value={otp[index]}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d?$/.test(value)) {
                            const newOtp = [...otp];
                            newOtp[index] = value;
                            setOtp(newOtp);
                            if (value && e.target.nextElementSibling) {
                              e.target.nextElementSibling.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !e.target.value && e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="m-0 policytext text-center">
                  Don’t receive OTP?{' '}
                  {isResendDisabled ? (
                    <span>Resend in {cooldown}s</span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={handleResendOTP}
                      disabled={isResendDisabled}
                      style={{ textDecoration: 'underline', color: 'blue', background: 'none' }}
                    >
                      Resend
                    </button>
                  )}
                </p>

                <button type="submit" className="submit-btn btn btn-primary w-100 mt-5">
                  Verify <CgArrowLongRight className="arrow-icon" />
                </button>
              </form>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default OTP;
