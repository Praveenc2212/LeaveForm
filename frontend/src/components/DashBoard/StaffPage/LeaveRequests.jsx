import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircleUserRound, House } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore'
function LeaveRequests() {
  const navigate = useNavigate();
  // const location = useLocation();
  const {leaveForms , userData} = useAuthStore();
  // const { leaves } = props.leaves;
  console.log("LeaveForms:", leaveForms);
  const leaveRequests = leaveForms || [];

  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedReq, setSelectedReq] = useState(null);

  const handleAccept = (id) => {
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
      <div className="grid gap-4 max-w-md mx-auto">
        {leaveRequests.map((leave) => (
          <div key={leave.applicantId} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <CircleUserRound className="w-10 h-10 text-orange-400" />
              <div>
                <div className="font-semibold text-gray-800">{leave.applicantId.name}</div>
                <div className="text-sm text-gray-500">{userData.rollno }</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>Date:</strong> {leave.startDate}</p>
              {/* <p><strong>Place:</strong> {req.place || 'Salem'}</p> */}
              {/* <p><strong>Days:</strong> {req.days || '4'}</p> */}
              <p><strong>Reason:</strong> {leave.reason}</p>
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleReject(leave.applicantId)}
                className="w-1/2 mr-2 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
              >
                Decline
              </button>
              <button
                onClick={() => handleAccept(leave.applicantId)}
                className="w-1/2 ml-2 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* {modalOpen && selectedReq && (
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
              <h2 className="text-lg font-bold text-gray-800">{selectedReq.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{selectedReq.rollNumber || '717823p254'}</p>
              <div className="w-full text-sm text-gray-700 mb-4">
                <p><strong>Date:</strong> {selectedReq.date || '5.9.2025'}</p>
                <p><strong>Place:</strong> {selectedReq.place || 'Salem'}</p>
                <p><strong>Days:</strong> {selectedReq.days || '4'}</p>
                <p className="mt-2"><strong>Reason:</strong> {selectedReq.reason || 'No reason provided.'}</p>
              </div>
              <div className="flex w-full gap-4">
                <button
                  onClick={() => handleReject(selectedReq.id)}
                  className="w-1/2 py-2 border border-red-500 text-red-500 rounded hover:bg-red-400 hover:text-white"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAccept(selectedReq.id)}
                  className="w-1/2 py-2 border border-green-500 text-green-500 rounded hover:bg-green-400 hover:text-white"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default LeaveRequests;