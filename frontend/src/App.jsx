import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './components/LoginSignUp/Login';
// import Signup from './components/LoginSignUp/Signup';
import StaffDashBoard from "./components/DashBoard/StaffPage/StaffDashBoard";

// import { useState } from 'react'
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard'
// import Studentfrom from './components/Studentfrom';
// import Home from './Home';
import LeaveRequests from "./components/DashBoard/StaffPage/LeaveRequests";
function App() {
  return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Signup />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //   </Router>
  // );

    <>
        <Router>
      <Routes>
        <Route path="/staff" element={<StaffDashBoard />} />
        <Route path="/leaverequests" element={<LeaveRequests />} />
      </Routes>
    </Router>

        {/* <StaffDashBoard /> */}
    </>
    
  )
}


export default App;
