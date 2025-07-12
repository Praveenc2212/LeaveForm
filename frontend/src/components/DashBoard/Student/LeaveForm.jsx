import React, { useState } from "react";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Form Data:", formData);
    alert("Leave Form Submitted!");
  };
  return (
    <div className="min-h-screen bg-[#FFF9F4] flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-2xl mx-auto p-6 sm:p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          
          <h2 className="text-3xl font-bold text-black mb-2 text-center">
            Leave Form
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1  text-black ">
              Reason
            </label>
            <textarea
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              className="w-full border border-[#FFB066] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB066] placeholder-gray-400 transition bg-white"
              rows="3"
              placeholder="Reason For Leave"
            ></textarea>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1  text-black ">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-[#FFB066] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB066] transition bg-white"
                placeholder="dd-mm-yyyy"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1  text-black ">
                End Date
              </label>  
              <input
                type="date"
                name="endDate"
                required 
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-[#FFB066] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB066] transition bg-white"
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>
          
            <button
              type="submit"
              className="w-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-3 cursor-pointer rounded-md transition"
            > 
            Submit Leave Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;