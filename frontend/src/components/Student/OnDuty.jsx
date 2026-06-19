import { useState } from "react";
import OnDutyApproved from "./OnDutyApproved";
import OnDutyHistory from "./OnDutyHistory";

function OnDuty() {
  const [activeTab, setActiveTab] = useState("onDuty"); // State to manage active tab
  const [form, setForm] = useState({
    date: "",
    fromDate: "",
    toDate: "",
    eventName: "",
    venue: "",
    students: [{ rollNo: "", name: "", class: "", workInvolved: "" }]
  });

  const years = ["I", "II", "III", "IV"];
  const departments = ["CSE", "EEE", "ECE", "MECH", "IT"];
  const sections = ["A", "B", "C"];

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [tempClass, setTempClass] = useState({ year: "", dept: "", section: "" });
  const [signatures, setSignatures] = useState({
    facultyCoordinator: false,
    hod: false,
    principal: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...form.students];
    updatedStudents[index][field] = value;
    setForm((prev) => ({ ...prev, students: updatedStudents }));
  };

  const addStudent = () => {
    setForm((prev) => ({
      ...prev,
      students: [...prev.students, { rollNo: "", name: "", class: "", workInvolved: "" }]
    }));
  };

  const removeStudent = (index) => {
    const updatedStudents = form.students.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, students: updatedStudents }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to your API endpoint for On Duty application
    console.log(form);
    alert("On Duty request submitted.");
  };

  const openClassModal = (index) => {
    const current = form.students[index]?.class || "";
    const [year = "", dept = "", section = ""] = current.split("-").map((s) => s.trim());
    setTempClass({ year, dept, section });
    setActiveIndex(index);
    setModalOpen(true);
  };

  const confirmClass = () => {
    if (!tempClass.year || !tempClass.dept || !tempClass.section) return;
    const updated = [...form.students];
    updated[activeIndex].class = `${tempClass.year}-${tempClass.dept}-${tempClass.section}`;
    setForm((prev) => ({ ...prev, students: updated }));
    setModalOpen(false);
    setActiveIndex(null);
  };

  const cancelClass = () => {
    setModalOpen(false);
    setActiveIndex(null);
  };

  const handleSignatureClick = (role) => {
    setSignatures((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "onDuty":
        return (
          <div>
            {/* Existing On Duty form code goes here */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Date block */}
              <div className="flex flex-col gap-3 md:flex-row md:justify-end md:items-center">
                <label className="flex items-center gap-2">
                  <span className="text-sm font-semibold">DATE:</span>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1"
                    required
                  />
                </label>
                <label className="flex items-center gap-2">
                  <span className="text-sm font-semibold">From:</span>
                  <input
                    type="date"
                    name="fromDate"
                    value={form.fromDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1"
                    required
                  />
                </label>
                <label className="flex items-center gap-2">
                  <span className="text-sm font-semibold">To:</span>
                  <input
                    type="date"
                    name="toDate"
                    value={form.toDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1"
                    required
                  />
                </label>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <p className="text-sm">
                  The following students were involved in the duties to organize the event
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Event Name:</span>
                    <input
                      type="text"
                      name="eventName"
                      value={form.eventName}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2"
                      placeholder="e.g., DRONA"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">Venue:</span>
                    <input
                      type="text"
                      name="venue"
                      value={form.venue}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2"
                      placeholder="e.g., VCETC&E College of Engineering"
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-2 py-2 text-sm">S.No</th>
                      <th className="border border-gray-400 px-2 py-2 text-sm">Roll NO</th>
                      <th className="border border-gray-400 px-2 py-2 text-sm">Name</th>
                      <th className="border border-gray-400 px-2 py-2 text-sm">Class</th>
                      <th className="border border-gray-400 px-2 py-2 text-sm">Work Involved</th>
                      <th className="border border-gray-400 px-2 py-2 text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.students.map((student, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-2 py-2 text-center text-sm">
                          {index + 1}
                        </td>
                        <td className="border border-gray-400 px-2 py-2">
                          <input
                            type="text"
                            value={student.rollNo}
                            onChange={(e) => handleStudentChange(index, "rollNo", e.target.value)}
                            className="w-full px-2 py-1 text-sm"
                            placeholder="Roll No"
                            required
                          />
                        </td>
                        <td className="border border-gray-400 px-2 py-2">
                          <input
                            type="text"
                            value={student.name}
                            onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                            className="w-full px-2 py-1 text-sm"
                            placeholder="Student Name"
                            required
                          />
                        </td>
                        <td className="border border-gray-400 px-2 py-2">
                          <button
                            type="button"
                            onClick={() => openClassModal(index)}
                            className="w-full px-2 py-1 text-sm text-left border border-gray-300 rounded hover:bg-gray-50"
                          >
                            {student.class || "Select Class"}
                          </button>
                        </td>
                        <td className="border border-gray-400 px-2 py-2">
                          <input
                            type="text"
                            value={student.workInvolved}
                            onChange={(e) => handleStudentChange(index, "workInvolved", e.target.value)}
                            className="w-full px-2 py-1 text-sm"
                            placeholder="Work description"
                            required
                          />
                        </td>
                        <td className="border border-gray-400 px-2 py-2 text-center">
                          {form.students.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStudent(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Student Button */}
              <button
                type="button"
                onClick={addStudent}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 self-start"
              >
                + Add Student
              </button>

              {/* Signature Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 pt-6 border-t">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleSignatureClick("facultyCoordinator")}
                    className="w-full h-16 border-b border-gray-400 mb-2 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    {signatures.facultyCoordinator ? (
                      <span className="text-3xl text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-300"></span>
                    )}
                  </button>
                  <p className="text-sm font-semibold">Faculty Coordinator</p>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleSignatureClick("hod")}
                    className="w-full h-16 border-b border-gray-400 mb-2 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    {signatures.hod ? (
                      <span className="text-3xl text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-300"></span>
                    )}
                  </button>
                  <p className="text-sm font-semibold">HOD/CS</p>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleSignatureClick("principal")}
                    className="w-full h-16 border-b border-gray-400 mb-2 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    {signatures.principal ? (
                      <span className="text-3xl text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-300"></span>
                    )}
                  </button>
                  <p className="text-sm font-semibold">Principal</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-orange-500 text-white rounded px-6 py-3 hover:bg-orange-600 self-center mt-4 font-semibold"
              >
                Submit On-Duty Form
              </button>
            </form>

            {/* Class Selection Modal */}
            {modalOpen && (
              <div 
                onClick={cancelClass}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-xl shadow-xl w-[420px] max-w-full p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">Select Class</h2>
                      <p className="text-sm text-gray-600">Choose Year, Department, and Section</p>
                    </div>
                    <button
                      type="button"
                      onClick={cancelClass}
                      className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="flex flex-col gap-1 text-sm">
                      <span className="font-medium">Year</span>
                      <select
                        value={tempClass.year}
                        onChange={(e) => setTempClass((p) => ({ ...p, year: e.target.value }))}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="">Select Year</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-sm">
                      <span className="font-medium">Department</span>
                      <select
                        value={tempClass.dept}
                        onChange={(e) => setTempClass((p) => ({ ...p, dept: e.target.value }))}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-sm">
                      <span className="font-medium">Section</span>
                      <select
                        value={tempClass.section}
                        onChange={(e) => setTempClass((p) => ({ ...p, section: e.target.value }))}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="">Select Section</option>
                        {sections.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={cancelClass}
                      className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmClass}
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Confirm & Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "onDutyApproved":
        return (
          <div>
            
            <OnDutyApproved />
          </div>
        );
      case "history":
        return (
          <div>
            
            <OnDutyHistory />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white rounded-lg shadow-lg">
      {/* Tab Navigation */}
      <div className="flex justify-around border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === "onDuty" ? "font-bold border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("onDuty")}
        >
          On Duty
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "onDutyApproved" ? "font-bold border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("onDutyApproved")}
        >
          On Duty Approved
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "history" ? "font-bold border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-1 border-b-2 pb-4">
        <h2 className="text-lg font-semibold">Department of Computer Science and Engineering</h2>
        <h1 className="text-2xl font-bold mt-4 underline">ON-DUTY FORM</h1>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default OnDuty;