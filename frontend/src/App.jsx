import {  Routes, Route, Navigate } from 'react-router-dom';
// import { useEffect } from 'react';
import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';
// import { Toaster } from 'react-hot-toast';
import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';
// import { useAuthStore } from './store/AuthStore';
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';
import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';
import Profile from './components/DashBoard/Profile';
import Header from './components/DashBoard/Header';
function App() {
  // const {userData, isAuthenticated, isCheckingAuth ,checkAuth} = useAuthStore();
  // useEffect(() => { 
	// 	checkAuth() 
	// }, [checkAuth]); 
  // const [redirect_path, setRedirectPath] = useAuthStore((state) => [state.redirect_path, state.setRedirectPath]);
  return ( 
    <>
    {/* <Toaster /> */}
    <div className='fixed top-0 left-0 w-full z-50'>
    <Header />
    </div >
    <div className='pt-24  '>
    <Routes>
      {/* <Route path="/" element={userData ? <Navigate to={redirect_path} /> : <Navigate to={redirect_path} />} /> */}
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