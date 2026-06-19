import React, { useState } from 'react';

const mockData = [
  { id: 1, reason: 'Medical', start: '10/04/2025', end: '12/04/2025', status: 'accepted' },
  { id: 2, reason: 'Family Function', start: '01/05/2025', end: '03/05/2025', status: 'rejected' },
  { id: 3, reason: 'Exam Preparation', start: '15/03/2025', end: '18/03/2025', status: 'accepted' },
];

function History() {
  const [activeTab, setActiveTab] = useState('accepted');

  const filteredData = mockData.filter((leave) => leave.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-blue-300 p-6 font-sans">
      <h1 className="text-3xl font-bold text-black mb-6">Leave History</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('accepted')}
          className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === 'accepted'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600 hover:bg-blue-100'
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === 'rejected'
              ? 'bg-red-600 text-white'
              : 'bg-white text-red-600 hover:bg-red-100'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Leave Cards */}
      <div className="grid gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((leave) => (
            <div
              key={leave.id}
              className="bg-white/80 border border-white/50 backdrop-blur-md p-4 rounded-xl shadow-md text-black"
            >
              <h3 className="text-xl font-bold">{leave.reason}</h3>
              <p className="text-sm">Start: {leave.start}</p>
              <p className="text-sm">End: {leave.end}</p>
              <p
                className={`text-xs mt-2 font-medium uppercase ${
                  leave.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {leave.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black">No {activeTab} leaves to show.</p>
        )}
      </div>
    </div>
  );
}

export default History;
