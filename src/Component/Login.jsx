// import React, { useState, useEffect } from 'react';
// import Axios from '../Axios/Axios'
// import "../App.css";
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

// import { Form, Button, Col, Container, InputGroup, Row, Collapse } from 'react-bootstrap';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({
//     username: '',
//     password: '',
//     form: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: '',
//       form: ''
//     }));  // Clear errors when user types
//   };
 

//   const handleLogin = async (username, password) => {
//     setLoading(true);

//     try {
//       // First, make the login API request
//       const response = await Axios.post('login/', { username, password }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const { role, id } = response.data;
//       console.log("Role", role);

//       // Store the user id in localStorage
//       localStorage.setItem('user_id', id);
//       localStorage.setItem('username', response.data.username);
//       localStorage.setItem('email', response.data.email);

//       toast.success("Login successfully!");
//       console.log("Login successful:", response.data);

//       // Additional API call using the retrieved user_id
//       const userId = localStorage.getItem('user_id');
//       if (userId) {
//         await Axios.get(`user/${userId}/details/`, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         console.log("User data sent successfully");
//       }

//       // Redirect based on user role
//       if (role === "developer") {
//         navigate('/AdminDashboard');
//       } else if (role === "tester") {
//         navigate('/AdminDashboard');
//       } else if (role === "manager") {
//         console.log("manager");
//         navigate('/Dashbord');
//       } else if (role === "Designer") {
//         navigate('/AdminDashboard');
//       } else {
//         navigate('/Dashbord');
//       }

//     } catch (error) {
//       // Check if the error response contains a message
//       if (error.response && error.response.data && error.response.data.error) {
//         toast.warn(`Login Failed: ${error.response.data.error}`);
//       } else {
//         toast.warn("Login Failed: An unknown error occurred. Please try again.");
//       }

//       console.error('Login failed:', error.response ? error.response.data : error);
//       setErrors((prev) => ({
//         ...prev,
//         // form: 'Invalid username or password',
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };


//   const validateInputs = () => {
//     const newErrors = {};
//     if (!credentials.username.trim()) {
//       newErrors.username = 'Username is required';
//     }
//     if (!credentials.password.trim()) {
//       newErrors.password = 'Password is required';
//     }
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateInputs();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       handleLogin(credentials.username, credentials.password);
//     }
//   };

//   return (
//     <div>
//       <Container style={{ backgroundColor: "white" }}>
//         <Row className="justify-content-around align-items-center vh-50">
//           <Col md={5} lg={11}>
//             <h1 className='text-black h1 p-2 rounded mt-2' style={{ fontStyle: "oblique", boxShadow: "2px 2px 2px white -2px -2px -2px white" }}>
//               kite<span style={{ fontStyle: "oblique" }} className='text-info rounded py-0 px-1'>C</span>areer
//             </h1>
//           </Col>
//         </Row>
//       </Container>

//       <Container>
//         <Row className="d-flex justify-content-around align-items-center" style={{ backgroundColor: "white", marginTop: "50px" }}>
//           <Col xs={12} sm={10} md={10} lg={5}>
//             <Form onSubmit={handleSubmit} className='p-2 rounded bg-white'>
//               <h3 className='mb-4 h2' style={{ color: "rgb(4 255 236)" }}>Log-in</h3>
//               <hr className='text-dark' />

//               {errors.form && <div className="text-danger text-center mb-3">{errors.form}</div>}

//               {/* Username Field */}
//               <Form.Group controlId="formUsername" className="mb-3">
//                 <Form.Label className='text-dark'>Username</Form.Label>
//                 <InputGroup className='line-input'>
//                   <InputGroup.Text>
//                     <i className="bi bi-person text-info"></i>
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={credentials.username}
//                     onChange={handleChange}
//                     placeholder='Enter your Username'
//                     className={`border rounded ${errors.username ? 'is-invalid' : ''}`}
//                     autoComplete="off"
//                   />
//                 </InputGroup>
//                 {errors.username && <div className="text-danger">{errors.username}</div>}
//               </Form.Group>


//               <ToastContainer
//                 position="top-right" // Adjust the position as needed
//                 autoClose={5000} // Duration in milliseconds
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 pauseOnFocusLoss
//                 theme="light" // or "dark", based on your preference
//               />
//               {/* Password Field */}
//               <Form.Group controlId="formPassword" className="mb-3">
//                 <Form.Label className='text-dark'>Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <i className="bi bi-lock text-info"></i>
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     placeholder='Enter your Password'
//                     className={`border rounded ${errors.password ? 'is-invalid' : ''}`}
//                   />
//                 </InputGroup>
//                 {errors.password && <div className="text-danger">{errors.password}</div>}
//               </Form.Group>

//               {/* Submit Button */}
//               <Button style={{ backgroundColor: "rgb(69 213 202)", border: "none" }} type="submit" className="w-100" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </Form>
//           </Col>

//           <Col md={5}>
//             <img className='img-fluid' src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="Login Illustration" />
//           </Col>
//         </Row>
//       </Container>
//     </div>


