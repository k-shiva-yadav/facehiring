// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import totallogo from '../Assests/Images/HeroImg.png';  // Path to your other image
// // import totalthis from '../assests/UI/Itv final logo.png';  // Path to your other image
// import "../Assests/Css/login.css";  // Ensure this path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// import { Container, Row } from 'react-bootstrap';
// import { CgArrowLongRight } from "react-icons/cg";
// import google from '../Assests/Images/google.png';
// import fb from '../Assests/Images/Facebook.svg.png';
// import microsoft from '../Assests/Images/Microsoft.png';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();  // To handle redirect
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Basic validation
//     if (!email || !password) {
//       setErrorMessage('Please fill in both fields.');
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage('');

//     try {
//       // Using the exact endpoint from your Postman example
//       const response = await fetch('https://facehiringapi.codingster.in/User/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,

//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token or user data in localStorage if needed
//         localStorage.setItem('customerToken', data.token || data.accessToken);

//         onLogin(true);  // Set logged-in state to true
//         navigate('/home');  // Redirect to dashboard
//       } else {
//         // Handle error response from server
//         setErrorMessage(data.message || 'Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrorMessage('Network error. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* <Row className='mb-5'>
//         <img src={totalthis} alt="LogoImage" className="logo-image" />
//       </Row> */}
//       <Container>
//         <Row className="row w-100 p-5">
//           {/* Image Column (col-8) */}
//           <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center p-5 ">
//             <div className="image-container">
//               <img src={totallogo} alt="Main_Image" className="main-image w-100" />
//             </div>
//           </div>

//           {/* Login Form and Logo Column (col-4) */}
//           <div className="col-lg-6 col-md-6 col-12 login-card mb-5 px-5">
//             <div className="">
//               <div className="logo-container text-center mb-5">
//                 <h3>Log in</h3>
//                 <p>Hi, Welcome Back</p>
//               </div>
//               {errorMessage && <p className="error-message text-center">{errorMessage}</p>}

//               <form onSubmit={handleSubmit} className='px-5'>
//                 <div className="form-group mb-3">
//                   <label htmlFor="email" className="form-label">Email / Mobile No.</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="form-control"
//                     placeholder="Enter email/mobile no."
//                   />
//                 </div>

//                 <div className="form-group mb-4">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="form-control"
//                     placeholder="Enter password"
//                   />
//                 </div>
//                 <a href='/forgotpassword' className='link d-flex justify-content-end mb-4'>Forgot Password?</a>
//                 <button type="submit" className="submit-btn btn btn-primary w-100 ml-5">
//                   {isLoading ? 'Logging in...' : (
//                     <>
//                       Login <CgArrowLongRight className="arrow-icon" />
//                     </>
//                   )}

//                 </button>

//                 <div className="social-login mt-4 text-center">
//                   <p className="mb-3">Or login with</p>
//                   <div className="d-flex justify-content-center gap-3">
//                     <div className="circle-icon">
//                       <img src={google} alt="Google Login" />
//                     </div>
//                     <div className="circle-icon">
//                       <img src={microsoft} alt="Microsoft Login" />
//                     </div>
//                     <div className="circle-icon">
//                       <img src={fb} alt="Facebook Login" />
//                     </div>
//                   </div>
//                 </div>


//                 <p className='policytext mt-5'>Don’t have account? <span><a href='/register'>Sign Up</a></span></p>
//               </form>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;
// import React, { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row } from 'react-bootstrap';
// import { CgArrowLongRight } from "react-icons/cg";
// import totallogo from '../Assests/Images/HeroImg.png';
// import google from '../Assests/Images/google.png';
// import fb from '../Assests/Images/Facebook.svg.png';
// import microsoft from '../Assests/Images/Microsoft.png';
// import "../Assests/Css/login.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Memoized input handler
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setErrorMessage(''); // Clear error on input change
//   }, []);

//   const handleSubmit = useCallback(async (event) => {
//     event.preventDefault();
  
//     // Validation for missing fields
//     if (!formData.email || !formData.password) {
//       setErrorMessage('Please fill in both fields.');
//       return;
//     }
  
