// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import Welcome from './Welcome.jsx';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';

// function Main() {
//   const [showWelcome, setShowWelcome] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowWelcome(false); // ⏳ After 3 seconds go to App
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return showWelcome ? <Welcome /> : <App />;
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     {/* <Main /> */}
//   </BrowserRouter>
// );


// ================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Welcome from './Welcome.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/LoginSignUp/Login.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    {/* <Login /> */}
  </BrowserRouter>
);