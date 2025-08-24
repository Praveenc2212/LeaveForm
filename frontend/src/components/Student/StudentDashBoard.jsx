import { useNavigate } from "react-router-dom";

function StudentDashBoard() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "-20px" }} className="bg-white font-sans flex items-start justify-center py-10 sm:items-center">
      <div className="w-full max-w-screen-md flex flex-col items-center gap-6 mt-0 pt-4 sm:pt-20">
        {/* Apply Leave */}
        <button
          className="w-full sm:max-w-[180px] max-w-[140px] aspect-square bg-orange-100 rounded-2xl hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/20"
          onClick={() => navigate("/student/ApplyLeaveForm")}
        >
          <img
            src="/icons/fill.svg"
            alt="Apply Leave"
            className="w-[60px] h-[60px] -mr-3"
          />
          <span className="text-sm text-black">Apply Leave</span>
        </button>

        {/* Status + History */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          <button
            className="w-full sm:max-w-[180px] max-w-[140px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/student/StudentLeaveStatus")}
          >
            <img
              src="/icons/formStatus.svg"
              alt="Leave Status"
              className="w-[80px] h-[80px] mb-[-10px]"
            />
            <span className="text-sm text-black">Leave Status</span>
          </button>
          <button
            className="w-full sm:max-w-[180px] max-w-[140px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/student/StudentLeaveHistory")}
          >
            <img
              src="/icons/history.svg"
              alt="Leave History"
              className="w-[70px] h-[70px]"
            />
            <span className="text-sm text-black">Leave History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashBoard;
