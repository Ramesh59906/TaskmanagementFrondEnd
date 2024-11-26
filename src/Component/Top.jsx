// import React, { useState, useEffect } from 'react';
// import { Form, Button, InputGroup, Dropdown, Modal } from 'react-bootstrap';
// import { FaBell, FaUserCircle, FaUser, FaCog, FaSignOutAlt, FaExchangeAlt, FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import Axios from '../Axios/Axios'
// import { BarChart } from '@mui/x-charts/BarChart';
// import CategoryChart from './CategoryChart';
// import CategoryByChart from './CategoryByChart';
// import Swal from 'sweetalert2';


// const Top = () => {
//   const [show, setShow] = useState(false);
//   const [userData, setUserData] = useState([]);

//     const username = localStorage.getItem("username");
//     const email = localStorage.getItem("email");
//     const userId = localStorage.getItem("user_id"); // Ensure that userId is stored in localStorage

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   // localStorage.setItem('userId', '66e183496d92eeb894e70116'); // Example of storing userId


//   useEffect(() => {
//     if (show && userId) {
//       // API call to fetch user details by ID
//       Axios.get(`users/get/${userId}/`)
//         .then((response) => {
//           setUserData(response.data.user);
//           console.log(response.data.users);
//         })
//         .catch((error) => {
//           console.error('Error fetching user details:', error);
//         });
//     }
//   }, [show, userId]);


//   const [currentTime, setCurrentTime] = useState('');

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
//       setCurrentTime(now.toLocaleTimeString([], options));
//     };

//     updateTime(); // Set initial time
//     const intervalId = setInterval(updateTime, 1000); // Update every second

//     return () => clearInterval(intervalId); // Cleanup interval on unmount
//   }, []);

//   const navigate = useNavigate();

//   const Logout = (logout) => {

//     if (logout) {
//       // Show SweetAlert success message
//       alert("Are you sure you want to logout")
//       Swal.fire({
//         icon: 'success',
//         title: 'Logout Successful',
//         text: 'You have been logged out successfully.',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         // After closing the alert, navigate to the login page
//         navigate("/login");
//       });
//     } else {
//       // Log error if logout fails
//       console.error('Logout failed');
//     }
//   };

//   return (
//     <div>
//       <div className="container-fluid bg-white rounded p-3">
//       <div className="row">
//       <div className="col-12 d-flex justify-content-between align-items-center">
//         {/* Search Bar */}
//         <Form className="d-flex w-50">
//           <InputGroup>
//             <InputGroup.Text>
//               <FaSearch />
//             </InputGroup.Text>
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//             />
//           </InputGroup>
//         </Form>

//         {/* Time Display */}
//         <div className="text-muted px-4 py-1 text-white">
//              <button className='px-2'  style={{ fontSize: "18px", marginRight: "20px",borderRadius:"0%",backgroundColor:"lightblue",color:"black",border:"none"}}> {currentTime}</button>
//         </div>

//         {/* Profile and Notification */}
//         <div className="d-flex align-items-center">
//           {/* Notification Icon */}
//           <Button variant="outline-info" className="me-3">
//             <FaBell />
//           </Button>

//           {/* Profile Dropdown */}
//           <Dropdown align="end">
//             <Dropdown.Toggle variant="outline-secondary" id="dropdown-profile">
//               <FaUserCircle size={24} />
//             </Dropdown.Toggle>

//             <Dropdown.Menu className='shadow mt-2'>
//               <Dropdown.Item className="mt-1" onClick={handleShow}>
//                 <div className="d-flex align-items-center">
//                   <FaUserCircle size={33} className="me-2" />
//                   <div className="d-flex flex-column">
//                     <span className="fw-bold text-info">{username}</span>
//                     <span className="text-muted" style={{ fontSize: "13px" }}>{email}</span>
//                   </div>
//                 </div>
//               </Dropdown.Item>

//               <Dropdown.Item className='mt-1 text-muted' onClick={handleShow}>
//                 <FaUser className="me-2" /> View Profile
//               </Dropdown.Item>
//               <Dropdown.Item href="#/account-settings" className='mt-1 text-muted'>
//                 <FaCog className="me-2" /> Account Settings
//               </Dropdown.Item>
//               <Dropdown.Item href="#/switch-account" className='mt-1 text-muted'>
//                 <FaExchangeAlt className="me-2" /> Switch Account
//               </Dropdown.Item>
//               <Dropdown.Divider />
//               <Link
//                 to="/login"
//                 className="text-primary"
//                 style={{ textDecoration: "none", fontSize: "18px" }}
//                 onClick={() => {
//                   // Clear localStorage values for username and email
//                   localStorage.removeItem('username');
//                   localStorage.removeItem('email');
//                 }}
//               >
//                 <Dropdown.Item onClick={Logout}   className="mt-1 text-muted">
//                   <FaSignOutAlt className="me-2" /> Logout
//                 </Dropdown.Item>
//               </Link>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//     </div>

