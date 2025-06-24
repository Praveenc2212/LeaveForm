import React from 'react';
// import profilePic from '../../assets/Profile.png'; // Update path to actual student profile image

function LeaveCard({ name, days, startDate, endDate, onAccept, onReject,pic }) {
  return (
    <div className="flex items-center justify-between shadow-md rounded-2xl p-4 mb-4 bg-white/20 backdrop-blur-md border border-white/30">
      
      {/* Left Section: Profile Picture */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={pic}
          alt="Profile"
          className="w-16 h-16 rounded-3xl object-cover border border-white"
        />
      </div>

      {/* Middle Section: Leave Data */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-700 text-sm"><strong>No. of Days Leave:</strong> {days}</p>
        <p className="text-gray-700 text-sm"><strong>Start Date:</strong> {startDate}</p>
        <p className="text-gray-700 text-sm"><strong>End Date:</strong> {endDate}</p>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default LeaveCard;
