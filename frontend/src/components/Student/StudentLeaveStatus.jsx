import React, { useEffect } from "react";
import ProgressCard from "./StudentLeaveStatusCard.jsx";
import { useFormStore } from "../../store/useFormStore.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

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
            className="absolute top-3 left-3 z-50 w-10 h-10 flex items-center justify-center
                       rounded-full border border-transparent 
                       bg-orange-50 text-orange-600
                       hover:border-orange-500 hover:bg-orange-100
                       transition-all duration-200"
          >
            <img
              src="/icons/undo-2.svg"
              alt="Back"
              className="w-[24px] h-[24px]"
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
