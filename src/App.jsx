import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashbord';
import User from './Pages/User';
import Project from './Pages/Project';
import Taskmanage from './Pages/Taskmanage';
import UserList from './Pages/UserList';
import Acitivity from './Pages/Acitivity';
import AdminDashboard from './Component/AdminDashboard';
import Register from './Component/Register';
import Devpage from './Pages/Devpage';
import Mainpage from './Pages/Mainpage';
import ChatBox from './Component/ChatBox';
// import From from './Pages/From';
import EmployeeLog from "../src/EmployeeLog"
import Parent from './Parent';
import { Chat } from '@mui/icons-material';
import ForgotPassword from './Component/ForgotPassword';
import FacebookAuth from './Component/FacebookAuth';
import Weather from './Component/Weather';
// import GooleSign from './Pages/GooleSign';
// import New from "./Component/New"

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <GooleSign/> */}
       {/* <FacebookAuth/>   */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashbord/*" element={<Dashboard/>} />
          {/* If Project and Taskmanage are inside the Dashboard, they should be nested under the Dashboard component */}
          <Route path="/Project" element={<Project />} />
          <Route path="/Taskmanage" element={<Taskmanage />} />
          <Route path="/Activity" element={<Acitivity />} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
          <Route path="/Devpage" element={<Devpage/>} />
          <Route path="/Mainpage" element={<Mainpage/>} />
          <Route path="/ChatBox" element={<ChatBox/>} />
          <Route path="/emp" element={<EmployeeLog/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />
          {/* <Route path="/Weather" element={<Weather/>} /> */}


        </Routes>
      </BrowserRouter>
      {/* <Chat/> */}
      {/* <EmployeeLog/> */}
   {/* <From/> */}
      {/* <Parent/> */}
      {/* <UserList/> */}
      {/* <New/> */}
      
    </div>
  );
}

export default App;
