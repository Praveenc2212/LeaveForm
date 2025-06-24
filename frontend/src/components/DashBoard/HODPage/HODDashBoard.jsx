// Staffpage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import PraveenM from '../../../assets/Praveen M.jpg';
import PraveenC from '../../../assets/Praveen C.jpg';
import PraveenR from '../../../assets/Praveenkumar R.png';

function HODpage() {
  const navigate = useNavigate();

  const leaveRequests = [
    { id: 1, studentName: 'Praveen M', days: 3, startDate: '2025-06-20', endDate: '2025-06-22', pic: PraveenM },
    { id: 2, studentName: 'Praveen C', days: 2, startDate: '2025-06-25', endDate: '2025-06-26', pic: PraveenC },
    { id: 3, studentName: 'Praveen R', days: 1, startDate: '2025-06-30', endDate: '2025-07-01', pic: PraveenR },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-blue-300 font-sans p-3">
      <Header />

      <div className="flex justify-center h-[25%]">
        <div
          className="w-[40%] shadow-md rounded-2xl p-3 mb-4 bg-white/20 backdrop-blur-md border border-white/30 relative cursor-pointer"
          onClick={() => navigate('/leaverequests', { state: { leaveRequests } })}
        >
          <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">Pending Leave Requests</h3>

          <div className="bg-gradient-to-br from-blue-700 to-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
            <span role="img" aria-label="bell" className="text-white text-3xl">🔔</span>
          </div>

          <p className="text-gray-700 text-base mt-2 text-center">Click to view all requests</p>

          <span className="absolute top-4 right-6 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold shadow-md">
            {leaveRequests.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HODpage;
