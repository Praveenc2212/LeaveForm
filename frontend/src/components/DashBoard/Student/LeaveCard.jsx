import React from "react";
import { useNavigate } from "react-router-dom";

function LeaveCard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Leave Form</h2>
        <div className="flex flex-col gap-4 w-full">
          <button
            className="w-full py-3 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium transition"
            onClick={() => navigate("/leaveform")}
          >
            Apply Leave
          </button>
          <button
            className="w-full py-3 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium transition"
            onClick={() => navigate("/recentleave")}
          >
            Status
          </button>
          <button
            className="w-full py-3 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium transition"
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveCard;
