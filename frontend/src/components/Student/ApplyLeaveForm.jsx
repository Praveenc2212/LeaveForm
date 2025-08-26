import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "../../store/useFormStore";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader } from "lucide-react";

const ApplyLeaveForm = () => {
  const navigate = useNavigate();
  const { userData } = useAuthStore();
  const { ApplyForm, isApplying } = useFormStore();

  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
    classId: userData ? userData.classId : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = () => {
    const { reason, startDate, endDate } = formData;
    if (reason.split(" ").length < 3)
      return toast.error("Reason must be at least 3 words long");
    if (!startDate || !endDate)
      return toast.error("Please select both start and end dates");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    if (start < today) return toast.error("Start date cannot be in the past");
    if (start > new Date(endDate))
      return toast.error("Start date must be before end date");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      await ApplyForm(formData);
      navigate("/student/StudentLeaveStatus");
    }
  };

  return (
    <>
      {/* Form Card */}
      <div className="flex items-center justify-center py-10 sm:pt-20 px-2">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-2xl mx-auto p-6 sm:p-8 flex flex-col items-center">

          {/* Back Button inside card - top left */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 flex items-center justify-center 
             w-9 h-9 rounded-full border border-transparent 
             bg-orange-50 text-orange-600 
             hover:border-orange-500 transition-all duration-200"
          >
            <img
              src="/icons/undo-2.svg"
              alt="Back"
              className="w-[28px] h-[28px] transition-colors duration-200 group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-500 group-hover:hue-rotate-[360deg] group-hover:text-orange-500"
            />
          </button>

          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-bold text-black mb-2 text-center">
              Leave Form
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <div>
              <label className="block font-semibold mb-1 text-black ">
                Reason
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border border-[#FFB066] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB066] placeholder-gray-400 transition bg-white resize-none"
                rows="3"
                placeholder="Reason For Leave"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-black ">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-[#FFB066] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB066] transition bg-white cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-black ">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-[#FFB066] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB066] transition bg-white cursor-pointer"
                />
              </div>
            </div>

            <button
              disabled={isApplying}
              type="submit"
              className={`w-full text-orange-600 font-medium py-3 rounded-md transition ${isApplying
                  ? "bg-orange-50 cursor-not-allowed"
                  : "bg-orange-100 hover:bg-orange-200 cursor-pointer"
                }`}
            >
              {isApplying ? (
                <div className="flex items-center justify-center">
                  Applying... <Loader className="animate-spin" size={23} />
                </div>
              ) : (
                "Apply for Leave"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyLeaveForm;
