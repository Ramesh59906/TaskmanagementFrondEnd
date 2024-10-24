// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Link, Route, Routes } from 'react-router-dom';
// import User from '../Pages/User';
// import Project from '../Pages/Project';
// import Taskmanage from '../Pages/Taskmanage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faUser, faProjectDiagram, faTasks, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';
// import "../App.css"

// function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [colour, setcolour] = useState(false);

//   const checolour = () => {
//     setcolour(true);
//   };
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     // Automatically hide sidebar on mobile and medium devices
//     const handleResize = () => {
//       if (window.innerWidth <= 992) { // 992px covers both mobile and medium devices
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true); // Show sidebar on larger screens by default
//       }
//     };

//     // Initialize the sidebar state based on current window width
//     handleResize();

//     // Attach the resize event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup the event listener on component unmount
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col xs={0} md={isSidebarOpen ? 2 : 1} style={{ minHeight: "100vh", backgroundColor: "" }} className="text-white p-3 sidebar">
//           {/* Sidebar toggle button */}

//           <div className="sidebar-toggle d-flex justify-content-between">

//             <img width={100}  style={{ mixBlendMode: "darken" }} src="data:image/png;base64,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" alt="Kite Icon" className="me-2" />


//             <FontAwesomeIcon onClick={toggleSidebar} icon={faBars} className="text-dark mt-2" />
//           </div>

//           {/* Sidebar content */}
//           {isSidebarOpen && (
//             <div style={{ minHeight: "100%", borderRadius: "10px", backgroundColor: "white", display: "flex", justifyContent: "center", flexWrap: "wrap", alignContent: "start", marginTop: "50px", border: "0px solid lightgray" }}>
//               <div className=''>
//                 <h4 className="mt-4  text-dark">Dashboard</h4>
//                 <hr className='text-dark' />
//                 <ul className="list-unstyled">


//                   <li className="mt-3">
//                     <Link to="/Dashbord/user" className="text-primary" style={{ textDecoration: "none", fontSize: "20px" }}>
//                       <FontAwesomeIcon icon={faUser} className="me-2" />  <span className='text-dark'>User</span>
//                     </Link>
//                   </li>
//                   <li className="mt-3">
//                     <Link to="/Dashbord/Project" className="text-primary" style={{ textDecoration: "none", fontSize: "20px" }}>
//                       <FontAwesomeIcon icon={faProjectDiagram} className="me-2" /> <span className='text-dark'>Project </span>
//                     </Link>
//                   </li>
//                   <li className="mt-3">
//                     <Link to="/Dashbord/Taskmanage" className="text-primary" style={{ textDecoration: "none", fontSize: "20px" }}>
//                       <FontAwesomeIcon icon={faTasks} className="me-2" /> <span className='text-dark'>Task Management </span>
//                     </Link>
//                   </li>
//                   <li className="mt-3">
//                     <Link to="/Dashbord/activity" className="text-primary" style={{ textDecoration: "none", fontSize: "20px" }}>
//                       <FontAwesomeIcon icon={faChartLine} className="me-2" /> <span className='text-dark'> Activity</span>
//                     </Link>
//                   </li>
//                   <li className="mt-3">
//                     <Link to="/Dashbord/settings" className="text-primary" style={{ textDecoration: "none", fontSize: "20px" }}>
//                       <FontAwesomeIcon icon={faCog} className="me-2" /> <span className='text-dark'> Settings</span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </Col>

//         {/* Main Content */}
//         <Col xs={0} md={isSidebarOpen ? 10 : 11} style={{ minHeight: "100vh" }} className="content p-4">
//           <Routes>
//             <Route path="user" element={<User />} />
//             <Route path="Project" element={<Project />} />
//             <Route path="Taskmanage" element={<Taskmanage />} />
//             <Route path="/" element={<h2>Main Content</h2>} />
//           </Routes>
//         </Col>
//       </Row>
//     </Container >
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Button, Form } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import User from '../Pages/User';
import Project from '../Pages/Project';
import Taskmanage from '../Pages/Taskmanage';
import Acitivity from '../Pages/Acitivity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faProjectDiagram, faTasks, faChartLine, faCog, faSignOutAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import "../App.css"
import Top from './Top';
import img from "../assets/Vector (4).png"
import { HiChatAlt } from "react-icons/hi";
import ChatBox from './ChatBox';
import Swal from 'sweetalert2';
import { FaTachometerAlt } from 'react-icons/fa';
import ForgotPassword from './ForgotPassword';

// import { Avatar } from '@mui/material';
// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
// import Top from "../Component/Top"


