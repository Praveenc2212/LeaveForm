import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Staffpage from './components/Staffpage';
import Studentpage from './components/Studentpage';
import Login from './components/LoginSignUp/Login';

function Home() {
  return (
    <>
        <Login />
    </>
  );
}

export default Home;