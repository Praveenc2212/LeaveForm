import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/LoginSignUp/Login';
import Signup from './components/LoginSignUp/Signup';


import { useState } from 'react'
import StudentDashBoard from './components/DashBoard/Student/StudentDashBoard'
import Studentfrom from './components/Studentfrom';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );

    <>
        {/* <h1>Student Form</h1> */}
        {/* <button onClick={ ()=> < Studentfrom /> }> Apply Leave </button>  */}
        <StudentDashBoard/>
    </>
    
  )
}


export default App;
