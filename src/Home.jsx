import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Staffpage from './components/Staffpage';
import Studentpage from './components/Studentpage';

function Home() {
  return (
    <>
      <div>Home</div>
      <Router>
        <Routes>
          {/* <Route path='/' element={<div>Welcome Home</div>} /> */}
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/student' element={<Studentpage />} /> */}
          {/* <Route path='/staff' element={<Staffpage />} /> */}

          
        </Routes>
      </Router>
    </>
  );
}

export default Home;