function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update active link on click
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Automatically hide sidebar on mobile and medium devices
    const handleResize = () => {
      if (window.innerWidth <= 992) { // 992px covers both mobile and medium devices
        setIsSidebarOpen(false);
        setIsSmallScreen(true);
      } else {
        setIsSidebarOpen(true); // Show sidebar on larger screens by default
        setIsSmallScreen(false);
      }
    };



    // Initialize the sidebar state based on current window width
    handleResize();

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("user_id");


  const navigate = useNavigate();

  const Logout = (logout) => {
    if (logout) {
      // Show SweetAlert confirmation dialog before logging out
      Swal.fire({
        title: 'Are you sure you want to logout?',
        text: 'You will be logged out of your session.',
        icon: 'warning',
        showCancelButton: true, // Show cancel button
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // If confirmed, show the success message and navigate to login page
          Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: 'You have been logged out successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            // After closing the success alert, navigate to the login page
            navigate("/login");
          });
        } else {
          // If cancelled, no further action is taken
          console.log('Logout cancelled');
        }
      });
    } else {
      // Log error if logout fails
      console.error('Logout failed');
    }
  };

  // const handleLinkClick = (linkName) => {
  //   setActiveLink(linkName);
  // };
  

  return (    
    <Container fluid>

      {/* Top Navbar for small devices */}
      {isSmallScreen && (
        <Navbar bg="light" expand="lg" className="">
          <Button variant="" className='fs-2' onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Navbar.Brand className="ms-2" style={{ fontWeight: "800" }}>

          {/* <h1 className='text-dark h1 p-2 rounded' style={{ fontStyle: "oblique", boxShadow: "2px 2px 2px white -2px -2px -2px white" }}>kite<span style={{ fontStyle: "oblique" }} className='text-info  rounded py-0 px-1'>C</span>areer</h1> */}
          <img src='https://kitecareer.com/jobwebsite/static/media/logo.f8936f92b6a6f97421de.png' className='py-2' width={180} alt="" />

          </Navbar.Brand>
        </Navbar>
      )}

      <Row>
        {/* Sidebar */}
        {isSidebarOpen && (
          <Col xs={isSmallScreen ? 12 : 2} id='side' style={{ minHeight: "100vh", maxWidth: "300px", position: "fixed",background:"rgb(26 85 82)" }} className="text-black">
            {/* <div className='shadow px-2 vh-100'> */}
            <img src='https://kitecareer.com/jobwebsite/static/media/logo.f8936f92b6a6f97421de.png' className='py-2' width={180} alt="" />
            <hr className='text-info' />
            {/* Sidebar content */}
            {/* <h4 className="text-white h1 bg-dark m-0  rounded p-3" style={{fontStyle:"italic"}}> <i class="bi bi-alipay px-2 bg-dark"></i>AR</h4> */}
            <div className="sidebar-content mt-5 justify-content-start align-items-center flex-wrap flex-column">

              {/* <h4 style={{ fontWeight: "600", borderRadius: "4px" }} className="text-white bg-info p-2 h5" ><img src={img} width={20} alt="" /> <span className='px-1'> Dashboard</span></h4> */}
              {/* <hr className="text-info" /> */}
              <div className='navigation'>
                <ul className="list-unstyled navigation">
                  <li className={`${activeLink === 'Dashbord' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('Dashbord')}>
                    <Link to="/Dashbord" className="text-info" style={{ textDecoration: "none", fontSize: "18px" }}>
                      {/* <img src={img} width={20} alt="" />  <span className="text-white bg-info p-2 h5">Dashboard</span> */}
                      <h4 style={{ fontWeight: "600", borderRadius: "4px" }} className="text-info h5">
                        <FaTachometerAlt className={`me-2 ${activeLink === 'Dashbord' ? 'text-danger' : ''}`} size={20} />
                        <span className={`me-2 ${activeLink === 'Dashbord' ? 'text-warning' : ''}`}> Dashboard</span>
                      </h4>              {/* <hr className='text-black' /> */}
                    </Link>
                  </li>

                  <li className={`mt-3 ${activeLink === 'user' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('user')}>
                    <Link to="/Dashbord/user" style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faUser} className={`me-2 ${activeLink === 'user' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'user' ? 'text-warning' : ''}`}>User</span>
                    </Link>
                  </li>
                  <hr className="text-info" />

                  <li className={`mt-3 ${activeLink === 'project' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('project')}>
                    <Link to="/Dashbord/Project" style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faProjectDiagram} className={`me-2 ${activeLink === 'project' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'project' ? 'text-warning' : ''}`}>Project</span>
                    </Link>
                  </li>
                  <hr className="text-info" />

                  <li className={`mt-3 ${activeLink === 'task' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('task')}>
                    <Link to="/Dashbord/Taskmanage" style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faTasks} className={`me-2 ${activeLink === 'task' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'task' ? 'text-warning' : ''}`}>Task</span>
                    </Link>
                  </li>
                  <hr className="text-info" />

                  <li className={`mt-3 ${activeLink === 'activity' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('activity')}>
                    <Link to="/Dashbord/Activity" style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faChartLine} className={`me-2 ${activeLink === 'activity' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'activity' ? 'text-warning' : ''}`}>Activity</span>
                    </Link>
                  </li>
                  <hr className="text-info" />

                  <li className={`mt-3 ${activeLink === 'chat' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('chat')}>
                    <Link to="/Dashbord/ChatBox" style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faComments} className={`me-2 ${activeLink === 'chat' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'chat' ? 'text-warning' : ''}`}>Chat</span>
                    </Link>
                  </li>
                  <hr className="text-info" />

                  <li className={`mt-3 ${activeLink === 'settings' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('settings')}>
                    <Link to="#" style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faCog} className={`me-2 ${activeLink === 'settings' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'settings' ? 'text-warning' : ''}`}>Settings</span>
                    </Link>
                  </li>
                  <hr className="text-info" />

                  <li className="mt-3" onClick={() => { localStorage.clear(); }}>
                    <Link onClick={Logout} style={{ textDecoration: 'none', fontSize: '16px' }}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                      <span className="text-primary">Logout</span>
                    </Link>
                  </li>
                  <hr className="text-info" />
                </ul>
              </div>
            </div>
            {/* </div> */}
          </Col>
        )}

        {/* Main Content */}
        <Col xs={isSidebarOpen ? (isSmallScreen ? 12 : 10) : 12} style={{ minHeight: "100vh", position: "absolute", left: "253px" }} className="content p-4 bg-white">
          <Routes>
            <Route path="user" element={<User/>} />
            <Route path="Project" element={<Project />} />
            <Route path="Taskmanage" element={<Taskmanage />} />
            <Route path="Activity" element={<Acitivity />} />
            <Route path="ChatBox" element={<ChatBox />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="/" element={<div> <Top /></div>} />
          </Routes>
        </Col>
      </Row>

    </Container>
  );
}

export default Dashboard;
