import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

import SplashScreen from "./components/SplashScreen/SplashScreen";
import Header from "./components/Header";
import Footer from "./components/footer";

// Lazily load only large or infrequently accessed components
const Signup = lazy(() => import("./components/Admin/Signup"));
const Login = lazy(() => import("./components/Authentication/Login"));
const StaffDashBoard = lazy(() => import("./components/Staff/StaffDashBoard"));
const StudentDashBoard = lazy(() => import("./components/Student/StudentDashBoard"));
const ApplyLeaveForm = lazy(() => import("./components/Student/ApplyLeaveForm"));
const StudentLeaveStatus = lazy(() => import("./components/Student/StudentLeaveStatus"));
const StudentLeaveHistory = lazy(() => import("./components/Student/StudentLeaveHistory"));
const HODDashBoard = lazy(() => import("./components/HOD/HODDashBoard"));
const Profile = lazy(() => import("./components/Profile"));
const AdminDashBoard = lazy(() => import("./components/Admin/AdminDashBoard"));
const Adminstudent = lazy(() => import("./components/Admin/adminstudent"));
const Adminfaculty = lazy(() => import("./components/Admin/adminfaculty"));
const Adminclass = lazy(() => import("./components/Admin/adminclass"));
const Adminwarden = lazy(() => import("./components/Admin/adminwarden"));
const Updatestudent = lazy(() => import("./components/Admin/updatestudent"));
const Updatefaculty = lazy(() => import("./components/Admin/updatefaculty"));
const Updateclass = lazy(() => import("./components/Admin/updateclass"));
const Updatewarden = lazy(() => import("./components/Admin/updatewarden"));
const Deletestudent = lazy(() => import("./components/Admin/deletestudent"));
const Deletefaculty = lazy(() => import("./components/Admin/deletefaculty"));
const Deleteclass = lazy(() => import("./components/Admin/deleteclass"));
const Deletewarden = lazy(() => import("./components/Admin/deletewarden"));
const Addstudent = lazy(() => import("./components/Admin/addstudent"));
const Addfaculty = lazy(() => import("./components/Admin/addfaculty"));
const Addclass = lazy(() => import("./components/Admin/addclass"));
const Addwarden = lazy(() => import("./components/Admin/addwarden"));
const StudentOutpass = lazy(() => import("./components/Student/StudentOutpass"));

// Direct imports for small/static pages
import Contact from "./components/Contact";
import About from "./components/About";
import Error404 from "./components/Error/Error404";

function App() {
  const { userData, checkAuth, isCheckingAuth } = useAuthStore();
  const [isReadyForApp, setIsReadyForApp] = useState(false);

  useEffect(() => {
    // Minimum display time for splash screen (5000ms)
    const minDisplayTime = new Promise(resolve => setTimeout(resolve, 5000));

    // Wait until backend is ready
    const backendReady = new Promise(resolve => {
      const pingBackend = async () => {
        const serverPort = import.meta.env.VITE_SERVER_PORT || 1242;
        const apiUrl = `http://localhost:${serverPort}`;
        try {
          await fetch(apiUrl);
          resolve();
        } catch {
          setTimeout(pingBackend, 3000);
        }
      };
      pingBackend();
    });

    // Show app after both splash and backend ready
    Promise.all([minDisplayTime, backendReady]).then(() => {
      setIsReadyForApp(true);
      checkAuth();
    });
  }, [checkAuth]);

  // 1. Splash screen until ready
  if (!isReadyForApp) return <SplashScreen />;

  // 2. Loader while checking auth
  if (isCheckingAuth && !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-gray-700" size={50} />
      </div>
    );
  }

  // 3. Main application
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="pt-13 flex-grow">
        <Suspense fallback={<div className="flex justify-center mt-20"><Loader className="animate-spin" size={40} /></div>}>
          <Routes>
            {/* Root and Auth */}
            <Route path="/" element={userData ? <Navigate to={`/${userData.designation.toLowerCase()}`} /> : <Navigate to="/login" />} />
            <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student */}
            <Route path="/student" element={userData ? <StudentDashBoard /> : <Navigate to="/login" />} />
            <Route path="/student/ApplyLeaveForm" element={userData ? <ApplyLeaveForm /> : <Navigate to="/login" />} />
            <Route path="/student/StudentLeaveStatus" element={userData ? <StudentLeaveStatus /> : <Navigate to="/login" />} />
            <Route path="/student/StudentLeaveHistory" element={userData ? <StudentLeaveHistory /> : <Navigate to="/login" />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/adminstudent" element={<Adminstudent />} />
            <Route path="/adminfaculty" element={<Adminfaculty />} />
            <Route path="/adminclass" element={<Adminclass />} />
            <Route path="/adminwarden" element={<Adminwarden />} />

            {/* Admin CRUD */}
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

            {/* Staff/HOD/Profile */}
            <Route path="/staff" element={userData ? <StaffDashBoard /> : <Navigate to="/login" />} />
            <Route path="/hod" element={userData ? <HODDashBoard /> : <Navigate to="/login" />} />
            <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />

            {/* Warden Routes */}
            <Route path="/student/outpass/:formId" element={userData ? <StudentOutpass /> : <Navigate to="/login" />} />

            {/* Static Pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;