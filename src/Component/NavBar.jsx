import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Dropdown, Modal } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaUser, FaCog, FaSignOutAlt, FaExchangeAlt, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../Axios/Axios';
import Swal from 'sweetalert2';

const Top = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false); // State for account settings modal
  const [userData, setUserData] = useState([]);
  
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("user_id");

  const handleProfileClose = () => setShowProfile(false);
  const handleProfileShow = () => setShowProfile(true);
  const handleAccountSettingsClose = () => setShowAccountSettings(false);
  const handleAccountSettingsShow = () => setShowAccountSettings(true);

  useEffect(() => {
    if (showProfile && userId) {
      Axios.get(`users/get/${userId}/`)
        .then((response) => {
          setUserData(response.data.user);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [showProfile, userId]);

  useEffect(() => {
    if (showAccountSettings && userId) {
      Axios.get(`users/edit/${userId}/`) // API for Account Settings
        .then((response) => {
          setUserData(response.data.user); // Assuming response contains the user details
        })
        .catch((error) => {
          console.error('Error fetching account settings:', error);
        });
    }
  }, [showAccountSettings, userId]);

  const navigate = useNavigate();

  const Logout = (logout) => {
    if (logout) {
      alert("Are you sure you want to logout?");
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'You have been logged out successfully.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/login");
      });
    } else {
      console.error('Logout failed');
    }
  };

  return (
    <div>
      <div className="container-fluid bg-white rounded p-3">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            {/* Search Bar */}
            <Form className="d-flex w-50">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control type="search" placeholder="Search" aria-label="Search" />
              </InputGroup>
            </Form>

            {/* Profile and Notification */}
            {/* <div className="d-flex align-items-center"> */}
              {/* Notification Icon */}
              <Button variant="outline-info" className="me-3">
                <FaBell />
              </Button>

              {/* Profile Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-profile">
                  <FaUserCircle size={24} />
                </Dropdown.Toggle>

                <Dropdown.Menu className='shadow mt-2'>
                  <Dropdown.Item className="mt-1" onClick={handleProfileShow}>
                    <div className="d-flex align-items-center">
                      <FaUserCircle size={33} className="me-2" />
                      <div className="d-flex flex-column">
                        <span className="fw-bold text-info">{username}</span>
                        <span className="text-muted" style={{ fontSize: "13px" }}>{email}</span>
                      </div>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item className='mt-1 text-muted' onClick={handleProfileShow}>
                    <FaUser className="me-2" /> View Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleAccountSettingsShow} className='mt-1 text-muted'>
                    <FaCog className="me-2" /> Account Settings
                  </Dropdown.Item>
                  <Dropdown.Item href="#/switch-account" className='mt-1 text-muted'>
                    <FaExchangeAlt className="me-2" /> Switch Account
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Link to="/login" className="text-primary" style={{ textDecoration: "none", fontSize: "18px" }}>
                    <Dropdown.Item onClick={Logout} className="mt-1 text-muted">
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          {/* </div> */}
        </div>

        {/* Profile Modal */}
        <Modal show={showProfile} onHide={handleProfileClose}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userData ? (
              <>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Role:</strong> {userData.role}</p>
                <p><strong>Gender:</strong> {userData.gender || 'Not specified'}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleProfileClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Account Settings Modal */}
        <Modal show={showAccountSettings} onHide={handleAccountSettingsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userData ? (
              <>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                {/* Add more fields from account settings as needed */}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAccountSettingsClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Top;
