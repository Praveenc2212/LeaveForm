
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';
import Welcome from './Welcome';
import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';
// import { useAuthStore } from './store/AuthStore';
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';
import RecentLeavePage from './components/DashBoard/Student/RecentLeavePage';
import History from './components/DashBoard/Student/History';

import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';
import Profile from './components/DashBoard/Profile';
import Header from './components/DashBoard/Header';


import Contact from './Contact';
import About from './About';
import Footer from './footer'; // ✅ make sure this is exported as capital 'Footer'

function App() {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(location.pathname === '/');

  useEffect(() => {
    if (location.pathname === '/') {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [location.pathname]);

  if (showWelcome && location.pathname === '/') {
    return <Welcome />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔼 Sticky Header */}
      <div className='fixed top-0 left-0 w-full z-50'>

        <Header />
      </div>
      {/* 🔽 Push main content below header */}
      <div className="pt-24 flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<StudentDashBoard />} />
          <Route path="/leaveform" element={<LeaveForm />} />
          <Route path="/recentleave" element={<RecentLeavePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/staff" element={<StaffDashBoard />} />
          <Route path="/leaverequests" element={<LeaveRequests />} />
          <Route path="/hod" element={<HODDashBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="p-4 text-center">404 - Page Not Found</div>} />
        </Routes>
      </div>
      {/* ✅ Footer always shown at bottom */}
      <Footer />
    </div>
  );
}
export default App;
