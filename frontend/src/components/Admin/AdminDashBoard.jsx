import { useNavigate } from "react-router-dom";

function AdminDashBoard() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "-20px" }} className="bg-white font-sans flex items-start justify-center p-4 sm:items-center">
      <div className="w-full max-w-screen-md flex flex-col items-center gap-6 mt-0 pt-4 sm:pt-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
        <button
          className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/20"
          onClick={() => navigate("/adminstudent")}
        >
          <img
            src="/icons/student.svg"
            alt="Student"
            className="w-[60px] h-[60px] -mr-3"
          />
          <span className="text-sm text-black">Student</span>
        </button>

        <button
            className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/adminfaculty")}
          >
            <img
              src="/icons/staff1.svg"
              alt="Leave Status"
              className="w-[80px] h-[80px] mb-[-10px]"
            />
            <span className="text-sm text-black">Faculty</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          
          <button
            className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/adminclass")}
          >
            <img
              src="/icons/class1.svg"
              alt="Leave History"
              className="w-[70px] h-[70px]"
            />
            <span className="text-sm text-black">Class</span>
          </button>

          <button
            className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/adminwarden")}
          >
            <img
              src="/icons/hostel1.svg"
              alt="Leave History"
              className="w-[70px] h-[70px]"
            />
            <span className="text-sm text-black">Warden</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
