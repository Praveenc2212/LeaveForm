import React from "react";
import { useNavigate } from "react-router-dom";

function HODDashboard() {

  const navigate = useNavigate();
  // const leaveRequests = [
  //     { id: 1, studentName: 'Praveen M', days: 3, startDate: '2025-06-20', endDate: '2025-06-22', pic: PraveenM },
  //     { id: 2, studentName: 'Praveen C', days: 2, startDate: '2025-06-25', endDate: '2025-06-26', pic: PraveenC },
  //     { id: 3, studentName: 'Praveen R', days: 1, startDate: '2025-06-30', endDate: '2025-07-01', pic: PraveenR },
  //   ];
  

  // Glassmorphism-style box class
 const glassBox = `w-full max-w-[200px] aspect-square 
  bg-white/10 border border-white/30 backdrop-blur-lg 
  rounded-2xl shadow-[0_6px_12px_#fcd9b0] 
  transition duration-300 transform hover:scale-105 
  hover:shadow-[0_10px_20px_#fcd9b0] 
  flex items-center justify-center`;
  return (
    <div
      className="min-h-screen w-full bg-orange-100/50 bg-center flex items-center justify-center px-4"
      // style={{ backgroundColor: "bg-orange-100/50" }}
    >
      <div className="flex flex-col items-center justify-center gap-10 py-10 w-full px-4 max-w-screen-md">

        {/* II Year */}
        {/* III Year */}
          <button onClick={() => navigate("/hod/leaverequests"  )} className={glassBox}>
            <span className="text-4xl font-extrabold text-orange-400 drop-shadow-lg">
              <div className="text-4xl font-bold">II</div>
              <div className="text-xl">Year</div>
            </span>
          </button>

        {/* III & IV Year */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">

          {/* III Year */}
          <button onClick={() => navigate("/hod/leaverequests")} className={glassBox}>
            <span className="text-4xl font-extrabold text-orange-400 drop-shadow-lg">
              <div className="text-4xl font-bold">III</div>
              <div className="text-xl">Year</div>
            </span>
          </button>
          {/* IV Year */}
          <button onClick={() => navigate("/hod/leaverequests")} className={glassBox}>
            <span className="text-4xl font-extrabold text-orange-400 drop-shadow-lg">
              <div className="text-4xl font-bold">IV</div>
              <div className="text-xl">Year</div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HODDashboard;