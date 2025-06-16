import React from 'react';
import LeaveCard from "../../DashBoard/Student/LeaveCard";
import logo from "../../../assets/logo.png"; // Update path as needed
import profilePic from "../../../assets/Profile.png"; // Update path as needed

function StudentDashBoard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300  to-blue-300 font-sans p-4">
      {/* Header with Logo and Profile */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-xl py-2 px-6 mb-6">
        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
          <span className="text-2xl font-bold text-blue-700">Student Portal</span>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center space-x-3">
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
        {/* Add more LeaveCard or other components here */}
      </div>
    </div>
  );
}

export default StudentDashBoard;
