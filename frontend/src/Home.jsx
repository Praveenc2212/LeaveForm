import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';

import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';

import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';

import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';

import Profile from './components/DashBoard/Profile';
function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentDashBoard />} />
        <Route path="/leaveform" element={<LeaveForm />} />
        <Route path="/staff" element={<StaffDashBoard />} />
        <Route path="/leaverequests" element={<LeaveRequests />} />
        <Route path="/hod" element={<HODDashBoard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Home;
