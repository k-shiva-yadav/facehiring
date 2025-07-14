// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import totallogo from '../Assests/Images/HeroImg.png';  // Path to your other image
// // import totalthis from '../assests/UI/Itv final logo.png';  // Path to your other image
// import "../Assests/Css/login.css";  // Ensure this path is correct
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// import { Container, Row } from 'react-bootstrap';
// import { CgArrowLongRight } from "react-icons/cg";


// const ResetPassword = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();  // To handle redirect

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Basic validation
//     if (!email || !password) {
//       setErrorMessage('Please fill in both fields.');
//       return;
//     }

//     // Simulate successful login (For demo purposes, you can use actual authentication)
//     if (email === 'admin@gmail.com' && password === 'abcd123#@!') {
//       setErrorMessage('');
//       onLogin(true);  // Set logged-in state to true
//       navigate('/dashboard');  // Redirect to dashboard
//     } else {
//       setErrorMessage('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <Row className='mb-5'>
//         {/* <img src={totalthis} alt="LogoImage" className="logo-image" /> */}
//       </Row>
//       <Container>
//       <Row className="row w-100">
//         {/* Image Column (col-8) */}
//         <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5 ">
//           <div className="image-container px-5">
//             <img src={totallogo} alt="Main_Image" className="main-image w-100 px-5" />
//           </div>
//         </div>

//         {/* Login Form and Logo Column (col-4) */}
//         <div className="col-lg-5 col-md-7 col-12 login-card mb-5">
//           <div className="">
//             <div className="logo-container text-center mb-4">
//               <h3>Reset Password</h3>
//             </div>
//             {errorMessage && <p className="error-message text-center">{errorMessage}</p>}
            
//             <form onSubmit={handleSubmit}>
              
//               <div className="form-group mb-4">
//                 <label htmlFor="password" className="form-label">New Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="form-control form-control-rounded"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="form-group mb-4">
//                 <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="form-control form-control-rounded"
//                   placeholder="Password"
//                 />
//               </div>
//               {/* <a href='/forgotpassword' className='link'>Forgot Password?</a> */}
//               <button type="submit" className="submit-btn btn btn-primary w-100 mt-3">
//                 Submit <CgArrowLongRight className="arrow-icon" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </Row>
//       </Container>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import totallogo from '../Assests/Images/HeroImg.png';  // Ensure path is correct
import "../Assests/Css/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { CgArrowLongRight } from "react-icons/cg";
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetUserId = localStorage.getItem('resetUserId');
    console.log("resetUserId", resetUserId);

    if (!password || !confirmPassword) {
      console.log("Empty fields:", { password, confirmPassword });
      setErrorMessage('Both fields are required.');
      return;
    }    

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'https://facehiringapi.codingster.in/User/ChangePassword',
        {
          password: password,
          id: resetUserId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const data = response.data;
      if (data.responceCode === 1) {
        alert('Password reset successful!');
        localStorage.removeItem('resetUserId'); // Optional cleanup
        navigate('/login');
      } else {
        setErrorMessage(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  
  return (
    <div className="login-container">
      <Row className='mb-5'></Row>
      <Container>
        <Row className="row w-100">
          {/* Image Column */}
          <div className="col-lg-7 col-md-5 col-12 d-flex justify-content-center align-items-center p-5">
            <div className="image-container px-5">
              <img src={totallogo} alt="Main_Image" className="main-image w-100 px-5" />
            </div>
          </div>

          {/* Reset Form Column */}
          <div className="col-lg-5 col-md-7 col-12 login-card mb-5">
            <div className="">
              <div className="logo-container text-center mb-4">
                <h3>Reset Password</h3>
              </div>
              {errorMessage && <p className="error-message text-center text-danger">{errorMessage}</p>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control form-control-rounded"
                    placeholder="New Password"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-control form-control-rounded"
                    placeholder="Confirm Password"
                  />
                </div>

                <button type="submit" className="submit-btn btn btn-primary w-100 mt-3">
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

export default ResetPassword;