//     // Regular expressions for email and phone validation
//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
//     const isPhone = /^[0-9]{10}$/.test(formData.email);  // Assumes a 10-digit phone number
  
//     // Validate email or phone number format
//     if (!isEmail && !isPhone) {
//       setErrorMessage('Please enter a valid email or 10-digit phone number.');
//       return;
//     }
  
//     setIsLoading(true);
//     setErrorMessage('');  // Clear previous error
  
//     try {
//       const response = await axios.post(
//         'https://facehiringapi.codingster.in/User/Login',
//         {
//           password: formData.password,
//           ...(isEmail ? { email: formData.email } : { mobile: formData.email }) // Changed to 'mobile' for phone number
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           timeout: 10000 // 10 seconds timeout
//         }
//       );
  
//       const { token, accessToken } = response.data;
//       localStorage.setItem('token', token || accessToken);
      
//       onLogin?.(true);
//       navigate('/uipost');
//     } catch (error) {
//       console.error('Login error:', error);
//       const errorMsg = error.response?.data?.message || 
//                       error.message || 
//                       'Login failed. Please try again.';
//       setErrorMessage(errorMsg);
      
//       if (error.response?.status === 401) {
//         navigate('/forgotpassword'); // Redirect if unauthorized
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [formData, navigate, onLogin]);
  

//   return (
//     <div className="login-container">
//       <Container>
//         <Row className="row w-100 p-5">
//           {/* Image Section */}
//           <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center p-5">
//             <img 
//               src={totallogo} 
//               alt="Main_Image" 
//               className="main-image w-100" 
//               loading="lazy"
//             />
//           </div>

//           {/* Form Section */}
//           <div className="col-lg-6 col-md-6 col-12 login-card mb-5 px-5">
//             <div className="logo-container text-center mb-5">
//               <h3>Log in</h3>
//               <p>Hi, Welcome Back</p>
//             </div>

//             {errorMessage && (
//               <div className="alert alert-danger">{errorMessage}</div>
//             )}

//             <form onSubmit={handleSubmit} className='px-5'>
//               <div className="form-group mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email / Mobile No.
//                 </label>
//                 <input
//                   type="text"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Enter email or phone"
//                   required
//                   autoComplete="username"
//                 />
//               </div>

//               <div className="form-group mb-4">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Enter password"
//                   required
//                   autoComplete="current-password"
//                 />
//               </div>

//               <a href='/forgotpassword' className='link d-flex justify-content-end mb-4'>
//                 Forgot Password?
//               </a>

//               <button 
//                 type="submit" 
//                 className="submit-btn btn btn-primary w-100"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                 ) : (
//                   <>
//                     Login <CgArrowLongRight className="arrow-icon" />
//                   </>
//                 )}
//               </button>

