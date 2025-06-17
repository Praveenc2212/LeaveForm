import React from 'react';
import { useNavigate } from 'react-router-dom';
import Staffpage from './components/Staffpage';
import Studentpage from './components/Studentpage';
import Login from './components/LoginSignUp/Login';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white shadow-md flex justify-between items-center px-6 py-4 rounded-md mb-4">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-4" />
          <h1 className="text-xl font-bold text-blue-700">Student Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/history')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
          >
            History
          </button>
          <div className="flex items-center">
            <span className="mr-2 text-gray-800">John Doe</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
              👤
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Login />
      {/* Or: <Studentpage /> / <Staffpage /> based on login logic */}
    </>
  );
}

export default Home;
