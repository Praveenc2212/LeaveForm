import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveCard from "../../DashBoard/Student/LeaveCard";
import logo from "../../../assets/logo.png";
import profilePic from "../../../assets/Profile.png";

function StudentDashBoard() {
  const navigate = useNavigate();

  const goToHistory = () => {
    navigate('/history');
  };

  const goToNewLeaveForm = () => {
    navigate('/new-leave-form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-blue-300 font-sans p-4">
      {/* Top Bar */}
      <div className="relative bg-white shadow-md rounded-xl py-4 px-6 mb-6 flex items-center justify-between">
        
        {/* Logo and Title (small screens) */}
        <div className="flex items-center space-x-4 z-10">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-md tracking-wide block md:hidden">
            Student Portal
          </span>
        </div>

        {/* Centered Title (md and up) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-md tracking-wide whitespace-nowrap">
            Student Portal
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4 z-10">
          <span className="text-sm text-gray-700 font-medium">John Doe</span>
          <img
            src={profilePic}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-blue-400"
          />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="gap-6">
        <LeaveCard Reason={"Sick"} StartDate={"22/06/2025"} EndDate={"24/06/2025"} />
      </div>
    </div>
  );
}

export default StudentDashBoard;
