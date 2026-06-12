import React from 'react';
import { FaDownload } from 'react-icons/fa';

function StudentLeaveCard({ Reason, StartDate, EndDate }) {
  // Download handler
  const handleDownload = () => {
    const content = `Leave Reason: ${Reason}\nStart Date: ${StartDate}\nEnd Date: ${EndDate}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${Reason.replace(/\s+/g, '_')}_Leave.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200 flex 
        justify-between items-center hover:shadow-lg transition-all duration-300">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{Reason}</h2>
        <p className="text-sm text-gray-600">From: {StartDate}</p>
        <p className="text-sm text-gray-600">To: {EndDate}</p>
      </div> 
      <button
        onClick={handleDownload}
        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition cursor-pointer"
        title="Download"
      >
        <FaDownload size={20} />
      </button>
    </div>
  );
}

export default StudentLeaveCard;
