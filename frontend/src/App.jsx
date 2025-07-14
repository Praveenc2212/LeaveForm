import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';
import Welcome from './components/Welcome';
import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';
import RecentLeavePage from './components/DashBoard/Student/RecentLeavePage';
import History from './components/DashBoard/Student/History';
import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';
import Profile from './components/DashBoard/Profile';
import Header from './components/DashBoard/Header';
import Contact from './Contact';
import About from './About';
import Footer from './footer';
import NotFound404 from './components/NotFound/NotFound404';

function App() {
  const location = useLocation();
   const hideFooterRoutes = ['/about', '/contact'];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className='fixed top-0 left-0 w-full z-50'>
        <Header />
      </div>

      <div className="pt-24 flex-grow">
        <Routes>  
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student" element={<StudentDashBoard />} />
            <Route path="/student/leaveform" element={<LeaveForm />} />
            <Route path="/recentleave" element={<RecentLeavePage />} />
            <Route path="/history" element={<History />} />
            <Route path="/staff" element={<StaffDashBoard />} />
            <Route path="/staff/leaverequests" element={<LeaveRequests />} />
            <Route path="/hod/leaverequests" element={<LeaveRequests />} />
            <Route path="/hod" element={<HODDashBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>

      {!shouldHideFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
