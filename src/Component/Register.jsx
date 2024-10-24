import React, { useState } from 'react';
import Axios from '../Axios/Axios'
import swal from 'sweetalert';
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Container, Row, InputGroup } from 'react-bootstrap';
import google from "../assets/Google icon.png"
import facebk from "../assets/Fb icon.png"
import Swal from 'sweetalert2';
import GooleSign from '../Pages/GooleSign';
import FacebookAuth from './FacebookAuth';

const Register = () => {// Initialize state for formData, errors, and loading
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",  // phone_number is already included here
    agreeToTerms: false,
    role: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    agreeToTerms: "",
    role: "",
    gender: "",
    form: "",
  });

  const [loading, setLoading] = useState(false);
  const [showGoogleLogin, setShowGoogleLogin] = useState(true);

  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.phone_number) newErrors.phone_number = "You must enter your phone number";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
    if (!formData.role) newErrors.role = "You must select a role";
    if (!formData.gender) newErrors.gender = "You must select a gender";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors((prevErrors) => ({ ...prevErrors, form: "" }));

    try {
      // Submit the formData directly since phone_number is already correctly named
      const response = await Axios.post('register/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      const {error}=response.data;
      console.log("User registered successfully:", response.data);
      // swal("Register successfully!",error,"You clicked the button!", "success");

      // Redirect to login with username and password
      navigate('/login', { state: { username: formData.username, password: formData.password } });
    } catch (error) {
      console.error('Error:', error);
      swal("Got Error!", "You clicked the button!", "warning");

      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "An error occurred. Please try again.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "No response from the server. Please try again later.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };
  const handleAlreadyRegisteredClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be redirected to the login page.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, take me to login!',
      cancelButtonText: 'No, stay here'
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the login page and pass username and password through state
        navigate('/login', { state: { username: formData.username, password: formData.password } });
      }
    });
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    navigate('/Dashbord')
    console.log(credentialResponse);
    // You can also handle successful login here, e.g., navigate to a dashboard or set user info in local storage.
};

const handleGoogleLoginError = () => {
    console.log('Login Failed');
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newErrors = validateForm();
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setLoading(true);
  //   setErrors((prevErrors) => ({ ...prevErrors, form: "" }));

  //   try {
  //     const response = await Axios.post('register/', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     console.log("User registered successfully:", response.data);
  //     swal("Register successfully!", "You clicked the button!", "success");

  //     // Redirect to login with username and password
  //     navigate('/login', { state: { username: formData.username, password: formData.password } });
  //     // { state: { username: formData.username, password: formData.password } }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     swal("Got Error!", "You clicked the button!", "warning");
  //     if (error.response && error.response.data.errors) {
  //       setErrors(error.response.data.errors);
  //     } else if (error.response) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         form: "An error occurred. Please try again.",
  //       }));
  //     } else {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         form: "No response from the server. Please try again later.",
  //       }));
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center p-0  rounded" style={{ backgroundColor: "lavender" }}>
      <Row className="w-100  justify-content-center align-items-center">
        <Col xs={12} sm={10} md={8} lg={5} className=''>
          <Form onSubmit={handleSubmit} className='px-3 py-2 mt-2 mb-2 rounded bg-white'>
            <h3 className='text-center mb-2 mt-1  h2' style={{ color: "#5895ee" }}>Register</h3>
            <h3 className='text-center mb-4  h6' style={{ color: "gay" }}>Welcome back! Let's continue with,</h3>
            <hr className='text-dark' />
            <div>
              <div className="d-flex flex-column w-100 rounded flex-sm-row justify-content-around">
                {/* <button */}
                  {/* className='bg-light p-2 w-100 w-sm-50 border rounded my-1 my-sm-3 d-flex align-items-center justify-content-center' */}
                {/* > */}
                  {/* <img src={google} width={20} alt="Google Icon" className='me-2' /> Google
                   */}{showGoogleLogin && (
                    <GooleSign
                    onClick={() => setShowGoogleLogin(true)}
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    className="google-login-button" // Apply the custom class here
                  />
            )}
                {/* </button> */}

                {/* <button className='bg-light p-2 w-100 w-sm-50 border rounded my-1 my-sm-3 d-flex align-items-center justify-content-center'> */}
                 <FacebookAuth
                 className="rounded"
                 />
                {/* </button> */}
              </div>
            </div>

            {errors.form && <div className="text-danger text-center mb-2">{errors.form}</div>}

            <Form.Group controlId="formName" className="mb-1">
              <Form.Label className='text-dark'>Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person text-info w-100"></i> {/* Bootstrap icon for user */}
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Enter your Name'
                  className={`border rounded ${errors.username ? 'is-invalid' : ''}`}
                  // style={{ backgroundColor: "#adb5bd24", color: "dark" }}
                  autoComplete="off"
                />
              </InputGroup>
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-1">
              <Form.Label className='text-dark'>E-mail</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-envelope text-info"></i> {/* Bootstrap icon for email */}
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your Email'
                  className={`border rounded ${errors.email ? 'is-invalid' : ''}`}
                // style={{ backgroundColor: "#adb5bd24", color: "white" }}
                />
              </InputGroup>
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-1">
              <Form.Label className='text-dark'>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-lock text-info"></i> {/* Bootstrap icon for password */}
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your Password'
                  className={`border rounded ${errors.password ? 'is-invalid' : ''}`}
                // style={{ backgroundColor: "#adb5bd24", color: "white" }}
                />
              </InputGroup>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" className="mb-1">
              <Form.Label className="text-dark">Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-telephone text-info"></i> {/* Bootstrap icon for phone */}
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter your Phone Number"
                  className={`border rounded ${errors.phone_number ? 'is-invalid' : ''}`}
                  maxLength={15} // Example limit for phone numbers
                  pattern="[0-9]{10,15}" // Simple pattern to allow 10-15 digits
                  // required
                />
              </InputGroup>
              {errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
            </Form.Group>


            <Form.Group controlId="formGender" className="mb-1">
              <Form.Label className='text-dark'>Select Gender</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-gender-ambiguous text-info"></i> {/* Bootstrap icon for gender */}
                </InputGroup.Text>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`border rounded ${errors.gender ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </InputGroup>
              {errors.gender && <div className="text-danger">{errors.gender}</div>}
            </Form.Group>

            <Form.Group controlId="formRole" className="mb-1">
              <Form.Label className='text-dark'>Select Role</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-briefcase text-info"></i> {/* Bootstrap icon for role */}
                </InputGroup.Text>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`border rounded ${errors.role ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Role</option>
                  <option value="developer">Developer</option>
                  <option value="tester">Tester</option>
                  {/* <option value="manager">Manager</option> */}
                  <option value="Designer">Designer</option>
                </Form.Control>
              </InputGroup>
              {errors.role && <div className="text-danger">{errors.role}</div>}
            </Form.Group>
            <div className="my-2 d-flex justify-content-around align-items-center flex-wrap p-sm-0">
              <span>
                <Form.Group controlId="formAgreeToTerms" className="mb-1">
                  <Form.Check
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    label="I agree to the terms and conditions"
                    className={errors.agreeToTerms ? 'is-invalid' : ''}
                  />
                  {errors.agreeToTerms && <div className="text-danger">{errors.agreeToTerms}</div>}
                </Form.Group>
              </span>
              {/* Already Registered? */}
              <span
                onClick={handleAlreadyRegisteredClick}
                className='text-primary'
                style={{ cursor: 'pointer', color: '', textDecoration: 'underline' }}
              >
                Already registered? Click here to login
              </span>
            </div>
            <Button variant="primary" type='submit' className="w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container >


  );
};

export default Register;
