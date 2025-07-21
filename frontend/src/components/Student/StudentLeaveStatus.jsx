import React from "react";
import ProgressCard from "./StudentLeaveStatusCard.jsx";
import { useAuthStore } from '../../store/useAuthStore.jsx';
function StudentLeaveStatus() {
  const { leaveForms } = useAuthStore();
  const leaveData = null;

  return (
    <div className="pt-10 overflow-hidden bg-white flex items-center justify-center">
      {leaveData ? (
        <ProgressCard
          status={leaveForms.status}
          staffAccepted={leaveForms.startDate}
          hodAccepted={leaveForms.endDate}
          reason={leaveForms.reason}
        />
      ) : (
        <div className="pt-50 text-gray-500 text-2xl font-medium text-center px-4">
          No Recent Leave Data Available.
        </div>
      )}
    </div>
  );
}

export default StudentLeaveStatus;


/*
{
    "success": true,
    "message": "Data fetched successfully.",
    "LeaveForm": {
        "_id": "687b9f20f62cff91a92d6fd4",
        "startDate": "2025-07-19T00:00:00.000Z",
        "endDate": "2025-07-21T00:00:00.000Z",
        "reason": "home town Festival",
        "status": "Pending"
    }
}

*/