import React from "react";
import RecentLeaveCard from "./RecentLeaveCard";
// Dummy data for demonstration
const historyLeaves = [
  {
    Reason: "Sick",
    StartDate: "10/05/2025",
    EndDate: "12/05/2025"
  },
  {
    Reason: "Family Function",
    StartDate: "15/04/2025",
    EndDate: "16/04/2025"
  },
  {
    Reason: "Medical",
    StartDate: "20/03/2025",
    EndDate: "22/03/2025"
  }
];
function History() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Leave History</h1>
        {historyLeaves.map((leave, idx) => (
          <RecentLeaveCard
            key={idx}
            Reason={leave.Reason}
            StartDate={leave.StartDate}
            EndDate={leave.EndDate}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
