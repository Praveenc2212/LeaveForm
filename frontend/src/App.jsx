import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect , useState } from 'react';
import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';
import Welcome from './Welcome';
import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';

import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';

import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';
import Profile from './components/DashBoard/Profile';
import Header from './components/DashBoard/Header';

import Contact from './Contact';
import About from './About';
import Footer from './footer'; // ✅ make sure this is exported as capital 'Footer'

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false); // ⏳ After 3 seconds go to App
    }, 3000);
  }, []);

  if( showWelcome){
    return (<Welcome />);
  }
  // return showWelcome ? <Welcome /> : <App />;
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