//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import Axios from '../Axios/Axios';
// import "../App.css";
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Form, Button, Col, Container, InputGroup, Row, Modal } from 'react-bootstrap';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [errors, setErrors] = useState({ username: '', password: '', form: '' });
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState({ new_password: '', confirm_password: '' });
  
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: '',
//       form: ''
//     }));
//   };

//   // Forgot Password Request
//   const handleForgotPassword = async () => {
//     if (!email) {
//       toast.error("Email is required for password reset.");
//       return;
//     }

//     try {
//       await Axios.post('forgot-password/', { email });
//       toast.success('OTP sent to your email.');
//       setShowOTP(true); // Show OTP input after email is sent
//     } catch (error) {
//       toast.error('Failed to send OTP. Please try again.');
//     }
//   };

//   // Verify OTP
//   const handleVerifyOTP = async () => {
//     if (!otp) {
//       toast.error("OTP is required.");
//       return;
//     }

//     try {
//       await Axios.post('verify-otp/', { email, otp });
//       toast.success('OTP verified. You can now reset your password.');
//       setShowOTP(false);
//       setShowResetPassword(true); // Show reset password modal after OTP is verified
//     } catch (error) {
//       toast.error('Invalid OTP. Please try again.');
//     }
//   };

//   // Reset Password
//   const handleResetPassword = async () => {
//     if (!newPassword.new_password || !newPassword.confirm_password) {
//       toast.error("Both new password and confirm password are required.");
//       return;
//     }

//     if (newPassword.new_password !== newPassword.confirm_password) {
//       toast.error("Passwords don't match.");
//       return;
//     }

//     try {
//       await Axios.post('reset-password/', { 
//         email, 
//         new_password: newPassword.new_password, 
//         confirm_password: newPassword.confirm_password 
//       });
//       toast.success('Password reset successful. Please log in.');
//       setShowForgotPassword(false);
//       setShowResetPassword(false);
//     } catch (error) {
//       toast.error('Failed to reset password. Please try again.');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!credentials.username || !credentials.password) {
//       setErrors({ form: 'Both username and password are required' });
//       return;
//     }
    
//     handleLogin(credentials.username, credentials.password);
//   };

//   const handleLogin = async (username, password) => {
//     setLoading(true);

//     try {
//       const response = await Axios.post('login/', { username, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const { role, id } = response.data;

//       localStorage.setItem('user_id', id);
//       localStorage.setItem('username', response.data.username);
//       localStorage.setItem('email', response.data.email);

//       toast.success("Login successful!");
//       if (role === "developer" || role === "tester" || role === "Designer") {
//         navigate('/AdminDashboard');
//       } else if (role === "manager") {
//         navigate('/Dashbord');
//       } else {
//         navigate('/Dashbord');
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Container style={{ backgroundColor: "white" }}>
//         <Row className="justify-content-around align-items-center vh-50">
//           <Col md={5} lg={11}>
//             <h1 className='text-black h1 p-2 rounded mt-2' style={{ fontStyle: "oblique", boxShadow: "2px 2px 2px white -2px -2px -2px white" }}>
//               kite<span style={{ fontStyle: "oblique" }} className='text-info rounded py-0 px-1'>C</span>areer
//             </h1>
//           </Col>
//         </Row>
//       </Container>

// <Container>
//         <Row className="d-flex justify-content-around align-items-center" style={{ backgroundColor: "white", marginTop: "50px" }}>
//           <Col xs={12} sm={10} md={10} lg={5}>
//             <Form onSubmit={handleSubmit} className='p-2 rounded bg-white'>
//               <h3 className='mb-4 h2' style={{ color: "rgb(4 255 236)" }}>Log-in</h3>
//               <hr className='text-dark' />

//               {errors.form && <div className="text-danger text-center mb-3">{errors.form}</div>}

//               <Form.Group controlId="formUsername" className="mb-3">
//                 <Form.Label className='text-dark'>Username</Form.Label>
//                 <InputGroup className='line-input'>
//                   <InputGroup.Text><i className="bi bi-person text-info"></i></InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={credentials.username}
//                     onChange={handleChange}
//                     placeholder='Enter your Username'
//                     className={`border rounded ${errors.username ? 'is-invalid' : ''}`}
//                     autoComplete="off"
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group controlId="formPassword" className="mb-3">
//                 <Form.Label className='text-dark'>Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><i className="bi bi-lock text-info"></i></InputGroup.Text>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     placeholder='Enter your Password'
//                     className={`border rounded ${errors.password ? 'is-invalid' : ''}`}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Button style={{textAlign:"end"}} variant="link" onClick={() => setShowForgotPassword(true)} className="w-100 mt-3">
//                 Forgot Password?
//               </Button>

//               <Button style={{ backgroundColor: "rgb(69 213 202)", border: "none" }} type="submit" className="w-100" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>

            
//             </Form>
//           </Col>

//           <Col md={5}>
//             <img className='img-fluid' src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="Login Illustration" />
//           </Col>
//         </Row>
//       </Container>

     

//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />

