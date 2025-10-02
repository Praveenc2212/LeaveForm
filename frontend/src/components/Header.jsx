import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import profilePic from "../assets/Profile.png";
import { useAuthStore } from '../store/useAuthStore';
import { LogOut } from "lucide-react";

const Header = () => {
  const { userData, Logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header for some routes
  if (location.pathname === "/about") return <></>;

  const handleLogout = () => {
    Logout();
    navigate('/');
  };

  // Determine if the user is staff or hod based on the pathname
  const isStaffOrHod = location.pathname === '/hod' || location.pathname === '/staff';

  return (
    <div className="flex justify-between items-center bg-white shadow-md py-2 px-6 mb-0 border border-white/20">
      {/* Logo */}
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src={logo}
          alt="Logo"
          className="h-12 sm:h-15 max-w-[160px] sm:max-w-[210px] object-contain"
        />
      </div>

      {/* Right side */}
      <div>
        {!userData ? null : (
          <div className="flex items-center space-x-1">
            <span className="text-gray-600 hidden sm:block text-sm sm:text-lg">
              {userData.email}
            </span>
            {isStaffOrHod ? (

              <button
                className="h-10 w-10 flex items-center justify-center rounded-full p-2 hover:border-orange-400 hover:border-1 hover:bg-orange-100 transition cursor-pointer"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={30} color="#f97316" />
              </button>
            ) : (
              <img
                src={profilePic}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-blue-400 cursor-pointer"
                onClick={() => navigate('/profile')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
