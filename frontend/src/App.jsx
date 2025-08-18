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
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import Adminstudent from "./components/Admin/adminstudent";
import Adminfaculty from "./components/Admin/adminfaculty";
import Adminclass from "./components/Admin/adminclass";
import Adminwarden from "./components/Admin/adminwarden";
import Updatestudent from "./components/Admin/updatestudent";
import Updatefaculty from "./components/Admin/updatefaculty";
import Updateclass from "./components/Admin/updateclass";
import Updatewarden from "./components/Admin/updatewarden";
import Deletestudent from "./components/Admin/deletestudent";
import Deletefaculty from "./components/Admin/deletefaculty";
import Deleteclass from "./components/Admin/deleteclass";
import Deletewarden from "./components/Admin/deletewarden";
import Addstudent from "./components/Admin/addstudent";
import Addfaculty from "./components/Admin/addfaculty";
import Addclass from "./components/Admin/addclass";
import Addwarden from "./components/Admin/addwarden";

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
                         <Route path="/admin" element={ <AdminDashBoard/>} />
                         <Route path="/adminstudent" element={ <Adminstudent/>} />
                         <Route path="/adminfaculty" element={ <Adminfaculty/>} />
                         <Route path="/adminclass" element={ <Adminclass/>} />
                         <Route path="/adminwarden" element={ <Adminwarden/>} />
                         <Route path="/student/addstudent" element={<Addstudent />} />
                         <Route path="/student/addfaculty" element={<Addfaculty />} />
                         <Route path="/student/addclass" element={<Addclass />} />
                         <Route path="/student/addwarden" element={<Addwarden />} />
                         <Route path="/student/updatestudent" element={<Updatestudent />} />
                         <Route path="/student/updatefaculty" element={<Updatefaculty />} />
                         <Route path="/student/updateclass" element={<Updateclass />} />
                         <Route path="/student/updatewarden" element={<Updatewarden />} />
                         <Route path="/student/deletestudent" element={<Deletestudent />} />
                         <Route path="/student/deletefaculty" element={<Deletefaculty />} />
                         <Route path="/student/deleteclass" element={<Deleteclass />} />
                         <Route path="/student/deletewarden" element={<Deletewarden />} />

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