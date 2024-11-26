
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
          <Col xs={isSmallScreen ? 12 : 2} id='side' style={{ minHeight: "100vh", maxWidth: "300px", position: "fixed", background: "#ADD8E6" }} className="text-black">
            <img src='https://kitecareer.com/jobwebsite/static/media/logo.f8936f92b6a6f97421de.png' className='py-2' width={180} alt="" />
            <hr className='text-info' />
            {/* Sidebar content */}
            <div className="sidebar-content mt-5 justify-content-start align-items-center flex-wrap flex-column">
              <div className='navigation'>
                <ul className="list-unstyled navigation">
                  <Link to="/Dashbord" className="text-dark" style={{ textDecoration: "none", fontSize: "16px" }}>
                    <li className={`mx-1 ${activeLink === 'Dashbord' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('Dashbord')}>
                      <i className={`me-2 bi-ui-checks-grid text-info ${activeLink === 'Dashbord' ? 'text-danger' : ''}`}></i>
                      <span className={`me-2 ${activeLink === 'Dashbord' ? 'text-warning' : ''}`}>Dashboard</span>
                    </li>
                  </Link>

                  <Link to="/Dashbord/user" className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 text-dark mt-3 ${activeLink === 'user' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('user')}>
                      <FontAwesomeIcon icon={faUser} className={`me-2 text-info ${activeLink === 'user' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'user' ? 'text-warning' : ''}`}>User</span>
                    </li>
                  </Link>
                  <hr className="text-info" />

                  <Link to="/Dashbord/Project" className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 mt-3 ${activeLink === 'project' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('project')}>
                      <FontAwesomeIcon icon={faProjectDiagram} className={`me-2 text-info ${activeLink === 'project' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'project' ? 'text-warning' : ''}`}>Project</span>
                    </li>
                  </Link>
                  <hr className="text-info" />

                  <Link to="/Dashbord/Taskmanage" className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 mt-3 ${activeLink === 'task' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('task')}>
                      <FontAwesomeIcon icon={faTasks} className={`me-2 text-info ${activeLink === 'task' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'task' ? 'text-warning' : ''}`}>Task</span>
                    </li>
                  </Link>
                  <hr className="text-info" />

                  <Link to="/Dashbord/Activity" className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 mt-3 ${activeLink === 'activity' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('activity')}>
                      <FontAwesomeIcon icon={faChartLine} className={`me-2 text-info ${activeLink === 'activity' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'activity' ? 'text-warning' : ''}`}>Activity</span>
                    </li>
                  </Link>
                  <hr className="text-info" />

                  <Link to="/Dashbord/ChatBox" className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 mt-3 ${activeLink === 'chat' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('chat')}>
                      <FontAwesomeIcon icon={faComments} className={`me-2 text-info ${activeLink === 'chat' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'chat' ? 'text-warning' : ''}`}>Chat</span>
                    </li>
                  </Link>
                  <hr className="text-info" />

                  <Link to="#" className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 mt-3 ${activeLink === 'settings' ? 'bg-white active' : ''}`} onClick={() => handleLinkClick('settings')}>
                      <FontAwesomeIcon icon={faCog} className={`me-2 text-info ${activeLink === 'settings' ? 'text-danger' : ''}`} />
                      <span className={`me-2 ${activeLink === 'settings' ? 'text-warning' : ''}`}>Settings</span>
                    </li>
                  </Link>
                  <hr className="text-info" />

                  <Link onClick={Logout} className='text-dark' style={{ textDecoration: 'none', fontSize: '16px' }}>
                    <li className={`mx-1 mt-3 ${activeLink === 'logout' ? 'bg-white active' : ''}`} onClick={() => { localStorage.clear(); }}>
                      <FontAwesomeIcon icon={faSignOutAlt} className={`me-2 text-info ${activeLink === 'logout' ? 'text-danger' : ''}`} />
                      <span className="">Logout</span>
                    </li>
                  </Link>
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
            <Route path="user" element={<User />} />
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
