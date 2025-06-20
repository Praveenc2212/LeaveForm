import React, { useState } from "react";
import Header from "../Header"
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
    <div>
      <Header/>
<center>
   
  <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-md gap-6 "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Leave Form</h2>

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
          <label className="block font-medium mb-1">Year</label>
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
          <label className="block font-medium mb-1">End Date</label>
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
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit Leave Form
        </button>
      </form>
      </center>
      </div>
  );
};

export default LeaveForm;
