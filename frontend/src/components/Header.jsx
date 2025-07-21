import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import profilePic from "../assets/Profile.png";
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
  const { userData } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/about") return <></>;
  return (
    <div className="flex justify-between items-center bg-white shadow-md py-2 px-6 mb-6 border border-white/20">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => navigate('/')}
      >
        {/* Responsive logo height and width */}
        <img
          src={logo}
          alt="Logo"
          className="h-12 sm:h-15 max-w-[160px] sm:max-w-[210px] object-contain"
        />
      </div>
      <div>
        {!userData ? <></> : (location.pathname === '/hod' || location.pathname === '/staff') ? (
          <table className="text-gray-700 text-sm sm:text-base">
            <tbody>
              <tr>
                <td> <b>Name </b> </td>
                <td>: Dr. Staff Name </td>
              </tr>
              <tr>
                <td> <b>Dept</b> </td>
                <td>: CSE </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 hidden sm:block text-sm sm:text-base">
              {userData.email}
            </span>
            <img
              src={profilePic}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-blue-400 cursor-pointer"
              onClick={() => navigate('/profile')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;