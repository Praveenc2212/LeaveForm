import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

// A generic protected route component that checks for authentication and allowed roles.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userData } = useAuthStore();
  
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // Convert designations to uppercase to avoid case-sensitivity issues
  if (allowedRoles && !allowedRoles.map(r => r.toUpperCase()).includes(userData.designation.toUpperCase())) {
    // If user's designation is not in allowed roles, redirect them to their home route
    return <Navigate to={`/${userData.designation.toLowerCase()}`} replace />;
  }

  return children;
};


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
const PrincipalDashBoard = lazy(() => import("./components/Principal/PrincipalDashBoard"));
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
import OnDuty from "./components/Student/OnDuty";

function App() {
  const { userData, checkAuth, isCheckingAuth } = useAuthStore();
  const [isReadyForApp, setIsReadyForApp] = useState(false);

  useEffect(() => {
    // Minimum display time for splash screen (5000ms)
    // Temporarily disabled delay
    const minDisplayTime = Promise.resolve();

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

  // 1. Loader instead of Splash screen until ready
  if (!isReadyForApp) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-gray-700" size={50} />
      </div>
    );
  }

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
            <Route path="/student" element={<ProtectedRoute allowedRoles={["STUDENT"]}><StudentDashBoard /></ProtectedRoute>} />
            <Route path="/student/ApplyLeaveForm" element={<ProtectedRoute allowedRoles={["STUDENT"]}><ApplyLeaveForm /></ProtectedRoute>} />
            <Route path="/student/StudentLeaveStatus" element={<ProtectedRoute allowedRoles={["STUDENT"]}><StudentLeaveStatus /></ProtectedRoute>} />
            <Route path="/student/StudentLeaveHistory" element={<ProtectedRoute allowedRoles={["STUDENT"]}><StudentLeaveHistory /></ProtectedRoute>} />
            <Route path="/student/OnDuty" element={<ProtectedRoute allowedRoles={["STUDENT"]}><OnDuty /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashBoard /></ProtectedRoute>} />
            <Route path="/adminstudent" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Adminstudent /></ProtectedRoute>} />
            <Route path="/adminfaculty" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Adminfaculty /></ProtectedRoute>} />
            <Route path="/adminclass" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Adminclass /></ProtectedRoute>} />
            <Route path="/adminwarden" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Adminwarden /></ProtectedRoute>} />

            {/* Admin CRUD */}
            <Route path="/student/addstudent" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Addstudent /></ProtectedRoute>} />
            <Route path="/student/addfaculty" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Addfaculty /></ProtectedRoute>} />
            <Route path="/student/addclass" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Addclass /></ProtectedRoute>} />
            <Route path="/student/addwarden" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Addwarden /></ProtectedRoute>} />
            <Route path="/student/updatestudent" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Updatestudent /></ProtectedRoute>} />
            <Route path="/student/updatefaculty" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Updatefaculty /></ProtectedRoute>} />
            <Route path="/student/updateclass" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Updateclass /></ProtectedRoute>} />
            <Route path="/student/updatewarden" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Updatewarden /></ProtectedRoute>} />
            <Route path="/student/deletestudent" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Deletestudent /></ProtectedRoute>} />
            <Route path="/student/deletefaculty" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Deletefaculty /></ProtectedRoute>} />
            <Route path="/student/deleteclass" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Deleteclass /></ProtectedRoute>} />
            <Route path="/student/deletewarden" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Deletewarden /></ProtectedRoute>} />

            {/* Staff/HOD/Principal/Profile */}
            <Route path="/staff" element={<ProtectedRoute allowedRoles={["STAFF"]}><StaffDashBoard /></ProtectedRoute>} />
            <Route path="/hod" element={<ProtectedRoute allowedRoles={["HOD"]}><HODDashBoard /></ProtectedRoute>} />
            <Route path="/principal" element={<ProtectedRoute allowedRoles={["PRINCIPAL", "PRINCIPLE"]}><PrincipalDashBoard /></ProtectedRoute>} />
            <Route path="/principle" element={<Navigate to="/principal" replace />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Warden Routes */}
            <Route path="/student/outpass/:formId" element={<ProtectedRoute><StudentOutpass /></ProtectedRoute>} />

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