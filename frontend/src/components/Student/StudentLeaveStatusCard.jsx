import React, { useRef } from "react";
import LeaveFormDownload from "./LeaveFormDownload.jsx";

function StudentLeaveStatusCard({ leaveStatus }) {
  const downloadRef = useRef();

  const { reason, startDate, endDate, status } = leaveStatus;
  console.log(new Date(endDate) - new Date(startDate));
  const days = new Date(endDate) - new Date(startDate);
  console.log("Days:", days / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  const day = days / (1000 * 60 * 60 * 24) + 1; // Including both start and end date

  const applied = true;
  const staffAccepted = status === "Reviewed" || status === "HOD Accepted";
  const hodAccepted = status === "Approved" || status === "HOD Accepted";

  return (
    // Removed min-w-[600px] and min-h-[400px] for better mobile responsiveness
    // Added p-4 for smaller padding on mobile, and md:p-10 for larger screens
    <div className="mx-auto rounded-[30px] p-15 sm:pl-20  sm:pr-20 sm:pt-5 sm:pb-5  shadow-md bg-white/10 backdrop-blur-md border border-gray-200 flex flex-col justify-center items-center space-y-6 md:space-y-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">Leave Progress</h2>

      {/* Progress Tracker */}
      {/* Reduced space-x on small screens, added flexibility */}
      <div className="flex items-center justify-center w-full border border-gray-200 rounded-xl sm:px-28 px-10 py-3  bg-white/30 text-xs md:text-sm">
        <div className="flex flex-col items-center flex-1">
          <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${applied ? "bg-green-500" : "bg-gray-300"}`} />
          <span className="mt-1 text-center">Applied</span>
        </div>
        <div className={`flex-1 h-1 ${(staffAccepted )? "bg-green-500" : "bg-gray-300"} mx-1 md:mx-2`} />
        <div className="flex flex-col items-center flex-1">
          <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${staffAccepted || hodAccepted? "bg-green-500" : "bg-gray-300"}`} />
          <span className="mt-1 text-center">Staff Accepted</span>
        </div>
        <div className={`flex-1 h-1 ${hodAccepted ? "bg-green-500" : "bg-gray-300"} mx-1 md:mx-2`} />
        <div className="flex flex-col items-center flex-1">
          <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${hodAccepted ? "bg-green-500" : "bg-gray-300"}`} />
          <span className="mt-1 text-center">HOD Accepted</span>
        </div>
      </div>

      {/* Leave Details - Block B (NO SHADOW) */}
      {/* Changed flex direction for responsiveness, adjusted padding */}
      <div className="w-full max-w-xl text-sm text-gray-700 font-medium space-y-3 border border-gray-200 rounded-xl px-4 py-3 md:px-6 md:py-4 bg-white/40">
        <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
          <div className="font-normal"> <strong> Reason: </strong> {reason || "-"}</div>
          {/* Reverted pl-61 to pl-10 for better Tailwind compatibility,
              and also added ml-0 md:ml-auto md:pl-10 for mobile/desktop alignment */}
          <div className="ml-0 md:ml-auto pl-0 md:pl-10">
           <strong> Days:</strong> {day ? day : "-"}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
          <div> <strong>
            Start Date:{" "} </strong>
            <span className="font-semibold">
              {startDate ? new Date(startDate).toLocaleDateString() : "-"}
            </span>
          </div>
          <div> <strong>
            End Date:{" "}</strong>
            <span className="font-semibold">
              {endDate ? new Date(endDate).toLocaleDateString() : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Hidden PDF Component */}
      <LeaveFormDownload
        name="Praveen"
        rollNumber="CSE123"
        department="CSE"
        reason={reason}
        startDate={startDate}
        endDate={endDate}
        ref={downloadRef}
      />
    </div>
  );
}

export default StudentLeaveStatusCard;