//               <div className="social-login mt-4 text-center">
//                 <p className="mb-3">Or login with</p>
//                 <div className="d-flex justify-content-center gap-3">
//                   {[google, microsoft, fb].map((src, index) => (
//                     <div key={index} className="circle-icon">
//                       <img 
//                         src={src} 
//                         alt={`${['Google', 'Microsoft', 'Facebook'][index]} Login`} 
//                         loading="lazy"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <p className='policytext mt-5 text-center'>
//                 Don't have an account? <a href='/register'>Sign Up</a>
//               </p>
//             </form>
//           </div>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default React.memo(Login);
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { CgArrowLongRight } from "react-icons/cg";
import totallogo from '../Assests/Images/HeroImg.png';
import google from '../Assests/Images/google.png';
import fb from '../Assests/Images/Facebook.svg.png';
import microsoft from '../Assests/Images/Microsoft.png';
import "../Assests/Css/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormContext } from '../Context/FormContext';
import { useAuthContext } from '../Context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setStep } = useFormContext();
  const { login } = useAuthContext(); // Using login function from AuthContext

  // Validation functions
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in both fields.');
      return false;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPhone = /^[0-9]{10}$/.test(formData.email);

    if (!isEmail && !isPhone) {
      setErrorMessage('Please enter a valid email or 10-digit phone number.');
      return false;
    }

    return true;
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      const loginPayload = {
        password: formData.password,
        ...(isEmail ? { email: formData.email } : { mobile: formData.email })
      };

      const response = await axios.post(
        'https://facehiringapi.codingster.in/User/Login',
        loginPayload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        }
      );

      const { token, nextStep, userData } = response.data;
      if (!userData?.id) throw new Error('User ID not found in response.');

      // Use the login function from AuthContext
      await login(userData, token, userData.id);

      // Handle navigation based on registration step
      const targetStep = getRegistrationStep(nextStep);
      if (targetStep) {
        setStep(targetStep);
        navigate('/register');
      } else {
        navigate('/uipost');
      }
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate, setStep, login]);

  // Helper functions
  const getRegistrationStep = (nextStep) => {
    const stepMap = {
      'add-experience': 2,
      'add-education': 3,
      'add-skills': 4,
      'upload-documents': 5
    };
    return stepMap[nextStep] || null;
  };

  const handleLoginError = useCallback((error) => {
    console.error('Login error:', error);

    const status = error.response?.status;
    // start with either server’s message or a generic fallback
    let errorMsg = error.response?.data?.message
                   || error.message
                   || 'Login failed. Please try again.';

    if (status === 401) {
      // wrong email/password
      errorMsg = "Invalid credentials. Please try again or reset your password.";
      // if you prefer automatic nav to forgot-password, uncomment next line:
      // navigate('/forgotpassword');
    }
    else if (status === 404) {
      // user not in the system
      errorMsg = "No account found for that email/phone. Redirecting to Sign Up…";
      setErrorMessage(errorMsg);
      // give them 2 seconds to read it, then send them to the register page
      setTimeout(() => {
        navigate('/register');
      }, 2000);
      return;
    }

    // for all other cases (500, timeout, etc) we just show the message
    setErrorMessage(errorMsg);
  }, [navigate]);


  return (
    <div className="login-container">
      <Container>
        <Row className="row w-100 p-5">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center p-5">
            <img
              src={totallogo}
              alt="Main_Image"
              className="main-image w-100"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12 login-card mb-5 px-5">
            <div className="logo-container text-center mb-5">
              <h3>Log in</h3>
              <p>Hi, Welcome Back</p>
            </div>
            
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className='px-5' noValidate>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email / Mobile No.
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control form-control-rounded"
                  placeholder="Enter email or phone"
                  required
                  autoComplete="username"
                  aria-describedby="emailHelp"
                />
              </div>
              
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control form-control-rounded"
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
              </div>
              
              <div className="d-flex justify-content-end mb-4">
                <a href='/forgotpassword' className='link text-decoration-none'>
                  Forgot Password?
                </a>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn btn btn-primary w-100" 
                disabled={isLoading}
                aria-label={isLoading ? "Logging in..." : "Login"}
              >
                {isLoading ? (
                  <>
                    <span 
                      className="spinner-border spinner-border-sm me-2" 
                      role="status" 
                      aria-hidden="true"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  <>Login <CgArrowLongRight className="arrow-icon" /></>
                )}
              </button>
              
              <div className="social-login mt-4 text-center">
                <p className="mb-3">Or login with</p>
                <div className="d-flex justify-content-center gap-3">
                  {[
                    { src: google, alt: "Google", name: "Google" },
                    { src: microsoft, alt: "Microsoft", name: "Microsoft" },
                    { src: fb, alt: "Facebook", name: "Facebook" }
                  ].map((social, index) => (
                    <button 
                      key={index}
                      type="button"
                      className="circle-icon btn p-0 border-0 bg-transparent"
                      aria-label={`Login with ${social.name}`}
                    >
                      <img 
                        src={social.src} 
                        alt={social.alt} 
                        loading="lazy"
                        width="40"
                        height="40"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <p className='policytext mt-5 text-center'>
                Don't have an account?{' '}
                <a href='/register' className="text-decoration-none">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Login);