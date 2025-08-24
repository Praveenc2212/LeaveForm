import React, { useEffect } from "react";
import ProgressCard from "./StudentLeaveStatusCard.jsx";
import { useFormStore } from "../../store/useFormStore.jsx";
import { useNavigate } from "react-router-dom";

function StudentLeaveStatus() {
  const { leaveStatus, getStudentLeaveStatus } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    getStudentLeaveStatus();
  }, []);

  console.log("Status of the student", leaveStatus);

  const leaveData = leaveStatus;

  return (
    <div className="bg-white py-10 p-5 flex items-center justify-center">
      {leaveData ? (
        <div className="relative w-full max-w-md">
          {/* Back Button inside card */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 z-50 p-1 rounded-full hover:bg-gray-100"
          >
            <img
              src="/icons/back.svg"
              alt="Back"
              className="w-[28px] h-[28px]"
            />
          </button>

          {/* Leave Status Card */}
          <ProgressCard leaveStatus={leaveData} />
        </div>
      ) : (
        <div className="text-gray-500 text-2xl font-medium text-center px-4">
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