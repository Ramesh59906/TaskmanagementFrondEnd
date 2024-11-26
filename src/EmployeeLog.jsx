import { faCog, faComments, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBell, FaUserCircle, FaUser, FaCog, FaSignOutAlt, FaExchangeAlt, FaSearch, FaEdit } from 'react-icons/fa';
import { FaEnvelope, FaBriefcase, FaTransgender, FaPhone } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Chatbox from './Component/ChatBox';
import AdminDashboard from './Component/AdminDashboard';
import Swal from 'sweetalert2';
import Axios from '../src/Axios/Axios'
import logo from "./assets/Google icon.png"

function OffcanvasExample() {
  const currentDate = new Date();
  const day = currentDate.toLocaleString('en-us', { weekday: 'long' });
  const date = currentDate.getDate();
  const month = currentDate.toLocaleString('en-us', { month: 'long' });
  const [sow, setsow] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [editedData, setEditedData] = useState({ username: '', email: '', role: '', gender: '', phone_number: '' }); // State to hold edited values

  

  const handleshow = () => {
    setsow(true);
  }
  const handleCloseAddModal = () => {
    setsow(false);
  }
  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode when the edit icon is clicked
  };
  
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);

    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("user_id"); // Ensure that userId is stored in localStorage

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // localStorage.setItem('userId', '66e183496d92eeb894e70116'); // Example of storing userId


  useEffect(() => {
    if (show && userId) {
      // API call to fetch user details by ID
      Axios.get(`users/get/${userId}/`)
        .then((response) => {
          setUserData(response.data.user);
          
          console.log(response.data.users);
        })
        .catch((error) => {
          setError(err.message);
          console.error('Error fetching user details:', error);
        });
    }
  }, [show, userId]);


  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setCurrentTime(now.toLocaleTimeString([], options));
    };

    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const navigate = useNavigate();

  const handleEditSave = () => {
    Axios.put(`users/edit/${userId}/`, editedData)
      .then((response) => {
        const {message}=response.data;
        setUserData(response.data.user); // Update user data locally
        setIsEditing(false); // Exit edit mode
        setShow(false);
        Swal.fire('Profile updated successfully!',message, 'success'); // Show success message
        navigate('/AdminDashboard')
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        Swal.fire('Failed to update profile',error, 'error'); // Show error message
      });
  };


  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };



  const Logout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        Swal.fire('Logged out', 'You have been logged out.', 'success').then(() => {
          navigate('/login');
        });
      }
    });
  };
  if (error) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap:"wrap",
            height: "100vh",
            fontSize: "30px",
            fontWeight: "300",
            color: "red",
        }}>
          <div>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-frustrated-with-404-error-illustration-download-in-svg-png-gif-file-formats--line-logo-page-not-found-internet-network-interruption-pack-design-development-illustrations-5059514.png?f=webp" alt="" />
     <br /><span className='fs-5'>    Error:"Looks like you're not connected to the internet"</span>
          </div>
  
        </div>
    );
}
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className=" pt-2 mb-3">
          <Container fluid>
            <Navbar.Toggle style={{ border: "none" }} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand className="ms-2 fs-2" style={{ fontWeight: "200" }}>
              Kite<span className="fs-1 text-info">C</span>areer
            </Navbar.Brand>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Navbar.Brand className="ms-2 fs-3" style={{fontSize:"14px",fontWeight:"100"}}>
                    Pr<span className="text-dark">o</span>file
                  </Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='d-flex justify-content-center align-items-start flex-grow-2'>
                <Nav className="justify-content-around flex-grow-1">
                  {/* Add profile logo here */}
                  <div className="d-flex justify-content-center mb-3">
                    <img src={logo} alt="Profile Logo" className="rounded-circle" style={{ width: '170px', height: '160px' }} />
                  </div>

                  <Nav.Link  onClick={handleShow} className="text-dark  px-4 mt-2" style={{fontSize:"14px",fontWeight:"100"}}>
                    <FaUser className="me-2 text-dark" /> View Profile
                  </Nav.Link>
                  <Nav.Link href="#accountSetting" className="text-dark px-4 mt-2" style={{fontSize:"14px",fontWeight:"100"}}>
                    <FaExchangeAlt className="me-2 text-dark"  /> Account Settings
                  </Nav.Link>
                  <Nav.Link href="#switchAccount" className="text-dark px-4 mt-2" style={{fontSize:"14px",fontWeight:"100"}}>
                    <FontAwesomeIcon icon={faCog} className="me-2 text-dark"  /> Switch Account
                  </Nav.Link>
                  {/* <Nav.Link  className="text-dark fs-5 px-4 mt-2">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2 text-info" /> Logout
                  </Nav.Link> */}
                    <Nav.Link
                to="/login"
              className="text-dark fs-5 px-4 mt-2"
                style={{ textDecoration: "none", fontSize: "14px" }}
                onClick={() => {
                  // Clear localStorage values for username and email
                  localStorage.removeItem('username');
                  localStorage.removeItem('email');
                }}
              >
                <Dropdown.Item onClick={Logout}   className="" style={{fontSize:"14px",fontWeight:"100"}}>
                  <FaSignOutAlt className="me-2 text-dark"  /> Logout
                </Dropdown.Item>
              </Nav.Link>
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <Container fluid className=''>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-md-start text-center mb-3 mb-md-0">
            <h1 className="text-info"> Hi {username}!</h1>
            <span>{`${day}, ${month} ${date}`}</span>
          </Col>
          <Col xs={12} md={6} className="text-md-end text-center">
            <Link to="#" className="text-black" style={{ textDecoration: "none", fontSize: "18px" }}>
              <FontAwesomeIcon icon={faComments} onClick={handleshow} className="me-3" style={{ fontSize: '1.4rem', cursor: "pointer" }} />
            </Link>

            <FaBell className="me-3" style={{ fontSize: '1.5rem', cursor: "pointer" }} />
            {/* <FaEllipsisv style={{ fontSize: '1.5rem', cursor: "pointer" }} className="text-info" /> */}
          </Col>
        </Row>
      </Container>

        {/* </Modal> */}
   {/* Profile Modal */}
   <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>
    {isEditing ? (
      <>
        <Form.Group controlId="editUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={editedData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="editEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="editRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="role"
            value={editedData.role}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="editGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            value={editedData.gender}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="editPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            value={editedData.phone_number}
            onChange={handleChange}
          />
        </Form.Group>
      </>
    ) : (
      <>
        {userData ? (
          <>
            <p>
              <strong>Username:</strong> {userData.username}
              <FaEdit
                className="ms-2"
                onClick={handleEditClick}
                style={{ cursor: 'pointer' }}
              />
            </p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Gender:</strong> {userData.gender || 'Not specified'}</p>
            <p><strong>Phone Number:</strong> {userData.phone_number || 'Not specified'}</p>
          </>
        ) : (
          <p>Loading user data...</p> 
        )}
      </>
    )}
  </Modal.Body> */}
          <Modal.Body>
            {isEditing ? (
              <>
                {/* Editing form for user details */}
                <Form.Group controlId="editUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={editedData.username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="editEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="editRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={editedData.role}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="editGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    name="gender"
                    value={editedData.gender}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="editPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={editedData.phone_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            ) : (
              <>
                {/* Displaying user details with icons */}
                {userData ? (
                  <>
                   <div className='d-flex justify-content-around'>
                   <div className="text-center mb-3  position-relative d-inline-block">
                      {/* Profile Image */}
                      <Image
                        src={userData.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JumjzSdtJIufDf48neTD-6a9W3LsANS-yitEENmgeCk4iNcdgplI5BrFXoMPE3rggPs&usqp=CAU'}
                        roundedCircle
                        width={100}
                        height={100}
                        alt="Profile"
                      />

                      {/* Edit Icon */}
                      <FaEdit
                        className="edit-icon text-warning"
                        onClick={handleEditClick}
                        
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                   </div>

                    <div className="my-2 d-flex justify-content-around align-items-center flex-wrap p-sm-0">
                      <p>
                        <FaUser className="me-2 text-info" />
                        <strong>Username:</strong> {userData.username}
                        <hr className='text-info'/>
                      </p>
                      
                      <p>
                        <FaEnvelope className="me-2 text-info" />
                        <strong>Email:</strong> {userData.email}
                        <hr className='text-info'/>
                      </p>
                      <p>
                        <FaPhone className="me-2 text-info" />
                        <strong>Phone:</strong> {userData.phone_number || 'Not specified'}
                        <hr className='text-info'/>
                      </p>
                      <p>
                        <FaBriefcase className="me-2 text-info" />
                        <strong>Role:</strong> {userData.role}
                        <hr className='text-info'/>
                      </p>
               
                      <p>
                        <FaTransgender className="me-2 text-info" />
                        <strong>Gender:</strong> {userData.gender || 'Not specified'}
                        <hr className='text-info'/>
                      </p>

                    </div>
                  </>
                ) : (
                  <p>Loading user data...</p> // Placeholder while fetching data
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <Button variant="primary" onClick={handleEditSave}>
                Save Changes
              </Button>
            ) : null}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      <Container>
        {/* <Row className="mt-3">
          <Col xs={12} style={{backgroundColor:"rgb(71 71 71)"}} className="rounded">
            <h2 style={{ color: 'white' }} className="p-2">
              + Add Task
            </h2>
          </Col>
        </Row> */}
      </Container>

      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-md-start text-center mb-3 mb-md-0">
            {/* <AdminDashboard/> */}
          </Col>
          {/* <Col xs={12} md={6} className="text-md-end text-center">
     
          </Col> */}
        </Row>
      </Container>
      <Modal show={sow} onHide={() => setsow(false)} size="lg" closeButton>
        <Modal.Header closeButton>
          <h1>ChatBox</h1>
        </Modal.Header>
        <Modal.Body>
          <Chatbox />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OffcanvasExample;
