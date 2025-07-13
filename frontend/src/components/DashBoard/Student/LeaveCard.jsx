import React from "react";
import { useNavigate } from "react-router-dom";

function LeaveCard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-10 py-10 w-full px-4 max-w-screen-md">
        {/* Apply Leave */}
        <button
          className="w-full max-w-[180px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2"
          onClick={() => navigate("/student/leaveform")}
        >
          {/* SVG icon for Apply Leave with orange accent */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12"
              y="8"
              width="24"
              height="32"
              rx="3"
              fill="#FFF7ED"
              stroke="#FB923C"
              strokeWidth="2"
            />
            <line
              x1="16"
              y1="16"
              x2="32"
              y2="16"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="22"
              x2="32"
              y2="22"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="28"
              x2="32"
              y2="28"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="34"
              x2="32"
              y2="34"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="36"
              cy="36"
              r="6"
              fill="#FFF7ED"
              stroke="#FB923C"
              strokeWidth="2"
            />
            <line
              x1="36"
              y1="33"
              x2="36"
              y2="39"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="33"
              y1="36"
              x2="39"
              y2="36"
              stroke="#FB923C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm text-black">Apply Leave</span>
        </button>

        {/* Status + History */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
          <button
            className="w-full max-w-[180px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2"
            onClick={() => navigate("/recentleave")}
          >
            {/* SVG icon for Leave Status with orange accent and larger, centered tick */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="12" y="8" width="24" height="32" rx="3" fill="#FFF7ED" stroke="#FB923C" strokeWidth="2"/>
              <polyline points="18,28 24,34 30,20" fill="none" stroke="#FB923C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-black">Leave Status</span>
          </button>
          <button
            className="w-full max-w-[180px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2"
            onClick={() => navigate("/history")}
          >
            {/* SVG icon for Leave History with orange accent and aligned lines */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="10"
                width="24"
                height="32"
                rx="3"
                fill="#FFF7ED"
                stroke="#FB923C"
                strokeWidth="2"
              />
              <rect
                x="14"
                y="6"
                width="24"
                height="32"
                rx="3"
                fill="#FFF7ED"
                stroke="#FB923C"
                strokeWidth="2"
              />
              <rect
                x="20"
                y="2"
                width="24"
                height="32"
                rx="3"
                fill="#FFF7ED"
                stroke="#FB923C"
                strokeWidth="2"
              />
              <line
                x1="26"
                y1="12"
                x2="38"
                y2="12"
                stroke="#FB923C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="18"
                x2="38"
                y2="18"
                stroke="#FB923C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="24"
                x2="38"
                y2="24"
                stroke="#FB923C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="30"
                x2="38"
                y2="30"
                stroke="#FB923C"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm text-black">Leave History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveCard;
