import React from "react";
import ProgressCard from "./ProgressCard";
import { useAuthStore } from '../../../store/AuthStore.jsx';
function RecentLeavePage() {
  // const leaveData = [];
  const { leaveForms } = useAuthStore();
  
  return (



    <div className="w-screen h-screen overflow-hidden bg-white flex items-center justify-center">
      {leaveForms ? (
        <ProgressCard
          status={leaveForms.status}
          staffAccepted={leaveForms.startDate}
          hodAccepted={leaveForms.endDate}
          reason={leaveForms.reason}
        />
      ) : (
        <div className="text-gray-500 text-2xl font-medium text-center px-4">
          No recent leave data available.
        </div>
      )}
    </div>
  );
}

export default RecentLeavePage;
