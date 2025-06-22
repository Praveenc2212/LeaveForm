<<<<<<< HEAD
=======

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './components/LoginSignUp/Login';
// import Signup from './components/LoginSignUp/Signup';
>>>>>>> fd056c1421afc53d9589c4b5310ea26e1b7bfd45

// import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard'
// import Login from './components/LoginSignUp/Login';

<<<<<<< HEAD
import Home from "./Home";

function App() {
  return (
        <>
        <Home />
        </>
=======
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

<StudentDashBoard/>
    </div>
    
>>>>>>> fd056c1421afc53d9589c4b5310ea26e1b7bfd45
  )
}


export default App;
