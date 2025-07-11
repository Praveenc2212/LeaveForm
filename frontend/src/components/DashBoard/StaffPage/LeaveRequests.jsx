// LeaveRequests.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './../Header';
// Add this import for the avatar icon
import { CircleUserRound } from 'lucide-react';

function LeaveRequests() {
  const navigate = useNavigate();
  const location = useLocation();
  const leaveRequests = location.state?.leaveRequests || [];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="fixed inset-0 -z-10"
        
        aria-hidden="true"
      />
      {/* Fallback solid color for browsers without filter support */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-100 to-blue-100 opacity-80"></div>


      <button
        onClick={() => navigate('/staff')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-6 mt-4 ml-4"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col gap-8 items-center px-2">
        {leaveRequests.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No pending leave requests.</p>
        ) : (
          leaveRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow-md
                         px-4 py-8 min-h-[140px] flex flex-col items-center
                         sm:flex-row sm:items-center sm:justify-between
                         mx-auto w-full max-w-md sm:max-w-2xl
                         sm:py-6 sm:min-h-0"
            >
              {/* Profile, Name, Roll */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center flex-1 min-w-0 w-full">
                {/* Replace image with avatar icon */}
                <CircleUserRound className="w-16 h-16 text-orange-400 mb-2 sm:mb-0 sm:mr-4" />
                <div className="flex flex-col items-center sm:items-start min-w-0">
                  <div className="font-bold text-gray-900 text-xl truncate">{req.studentName}</div>
                  <div className="text-xs text-gray-500 truncate">{req.rollNumber || "717823p254"}</div>
                </div>
              </div>
              {/* Center: Date Applied */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 mt-2 sm:mt-0 sm:mx-27">
                <div className="text-xs font-bold text-gray-500 mb-1 text-center">Date Applied</div>
                <div className="text-gray-800 text-base font-semibold text-center">{req.startDate}</div>
              </div>
              {/* Right: Actions */}
              <div className="flex flex-row gap-6 mt-4 sm:mt-0 flex-shrink-0">
                
                <button
                  onClick={() => handleReject(req.id)}
                  className="flex flex-col items-center group"
                  title="Reject"
                >
                  <svg className="w-6 h-6 text-red-500 group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xs text-red-500 mt-1">REJECT</span>
                </button>
                <button
                  onClick={() => handleView(req)}
                  className="flex flex-col items-center group"
                  title="View"
                >
                  <svg className="w-6 h-6 text-blue-500 group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-xs text-blue-500 mt-1">VIEW</span>
                </button>
                <button
                  onClick={() => handleAccept(req.id)}
                  className="flex flex-col items-center group"
                  title="Accept"
                >
                  <svg className="w-6 h-6 text-green-500 group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-green-500 mt-1">ACCEPT</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for viewing request details */}
      {modalOpen && selectedReq && (
        <>
          {/* Blurred background image for modal */}
          <div
            className="fixed inset-0 z-40"
            style={{

              
              filter: 'blur(04px) brightness(1.5)',
            }}
            aria-hidden="true"
          />
          {/* Fallback solid color for browsers without filter support */}
          <div className="fixed inset-0 z-40 bg-gradient-to-br from-orange-100 to-blue-100 opacity-80"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md p-4 sm:p-6 relative flex flex-col items-center">
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              {/* Replace image with avatar icon */}
              <CircleUserRound className="w-20 h-20 text-orange-400 " />
              {/* Name */}
              <div className="font-bold text-xl text-gray-900 mb-1">{selectedReq.studentName}</div>
              {/* Roll Number */}
              <div className="text-xs text-gray-500 mb-3">{selectedReq.rollNumber || "717823p254"}</div>
              {/* Reason */}
              <div className="w-full mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-1">Reason</div>
                <div className="bg-gray-100 rounded p-3 text-gray-800 text-sm break-words min-h-[60px]">
                  {selectedReq.reason || "No reason provided."}
                </div>
              </div>
              {/* Accept/Reject Buttons */}
              <div className="flex w-full gap-4 mt-2">
                <button
                  onClick={() => handleAccept(selectedReq.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(selectedReq.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LeaveRequests;