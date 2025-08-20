import React from "react";
import { CircleUserRound } from "lucide-react";
import { useEffect } from "react";
import useStaffFormStore from "../../store/useStaffFormStore";
import useHodFormStore from "../../store/useHodFormStore";
function HodPendingLeaveRequests() {
  const sampleLeaves = [
    {
      _id: "1",
      applicantId: {
        name: "Praveen Kumar",
        rollno: "21CS101",
        department: "CSE",
        year: "3rd",
        section: "A",
        place: "Chennai",
      },
      startDate: "2025-08-20",
      endDate: "2025-08-22",
      noOfLeaves: 3,
      reason: "Family Function",
    },
    {
      _id: "2",
      applicantId: {
        name: "Anitha R",
        rollno: "21CS112",
        department: "IT",
        year: "2nd",
        section: "B",
        place: "Coimbatore",
      },
      startDate: "2025-09-01",
      endDate: "2025-09-02",
      noOfLeaves: 2,
      reason: "Medical Checkup",
    },
  ];

  const {setHodAccepteTheForm } = useHodFormStore();

  const handleAccept =async (id) =>{
    await setHodAccepteTheForm(id);
    console.log("Accepted leave:", id);
  }
  const handleReject = (id) =>{

    console.log("Rejected leave:", id);
  }
    
  const handleDiscussed = (id) =>{

    console.log("Discussed leave:", id);
  }
  const { acceptedLeaves , getFacultyAcceptedForms } = useStaffFormStore();
  console.log("Accepted Leaves:", acceptedLeaves[0]);
  useEffect(() => { 
    getFacultyAcceptedForms();

  } , [getFacultyAcceptedForms]); ;
  const hodleaves = acceptedLeaves;
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Pending Leave Requests
      </h1>

      {/* Smaller & Beautiful Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hodleaves.map((leave) => (
          <div
            key={leave._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b pb-2">
              <CircleUserRound className="w-10 h-10 text-orange-400" />
              <div>
                <h2 className="font-semibold text-gray-800 text-sm">
                  {leave.applicantId.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {leave.applicantId.rollno} • {leave.applicantId.department}
                </p>
                <p className="text-xs text-gray-400">
                  {leave.applicantId.year} | Sec {leave.applicantId.section}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Leaves:</strong> {leave.noOfLeaves}
              </p>
              <p>
                <strong>📅</strong> { new Date(leave.startDate).toLocaleDateString() } → {new Date(leave.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>📍</strong> {leave.applicantId.place}
              </p>
              <p>
                <strong>Reason:</strong> {leave.reason}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleReject(leave._id)}
                className="flex-1 py-1.5 border text-xs border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                Decline
              </button>
              <button
                onClick={() => handleAccept(leave._id)}
                className="flex-1 py-1.5 border text-xs border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleDiscussed(leave._id)}
                className="flex-1 py-1.5 border text-xs border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition"
              >
                Discussed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HodPendingLeaveRequests;
