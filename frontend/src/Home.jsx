import React from 'react';
import Signup from './components/LoginSignUp/Signup';
import Login from "./components/LoginSignUp/Login"
import StaffDashBoard from "./components/DashBoard/StaffPage/StaffDashBoard"
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';

function Home() {
  return (
    <>
        {/* <Signup /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student" element={<StudentDashBoard />} />
            <Route path="/staff" element={<StaffDashBoard />} />
            <Route path="/requests" element={<LeaveRequests/>} ></Route>
            {/* <Route path="/student/leaveform" element={<LeaveForm />} ></Route> */}
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default Home;