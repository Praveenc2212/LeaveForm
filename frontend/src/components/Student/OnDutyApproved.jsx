import React, { useState } from "react";

function OnDutyApproved() {
  const [approvedRequests] = useState([
    {
      id: 1,
      studentName: "Praveen C",
      rollNo: "717823P242",
      fromDate: "26/12/2025",
      toDate: "27/12/2025",
      duration: "2 Days",
      eventName: "Jana Nayagan Audio Launch",
      approvedBy: "HOD",
      status: "Approved by HOD"
    },
    {
      id: 2,
      studentName: "Rahul Kumar",
      rollNo: "717823P243",
      fromDate: "28/12/2025",
      toDate: "29/12/2025",
      duration: "2 Days",
      eventName: "Tech Summit 2025",
      approvedBy: "Principal",
      status: "Approved by Principal"
    },
     {
      id: 3,
      studentName: "Rahul Kumar",
      rollNo: "717823P243",
      fromDate: "28/12/2025",
      toDate: "29/12/2025",
      duration: "2 Days",
      eventName: "Tech Summit 2025",
      approvedBy: "Principal",
      status: "Approved by Principal"
    },
     {
      id: 5,
      studentName: "Rahul Kumar",
      rollNo: "717823P243",
      fromDate: "28/12/2025",
      toDate: "29/12/2025",
      duration: "2 Days",
      eventName: "Tech Summit 2025",
      approvedBy: "Principal",
      status: "Approved by Principal"
    }
  ]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">On Duty Approved</h2>
      
      {approvedRequests.length > 0 ? (
        <div className="space-y-4">
          {approvedRequests.map((request) => (
            <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
              {/* Header with Student Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">👤</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{request.studentName}</h3>
                  <p className="text-sm text-gray-500">{request.rollNo}</p>
                </div>
              </div>

              {/* Date and Duration */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500 flex items-center gap-2">
                    <span>📅</span> From:
                  </p>
                  <p className="font-medium text-gray-800">{request.fromDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center gap-2">
                    <span>📅</span> To:
                  </p>
                  <p className="font-medium text-gray-800">{request.toDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center gap-2">
                    <span>#</span> Duration:
                  </p>
                  <p className="font-medium text-gray-800">{request.duration}</p>
                </div>
              </div>

              {/* Event Name */}
              <div className="mb-4 pl-4 border-l-4 border-green-500">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>📝</span> Event Name
                </p>
                <p className="text-gray-800 italic">{request.eventName}</p>
              </div>

              {/* Approval Status and Download */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-green-600">
                  <span className="text-xl">✓</span>
                  <p className="font-medium">{request.status}</p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
                  <span>⬇️</span> Download Proof
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 text-center py-8">No approved on-duty requests found.</p>
      )}
    </div>
  );
}

export default OnDutyApproved;