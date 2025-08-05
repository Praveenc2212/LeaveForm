import {
     Routes,
     Route,
     Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Signup from "./components/Admin/Signup";
import Login from "./components/Authentication/Login";
import StaffDashBoard from "./components/Staff/StaffDashBoard";
import PendingLeaveRequests from "./components/Staff/PendingLeaveRequests";
import ReviewedLeaveRequests from "./components/Staff/ReviewedLeaveRequests";
import StudentDashBoard from "./components/Student/StudentDashBoard";
import ApplyLeaveForm from "./components/Student/ApplyLeaveForm";
import StudentLeaveStatus from "./components/Student/StudentLeaveStatus";
import StudentLeaveHistory from "./components/Student/StudentLeaveHistory";
import HODDashBoard from "./components/HOD/HODDashBoard";
import Profile from "./components/Profile";
import Header from "./components/Header";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/footer";
import Error404 from "./components/Error/Error404";

function App() {
     const { userData, checkAuth, isCheckingAuth } = useAuthStore();

     useEffect(() => {
          checkAuth();
     }, [checkAuth]);

     if (isCheckingAuth && !userData) {
          return (
               <div className="flex items-center justify-center min-h-screen">
                    <Loader className="animate-spin text-gray-700" size={50} />
               </div>
          );
     }

     return (
          <div className="min-h-screen flex flex-col bg-white">
               <div className="fixed top-0 left-0 w-full z-50">
                    <Header />
               </div>
               <div className="pt-13 flex-grow">
                    <Routes>
                         <Route path="/" element={userData ? <Navigate to={`/${userData.designation.toLowerCase()}`} /> : <Navigate to="/login" />} />
                         <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
                         <Route path="/signup" element={<Signup />} />

                         <Route path="/student" element={userData ? <StudentDashBoard /> : <Navigate to="/login" />} />
                         <Route path="/student/ApplyLeaveForm" element={userData ? <ApplyLeaveForm /> : <Navigate to="/login" />} />
                         <Route path="/student/StudentLeaveStatus" element={userData ? <StudentLeaveStatus /> : <Navigate to="/login" />} />
                         <Route path="/student/StudentLeaveHistory" element={userData ? <StudentLeaveHistory /> : <Navigate to="/login" />} />

                         <Route path="/staff" element={userData ? <StaffDashBoard /> : <Navigate to="/login" />}>
                              <Route path="PendingRequests" element={<PendingLeaveRequests />} />
                              <Route path="ReviewedRequests" element={<ReviewedLeaveRequests />} />
                              {/* <Route path="ReviewedRequests" element={<ReviewedLeaveRequests />} /> */}
                         </Route>

                         <Route path="/hod" element={userData ? <HODDashBoard /> : <Navigate to="/login" />} />
                         <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />

                         <Route path="/contact" element={<Contact />} />
                         <Route path="/about" element={<About />} />
                         <Route path="*" element={<Error404 />} />
                    </Routes>
               </div>

               <Footer />

               <Toaster />
          </div>
     );
}

export default App;