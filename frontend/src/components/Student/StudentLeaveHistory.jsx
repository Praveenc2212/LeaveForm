import React from "react";
import { useNavigate } from "react-router-dom";
import StudentLeaveCard from "./StudentLeaveCard";

const historyLeaves = [
  {
    Reason: "Sick",
    StartDate: "10/05/2025",
    EndDate: "12/05/2025",
  },
  {
    Reason: "Family Function",
    StartDate: "15/04/2025",
    EndDate: "16/04/2025",
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025",
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025",
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025",
  },
];

function StudentLeaveHistory() {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col items-center justify-center p-4 py-10 h-135">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg shadow-black/30 p-8 relative">

        {/* Back Button in top-left inside card */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 flex items-center justify-center 
             w-9 h-9 rounded-full border border-transparent 
             bg-orange-50 text-orange-600 
             hover:border-orange-500 transition-all duration-200"
        >
          <img
            src="/icons/undo-2.svg"
            alt="Back"
            className="w-[28px] h-[28px] transition-colors duration-200 group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-500 group-hover:hue-rotate-[360deg] group-hover:text-orange-500"
          />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Leave History
        </h1>

        <div
          className="h-96 overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#B2C8D2FF transparent",
          }}
        >
          {historyLeaves.map((leave, idx) => (
            <StudentLeaveCard
              key={idx}
              Reason={leave.Reason}
              StartDate={leave.StartDate}
              EndDate={leave.EndDate}
            />
          ))}

          <style>
            {`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-thumb {
              background-color: rgba(100, 100, 100, 0.2);
              border-radius: 4px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
          `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default StudentLeaveHistory;
