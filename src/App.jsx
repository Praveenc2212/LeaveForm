import React from 'react';
import StaffDashBoard from './components/StaffDashBoard';
import StudentHistory from './components/StudentHistory';

function App() {
  const leaveData = [
    { reason: "Sick leave", date: "2025-03-01", taken: "2 days", total: "10 days" },
    { reason: "Personal work", date: "2025-06-02", taken: "1 day", total: "10 days" }
  ];

  return (
    <>
      <h1>Staff Dashboard - Leave Requests</h1>
      {leaveData.map((leave, index) => (
        <StaffDashBoard
          key={"staff-" + index}
          reason={leave.reason}
          date={leave.date}
          taken={leave.taken}
          total={leave.total}
        />
      ))}

      <hr />

      <h1>Student Leave History</h1>
      {leaveData.map((leave, index) => (
        <StudentHistory
          key={"student-" + index}
          reason={leave.reason}
          date={leave.date}
        />
      ))}
    </>
  );
}

export default App;
