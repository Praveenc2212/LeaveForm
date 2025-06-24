import React, { useState } from "react";
import Header from "../Header";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    section: "",
    year: "",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-300  to-blue-300 font-sans p-4">
      {/* Header at the top */}
      <Header />

      {/* Centered Form */}
      <div className="flex items-center justify-center px-4 py-12 text-black">
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 text-black backdrop-blur-md rounded-xl shadow-md p-8 border border-white/30 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center ">Leave Form</h2>

          <div className="mb-4">
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Section</label>
            <input
              type="text"
              name="section"
              required
              value={formData.section}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1 ">Year</label>
            <input
              type="text"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Reason</label>
            <textarea
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1 ">End Date</label>
            <input
              type="date"
              name="endDate"
              required
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Leave Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
