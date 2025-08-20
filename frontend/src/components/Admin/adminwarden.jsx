import { useNavigate } from "react-router-dom";

function adminwarden() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "-20px" }} className="bg-white font-sans flex flex-col items-start justify-start p-4 sm:items-center">
      
      <div className="fixed top-20 left-4 z-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 ml-2 flex items-center text-sm text-blue-600 hover:text-blue-800 transition"
      >
         <img
              src="/icons/back.svg"
              alt="BackWard"
              className="w-[40px] h-[40px] -mr-3"
            />
      </button>
    </div>

      <div className="w-full max-w-screen-md flex flex-col items-center gap-6 mt-0 pt-4 sm:pt-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
        <button
          className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/20"
          onClick={() => navigate("/student/Addwarden")}
        >
          <img
            src="/icons/add.svg"
            alt="Apply Leave"
            className="w-[60px] h-[60px] -mr-3"
          />
          <span className="text-sm text-black">Add Warden</span>
        </button>

        <button
            className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/student/Updatewarden")}
          >
            <img
              src="/icons/update.svg"
              alt="Leave Status"
              className="w-[80px] h-[80px] mb-[-10px]"
            />
            <span className="text-sm text-black">Update Warden</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          
          <button
            className="w-full sm:max-w-[200px] max-w-[200px] aspect-square bg-orange-100 rounded-2xl shadow-lg hover:shadow-sm transition duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-black/20"
            onClick={() => navigate("/student/Deletewarden")}
          >
            <img
              src="/icons/delete.svg"
              alt="Leave History"
              className="w-[70px] h-[70px]"
            />
            <span className="text-sm text-black">Delete Warden</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default adminwarden;
