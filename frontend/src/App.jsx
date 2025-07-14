import {
     BrowserRouter,
     Routes,
     Route,
     useLocation,
     Navigate,
     useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Signup from "./components/LoginSignUp/Signup";
import Login from "./components/LoginSignUp/Login";
import Welcome from "./Welcome";
import StaffDashBoard from "./components/DashBoard/StaffPage/StaffDashBoard";
import LeaveRequests from "./components/DashBoard/StaffPage/LeaveRequests";
// import { useAuthStore } from './store/AuthStore';
import StudentDashBoard from "./components/DashBoard/Student/StudentDashBoard";
import LeaveForm from "./components/DashBoard/Student/LeaveForm";
import RecentLeavePage from "./components/DashBoard/Student/RecentLeavePage";
import History from "./components/DashBoard/Student/History";
// import { useAuthStore } from './store/AuthStore';
import HODDashBoard from "./components/DashBoard/HODPage/HODDashBoard";
import Profile from "./components/DashBoard/Profile";
import Header from "./components/DashBoard/Header";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

import Contact from "./Contact";
import About from "./About";
import Footer from "./footer";
import NotFound404 from "./components/NotFound/NotFound404";

function App() {
     const navigate = useNavigate();
     const { userData, checkAuth, isCheckingAuth } = useAuthStore();
     useEffect(() => {
          checkAuth();
     }, [checkAuth]);
     
     if (isCheckingAuth) {
       return (
         <div className="flex items-center justify-center min-h-screen">
                    <Loader className="animate-spin text-gray-700" size={50} />
               </div>
          );
        }
        console.log( "this is user data : " ,userData);
     
     // const { userData } = useAuthStore();
     // const location = useLocation();
     // const [showWelcome, setShowWelcome] = useState(location.pathname === '/');

     // useEffect(() => {
     //   if (location.pathname === '/') {
     //     setShowWelcome(true);
     //     const timer = setTimeout(() => {
     //       setShowWelcome(false);
     //     }, 3000);
     //     return () => clearTimeout(timer);
     //   } else {
     //     setShowWelcome(false);
     //   }
     //   // checkAuth();
     // }, [location.pathname ]);

     // if (showWelcome && location.pathname === '/') {
     //   return <Welcome />;
     // }

     return (
          <div className="min-h-screen flex flex-col bg-white">
               <div className="fixed top-0 left-0 w-full z-50">
                    <Header />
               </div>
               <div className="pt-24 flex-grow">
                    <Routes>
                        <Route path="/" element={<Navigate to={"/login"} /> } />
                         <Route path="/login" element={ userData ? <Navigate to={!userData.designation ? "/student" : `/${userData.designation.toLowerCase()}`} /> : <Login />} />
                         <Route path="/signup" element={<Signup />} />
                         <Route
                              path="/student"
                              element={userData ? <StudentDashBoard /> : <Navigate to="/login" />}
                         />
                         <Route
                              path="/student/leaveform"
                              element={userData ? <LeaveForm /> : <Navigate to="/login" />}
                         />
                         <Route
                              path="/recentleave"
                              element={<RecentLeavePage />}
                         />
                         <Route path="/history" element={userData ? <History /> : <Navigate to="/login" />} />
                         <Route path="/staff" element={userData ? <StaffDashBoard /> : <Navigate to="/login" />} />
                         <Route
                              path="/staff/leaverequests"
                              element={<LeaveRequests />}
                         />
                         <Route
                              path="/hod/leaverequests"
                              element={userData ? <LeaveRequests /> : <Navigate to="/login" />}
                         />
                         <Route path="/hod" element={userData ? <HODDashBoard /> : <Navigate to="/login" />} />
                         <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />
                         <Route path="/contact" element={<Contact />} />
                         <Route path="/about" element={<About />} />
                         <Route path="*" element={<NotFound404 />} />
                    </Routes>
               </div>

               <Footer />

               <Toaster />
          </div>
     );
}

export default App;