//       {/* Modal for Forgot Password */}
//       <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Forgot Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {!showOTP ? (
//             <>
//               <Form.Group controlId="formEmail" className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" onClick={handleForgotPassword}>Send OTP</Button>
//             </>
//           ) : (
//             <>
//               <Form.Group controlId="formOtp" className="mb-3">
//                 <Form.Label>Enter OTP</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" onClick={handleVerifyOTP}>Verify OTP</Button>
//             </>
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* Modal for Reset Password */}
//       <Modal show={showResetPassword} onHide={() => setShowResetPassword(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Reset Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="formNewPassword" className="mb-3">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter new password"
//               value={newPassword.new_password}
//               onChange={(e) => setNewPassword({ ...newPassword, new_password: e.target.value })}
//             />
//           </Form.Group>

//           <Form.Group controlId="formConfirmPassword" className="mb-3">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Confirm new password"
//               value={newPassword.confirm_password}
//               onChange={(e) => setNewPassword({ ...newPassword, confirm_password: e.target.value })}
//             />
//           </Form.Group>

//           <Button variant="primary" onClick={handleResetPassword}>Reset Password</Button>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import Axios from '../Axios/Axios'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

import { Form, Button, Col, Container, InputGroup, Row, Collapse } from 'react-bootstrap';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
      form: ''
    }));  // Clear errors when user types
  };

  const handleLogin = async (username, password) => {
    setLoading(true);

    try {
      // First, make the login API request
      const response = await Axios.post('login/', { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { role, id } = response.data;
      console.log("Role", role);

      // Store the user id in localStorage
      localStorage.setItem('user_id', id);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);

      toast.success("Login successfully!");
      console.log("Login successful:", response.data);

      // Additional API call using the retrieved user_id
      const userId = localStorage.getItem('user_id');
      if (userId) {
        await Axios.get(`user/${userId}/details/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("User data sent successfully");
      }

      // Redirect based on user role
      if (role === "developer") {
        navigate('/AdminDashboard');
      } else if (role === "tester") {
        navigate('/AdminDashboard');
      } else if (role === "manager") {
        console.log("manager");
        navigate('/Dashbord');
      } else if (role === "Designer") {
        navigate('/AdminDashboard');
      } else {
        navigate('/Dashbord');
      }

    } catch (error) {
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.error) {
        toast.warn(`Login Failed: ${error.response.data.error}`);
      } else {
        toast.warn("Login Failed: An unknown error occurred. Please try again.");
      }

      console.error('Login failed:', error.response ? error.response.data : error);
      setErrors((prev) => ({
        ...prev,
        // form: 'Invalid username or password',
      }));
    } finally {
      setLoading(false);
    }
  };


  const validateInputs = () => {
    const newErrors = {};
    if (!credentials.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleLogin(credentials.username, credentials.password);
    }
  };

  return (
    <div>
      <Container style={{ backgroundColor: "white" }}>
        <Row className="justify-content-around align-items-center vh-50">
          <Col md={5} lg={11}>
            <h1 className='text-black h1 p-2 rounded mt-2' style={{ fontStyle: "oblique", boxShadow: "2px 2px 2px white -2px -2px -2px white" }}>
              kite<span style={{ fontStyle: "oblique" }} className='text-info rounded py-0 px-1'>C</span>areer
            </h1>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="d-flex justify-content-around align-items-center" style={{ backgroundColor: "white", marginTop: "50px" }}>
          <Col xs={12} sm={10} md={10} lg={5}>
            <Form onSubmit={handleSubmit} className='p-2 rounded bg-white'>
              <h3 className='mb-4 h2' style={{ color: "rgb(4 255 236)" }}>Log-in</h3>
              <hr className='text-dark' />

              {errors.form && <div className="text-danger text-center mb-3">{errors.form}</div>}

              {/* Username Field */}
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label className='text-dark'>Username</Form.Label>
                <InputGroup className='line-input'>
                  <InputGroup.Text>
                    <i className="bi bi-person text-info"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder='Enter your Username'
                    className={`border rounded ${errors.username ? 'is-invalid' : ''}`}
                    autoComplete="off"
                  />
                </InputGroup>
                {errors.username && <div className="text-danger">{errors.username}</div>}
              </Form.Group>


              <ToastContainer
                position="top-right" // Adjust the position as needed
                autoClose={5000} // Duration in milliseconds
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
                theme="light" // or "dark", based on your preference
              />
              {/* Password Field */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className='text-dark'>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-lock text-info"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder='Enter your Password'
                    className={`border rounded ${errors.password ? 'is-invalid' : ''}`}
                  />
                </InputGroup>
                {errors.password && <div className="text-danger">{errors.password}</div>}
                <Button variant="link" style={{fontWeight:"800px"}} onClick={() => navigate('/ForgotPassword')} className="w-100 mt-1 text-info text-decoration-none  text-end">
                Forgot Password?
              </Button>
              </Form.Group>

              {/* Submit Button */}
            

              <Button style={{ backgroundColor: "rgb(69 213 202)", border: "none" }} type="submit" className="w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

         
            </Form>
          </Col>

          <Col md={5}>
            <img className='img-fluid' src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="Login Illustration" />
          </Col>
        </Row>
      </Container>
    </div>


  );
};

export default Login;