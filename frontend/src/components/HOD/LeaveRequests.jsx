import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './../Header';
import LeaveCard from './LeaveCard';

function LeaveRequests() {
  const navigate = useNavigate();
  const location = useLocation();
  const leaveRequests = location.state?.leaveRequests || [];

  const handleAccept = (id) => {
    alert(`Accepted leave request with ID: ${id}`);
    // Implement logic to update backend/state here
  };

  const handleReject = (id) => {
    alert(`Rejected leave request with ID: ${id}`);
    // Implement logic to update backend/state here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-blue-300 font-sans p-4">
      <Header />

      <button
        onClick={() => navigate('/staff')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-6"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col gap-4">
        {leaveRequests.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No pending leave requests.</p>
        ) : (
          leaveRequests.map((req) => (
            <LeaveCard
              key={req.id}
              name={req.studentName}
              days={req.days}
              startDate={req.startDate}
              endDate={req.endDate}
              pic={req.pic}
              onAccept={() => handleAccept(req.id)}
              onReject={() => handleReject(req.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default LeaveRequests;
