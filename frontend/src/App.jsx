
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './components/LoginSignUp/Login';
// import Signup from './components/LoginSignUp/Signup';

import LeaveForm from "./components/DashBoard/Student/LeaveForm";
import { useState } from 'react'
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard'
// import Studentfrom from './components/Studentfrom';
// import Home from './Home';

function App() {
  return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Signup />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //   </Router>
  // );
    // <>
    //     {/* <h1>Student Form</h1> */}
    //     {/* <button onClick={ ()=> < Studentfrom /> }> Apply Leave </button>  */}
    //     <StudentDashBoard/>
    // </>
    

    <div className="min-h-screen bg-gradient-to-br from-orange-300  to-blue-300 font-sans p-4">

{/* <StudentDashBoard/> */}
<LeaveForm></LeaveForm>
    </div>
    
  )
}


export default App;
