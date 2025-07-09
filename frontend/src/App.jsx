import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/LoginSignUp/Signup';
import Login from './components/LoginSignUp/Login';

import StaffDashBoard from './components/DashBoard/StaffPage/StaffDashBoard';
import LeaveRequests from './components/DashBoard/StaffPage/LeaveRequests';

import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard';
import LeaveForm from './components/DashBoard/Student/LeaveForm';

import HODDashBoard from './components/DashBoard/HODPage/HODDashBoard';

import Profile from './components/DashBoard/Profile';

function App() {
  return (
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
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Suspense, lazy } from "react";

// // Lazy load components for performance
// const Login = lazy(() => import('./components/LoginSignUp/Login'));
// const Signup = lazy(() => import('./components/LoginSignUp/Signup'));
// const StudentDashBoard = lazy(() => import('./components/DashBoard/Student/StudentDashBoard'));

// function App() {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           <Route path="/student" element={<StudentDashBoard />} />
//           <Route path="/leaveform" element={<LeaveForm />} />

//           <Route path="/staff" element={<StaffDashBoard />} />
//           <Route path="/leaverequests" element={<LeaveRequests />} />

//           <Route path="/hod" element={<HODDashBoard />} />

//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;
