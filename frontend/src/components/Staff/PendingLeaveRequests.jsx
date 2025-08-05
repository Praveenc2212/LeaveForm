import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUserRound, House } from 'lucide-react';
// import {useStaffFormStore} from '../../store/useStaffFormStore';

function PendingLeaveRequests() {
  const navigate = useNavigate();
  const {  getFacultypending , pendingLeaves , setFacultyAccepteTheForm } = useStaffFormStore();
  const leaveRequests = pendingLeaves || [];

  // Add missing state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

  useEffect(() => {
    getFacultypending();
  }, [getFacultypending]);


  const handleAccept = async (id) => {

    await setFacultyAccepteTheForm(id);
    alert(`Accepted leave request with ID: ${id}`);

    setModalOpen(false);
  };
  const handleReject = (id) => {
    alert(`Rejected leave request with ID: ${id}`);
    setModalOpen(false);
  };
  const handleView = (req) => {
    setSelectedReq(req);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReq(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">{leaveRequests.length} New Leave Requests</h1>
        <button
          onClick={() => navigate('/staff')}
          className="bg-orange-400 text-white px-3 py-2 rounded hover:bg-orange-500 flex items-center"
        >
          <House className="w-5 h-5 mr-2" /> Dashboard
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {leaveRequests.map((leave) => (
          <div key={leave._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3">
            <div className="flex items-center gap-4 mb-2">
              <CircleUserRound className="w-10 h-10 text-orange-400" />
              <div>
                <div className="font-semibold text-gray-800">{leave.applicantId.name}</div>
                <div className="text-sm text-gray-500">{leave.applicantId.rollno}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <p><strong>Start Date:</strong> {leave.startDate}</p>
              <p><strong>End Date:</strong> {leave.endDate}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleReject(leave._id)}
                className="w-1/2 mr-2 py-2 border-2 sm:bg-green-500  text-red-500 rounded hover:bg-red-50 hover:text-white font-semibold"
              >
                Decline
              </button>
              <button
                onClick={() => handleAccept(leave._id)}
                className="w-1/2 ml-2 py-2 border-2 border-green-500 text-green-500 rounded hover:bg-green-50 hover:text-white font-semibold"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedReq && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <CircleUserRound className="w-16 h-16 text-orange-400 mb-2" />
              <h2 className="text-lg font-bold text-gray-800">{selectedReq.applicantId.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{selectedReq.applicantId.rollno}</p>
              <div className="w-full text-sm text-gray-700 mb-4">
                <p><strong>Start Date:</strong> {selectedReq.startDate}</p>
                <p><strong>End Date:</strong> {selectedReq.endDate}</p>
                <p className="mt-2"><strong>Reason:</strong> {selectedReq.reason}</p>
              </div>
              <div className="flex w-full gap-4">
                <button
                  onClick={() => handleReject(selectedReq._id)}
                  className="w-1/2 py-2 border border-red-500 text-red-500 rounded hover:bg-red-400 hover:text-white"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAccept(selectedReq._id)}
                  className="w-1/2 py-2 border border-green-500 text-green-500 rounded hover:bg-green-400 hover:text-white"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingLeaveRequests;

// /*
//  Sample API Data,
// {
//     "success": true,
//     "message": "Leave forms fetched successfully.",
//     "leaveForms": [
//         {
//             "_id": "6873d4405c0473015c4d5567",
//             "applicantId": {
//                 "_id": "6873cdca0069d5c88a1e5d4f",
//                 "name": "Praveen M",
//                 "rollno": "717823P243"
//             },
//             "classId": "6873cbd40069d5c88a1e5d3b",
//             "startDate": "2025-07-14T00:00:00.000Z",
//             "endDate": "2025-07-16T00:00:00.000Z",
//             "reason": "Marriage Function",
//             "status": "Pending",
//             "appliedAt": "2025-07-13T15:44:00.693Z",
//             "__v": 0
//         },
//         {
//             "_id": "6873d4665c0473015c4d5569",
//             "applicantId": {
//                 "_id": "6873cdb80069d5c88a1e5d4b",
//                 "name": "Praveen C",
//                 "rollno": "717823P242"
//             },
//             "classId": "6873cbd40069d5c88a1e5d3b",
//             "startDate": "2025-07-14T00:00:00.000Z",
//             "endDate": "2025-07-16T00:00:00.000Z",
//             "reason": "Headache",
//             "status": "Pending",
//             "appliedAt": "2025-07-13T15:44:38.261Z",
//             "__v": 0
//         },
//         {
//             "_id": "6873d4b95c0473015c4d556b",
//             "applicantId": {
//                 "_id": "6873ce630069d5c88a1e5d59",
//                 "name": "Shankar",
//                 "rollno": "717823P254"
//             },
//             "classId": "6873cbd40069d5c88a1e5d3b",
//             "startDate": "2025-07-15T00:00:00.000Z",
//             "endDate": "2025-07-15T00:00:00.000Z",
//             "reason": "Pallani Temple Visit",
//             "status": "Pending",
//             "appliedAt": "2025-07-13T15:46:01.869Z",
//             "__v": 0
//         }
//     ]
// }

// */

//=================================================================
// import React, { use, useEffect } from 'react'
// import { useStore } from 'zustand'  

// import { useFormStore } from '../../store/useFormStore';

// function PendingLeaveRequests() {
  
//   const { leaveForms , getFacultyLeaveStatus } = useFormStore();

//   useEffect(() => {
//     getFacultyLeaveStatus();
//   }, [getFacultyLeaveStatus]);
  
//   // console.log("LeaveForms:", leaveForms[0].reason);
// console.log(leaveForms)
//   return (
//     <>
//     {
//       leaveForms.map((leave, index) => (
//         <div key={index} className="bg-white rounded-xl shadow-md p-4 mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">{leave.applicantId.name}</h2>
//           <p className="text-sm text-gray-600">Roll No: {leave.applicantId.rollno}</p>
//           <p className="text-sm text-gray-600">Start Date: {leave.startDate}</p>
//           <p className="text-sm text-gray-600">End Date: {leave.endDate}</p>
//           <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
//         </div>
//       ))
//     }
   
//     <div>PendingLeaveRequests PRaveen</div>
//     </>
//   )
// }

// export default PendingLeaveRequests