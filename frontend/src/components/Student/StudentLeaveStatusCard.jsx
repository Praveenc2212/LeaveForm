// ProgressCard.jsx
import React, { use, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import LeaveFormDownload from './LeaveFormDownload.jsx';
import { useAuthStore } from '../../store/useAuthStore.jsx';
function ProgressCard({  status, startDate , endDate, reason }) {
  
  const downloadRef = useRef();

  const { leaveForms   } = useAuthStore();

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current(); // triggers PDF download
    }
  };

  return (
    <div className="shadow-md rounded-2xl p-4 mb-4 bg-white/20 backdrop-blur-md border border-white/30">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Leave Progress</h2>

      <div className="flex items-center space-x-4">
        {/* Applied */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${status ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1">Applied</span>
        </div>

        {/* Line */}
        <div className={`flex-1 h-1 ${true ? 'bg-green-500' : 'bg-gray-300'}`}></div>

        {/* Staff Accepted */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${true ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1 text-center">Staff Accepted</span>
        </div>

        {/* Line */}
        <div className={`flex-1 h-1 ${true ? 'bg-green-500' : 'bg-gray-300'}`}></div>

        {/* HOD Accepted */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${false ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1 text-center">HOD Accepted</span>
        </div>

        {/* Download Button */}
        {false && (
          <button
            title="Download"
            onClick={handleDownload}
            className="ml-4 text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
          >
            <FaDownload size={20} />
          </button>
        )}
      </div>

      {/* Hidden LeaveFormDownload component (used for generating the PDF) */}
      <LeaveFormDownload
        name="Praveen"
        rollNumber="CSE123"
        department="CSE"
        reason="Personal emergency"
        startDate="2025-06-21"
        endDate="2025-06-23"
        ref={downloadRef}
      />
    </div>
  );
}

export default ProgressCard;
