import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';

import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';

import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';

import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';
import Profile from './components/DashBoard/Profile';
import Header from './components/DashBoard/Header';

function App() {
  return (
    <>
    <div className='fixed top-0 left-0 w-full z-50'>
    <Header />
    </div >
    <div className='pt-24  '>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/student" element={<StudentDashBoard />} />
      <Route path="/leaveform" element={<LeaveForm />} />
      <Route path="/staff" element={<StaffDashBoard />} />
      <Route path="/leaverequests" element={<LeaveRequests />} />
      <Route path="/hod" element={<HODDashBoard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} /> 
    </Routes>
    </div>
    </>
  );
}
export default App;