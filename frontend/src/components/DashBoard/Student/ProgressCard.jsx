import React from 'react';
import { FaDownload } from 'react-icons/fa';

function ProgressCard({ applied, staffAccepted, hodAccepted }) {
  const isCompleted = hodAccepted;

  return (
    <div className="shadow-md rounded-2xl p-4 mb-4  bg-white/20 
                    backdrop-blur-md 
                    border border-white/30 
                    ">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Leave Progress</h2>

      <div className="flex items-center space-x-4">
        {/* Applied */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${applied ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1">Applied</span>
        </div>

        {/* Line */}
        <div className={`flex-1 h-1 ${staffAccepted ? 'bg-green-500' : 'bg-gray-300'}`}></div>

        {/* Staff Accepted */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${staffAccepted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1 text-center">Staff Accepted</span>
        </div>

        {/* Line */}
        <div className={`flex-1 h-1 ${hodAccepted ? 'bg-green-500' : 'bg-gray-300'}`}></div>

        {/* HOD Accepted */}
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${hodAccepted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs mt-1 text-center">HOD Accepted</span>
        </div>

        {/* Download Icon */}
        {isCompleted && (
          <button
            title="Download"
            className="ml-4 text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
          >
            <FaDownload size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProgressCard;
