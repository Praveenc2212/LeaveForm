import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import profilePic from "../../assets/Profile.png";

const Header = () => {  
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white shadow-md py-2 px-6 mb-6 border border-white/20">
      
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="h-16 object-contain" />
        {/* <span className="text-2xl font-bold text-blue-700">Student Portal</span> */}
      </div>

      {/* Right: Profile */}
      <div className="flex items-center space-x-3">
        {/* <span className="text-sm text-gray-700 font-medium">John Doe</span> */}
        <img
          src={profilePic}
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-blue-400 cursor-pointer"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default Header;
