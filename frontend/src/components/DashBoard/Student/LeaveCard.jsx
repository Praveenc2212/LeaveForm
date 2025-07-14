import React from "react";
import Footer from "../../../footer";
import { useNavigate } from "react-router-dom";

function LeaveCard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-10 py-10 w-full px-4 max-w-screen-md">
        {/* Apply Leave */}
        <button
          className="w-full max-w-[180px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          <button
            className="w-full max-w-[180px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/recentleave")}
          >
            {/* SVG icon for Leave Status: clipboard with checklist and blue checkmark */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="16" y="14" width="32" height="40" rx="6" fill="#FFF7ED" stroke="#FB923C" strokeWidth="2.5" />
              <rect x="24" y="8" width="16" height="8" rx="4" fill="#FFF7ED" stroke="#FB923C" strokeWidth="2.5" />
              <rect x="22" y="22" width="20" height="4" rx="2" fill="#FB923C" />
              <rect x="22" y="30" width="20" height="4" rx="2" fill="#FB923C" />
              <rect x="22" y="38" width="12" height="4" rx="2" fill="#FB923C" />
              <rect x="22" y="46" width="8" height="4" rx="2" fill="#FB923C" />
              <circle cx="48" cy="48" r="9" fill="#FB923C" stroke="#FB923C" strokeWidth="2" />
              <polyline points="44,48 48,52 52,44" fill="none" stroke="#FFF7ED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-black">Leave Status</span>
          </button>
          <button
            className="w-full max-w-[180px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
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
      //{/* Only one Footer at the bottom */}
    //</div>
  );
}

export default LeaveCard;