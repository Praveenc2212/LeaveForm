import React from "react";

function RecentLeavePage() {
  const leaveData = [];

  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex items-center justify-center">
      {leaveData.length > 0 ? (
        leaveData.map((leave, i) => (
          <RecentLeaveCard
            key={i}
            Reason={leave.Reason}
            StartDate={leave.StartDate}
            EndDate={leave.EndDate}
          />
        ))
      ) : (
        <div className="text-gray-500 text-2xl font-medium text-center px-4">
          No recent leave data available.
        </div>
      )}
    </div>
  );
}

export default RecentLeavePage;