//         {/* Profile Modal */}
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {userData ? (
//               <>
//                 <p><strong>Username:</strong> {userData.username}</p>
//                 <p><strong>Email:</strong> {userData.email}</p>
//                 <p><strong>Role:</strong> {userData.role}</p>
//                 <p><strong>Gender:</strong> {userData.gender || 'Not specified'}</p>
//               </>
//             ) : (
//               <p>Loading...</p>
//             )}
//             {/* {userData.map((items,index)=>(
//              <div>
//               <p>{items.username}</p>
//             </div>
//           ))} */}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>

//       </div>
//       <div className='container-fluid'>
//         <div className="row justify-content-around">
//           <div className="col-md-7 bg-white mt-4 shadow rounded">
//             <CategoryChart />
//           </div>
//           <div className="col-md-4 bg-white mt-4 shadow rounded">
//             <CategoryByChart />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Top;

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Dropdown, Modal } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaUser, FaCog, FaSignOutAlt, FaExchangeAlt, FaSearch, FaEdit } from 'react-icons/fa';
import { FaEnvelope, FaBriefcase, FaTransgender, FaPhone } from 'react-icons/fa';
// import { Image } from 'react-bootstrap'; // For profile image
import { Image, Row, Col } from 'react-bootstrap';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../Axios/Axios'
import Swal from 'sweetalert2';
import { BarChart } from '@mui/x-charts/BarChart';
import CategoryChart from './CategoryChart';
import CategoryByChart from './CategoryByChart';
import Weather from './Weather';


const Top = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [editedData, setEditedData] = useState({ username: '', email: '', role: '', gender: '', phone_number: '' }); // State to hold edited values

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("user_id");

  const handleClose = () => {
    setShow(false);
    setIsEditing(false); // Exit edit mode when modal closes
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show && userId) {
      Axios.get(`users/get/${userId}/`)
        .then((response) => {
          setUserData(response.data.user);
          setEditedData({ username: response.data.user.username, email: response.data.user.email, role: response.data.user.role, gender: response.data.user.gender, phone_number: response.data.user.phone_number });
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [show, userId]);

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode when the edit icon is clicked
  };

  // const handleEditSave = () => {
  //   // Call the edit API when the user saves changes
  //   Axios.put(`users/edit/${userId}/`, editedData)
  //     .then((response) => {
  //       setUserData(response.data.user); // Update userData with the response
  //       setIsEditing(false); // Exit edit mode
  //       // toast.success('Profile updated successfully!'); // Show success toast
  //       navigate(0); // Reload the current page to reflect changes

  //     })
  //     .catch((error) => {
  //       console.error('Error updating user details:', error);
  //       // toast.error('Failed to update profile.'); // Show error toast
  //     });
  // };
  const handleEditSave = () => {
    Axios.put(`users/edit/${userId}/`, editedData)
      .then((response) => {
        setUserData(response.data.user); // Update user data locally
        setIsEditing(false); // Exit edit mode
        setShow(false);
        Swal.fire('Profile updated successfully!', '', 'success'); // Show success message
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        Swal.fire('Failed to update profile', '', 'error'); // Show error message
      });
  };


  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

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

  return (
    <div>
      <div className="container-fluid bg-white rounded p-3">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <Form className="d-flex w-50">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control type="search" placeholder="Search" aria-label="Search" />
              </InputGroup>
            </Form>

            {/* <div className="text-muted px-4 py-1 text-white">
              <button className="px-2" style={{ fontSize: "18px", marginRight: "20px", borderRadius: "0%", backgroundColor: "lightblue", color: "black", border: "none" }}>
                {currentTime}
              
              </button>
            </div> */}

            <div className="d-flex align-items-center">
              <Button variant="" className="me-0">
                <FaBell className='fs-5' />
              </Button>

              <Dropdown align="end">
                <Dropdown.Toggle variant="" id="dropdown-profile">
                  <FaUserCircle className='fs-4' />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow mt-2">
                  <Dropdown.Item className="mt-1" onClick={handleShow}>
                    <div className="d-flex align-items-center">
                      <FaUserCircle size={33} className="me-2" />
                      <div className="d-flex flex-column">
                        <span className="fw-bold text-info">{username}</span>
                        <span className="text-muted" style={{ fontSize: "13px" }}>{email}</span>
                      </div>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item className="mt-1 text-muted" onClick={handleShow}>
                    <FaUser className="me-2" /> View Profile
                  </Dropdown.Item>
                  <Dropdown.Item className="mt-1 text-muted">
                    <FaCog className="me-2" /> Account Settings
                  </Dropdown.Item>
                  <Dropdown.Item className="mt-1 text-muted">
                    <FaExchangeAlt className="me-2" /> Switch Account
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={Logout} className="mt-1 text-muted">
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

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

      </div>
      <div className='container-fluid'>
        <div className="row justify-content-around">
          <div className="col-md-7 bg-white mt-4 shadow rounded">
            <CategoryChart />
          </div>
          <div className="col-md-4 bg-white mt-4 shadow rounded">
            <CategoryByChart />
          </div>   
          <div className="col-md-7  mt-4  rounded">
             {/* <Weather/> */}
          </div> 
          {/* <div className="col-md-4  mt-4  rounded">
             <Weather/>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Top;
