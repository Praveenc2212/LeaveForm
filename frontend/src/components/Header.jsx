import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import logoutIcon from "../assets/logout.png";
import profilePic from "../assets/Profile.png"; // ✅ Correct import
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
  const { userData, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header for some routes
  if (location.pathname === "/about") return <></>;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md py-2 px-6 mb-6 border border-white/20">
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
        {!userData ? <></> :
          location.pathname === '/hod' || location.pathname === '/staff' ? (
            <table className="text-gray-700 text-sm sm:text-base">
              <tbody>
                <tr>
                  <td><b>Name </b></td>
                  <td>: Dr. Staff Name</td>
                </tr>
                <tr>
                  <td><b>Dept</b></td>
                  <td>: CSE</td>
                </tr>
              </tbody>
            </table>
          ) : location.pathname === '/admin' ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden sm:block text-sm sm:text-base">
                {userData.email}
              </span>
              <img
                src={logoutIcon}
                alt="Logout"
                className="h-8 w-8 cursor-pointer hover:opacity-80"
                onClick={handleLogout}
                title="Logout"
              />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden sm:block text-sm sm:text-base">
                {userData.email}
              </span>
              <img
                src={profilePic} // ✅ Corrected here
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-blue-400 cursor-pointer"
                onClick={() => navigate('/profile')}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Header;
