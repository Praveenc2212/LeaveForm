import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressCard from './ProgressCard';
import RecentLeaveCard from './RecentLeaveCard';

function LeaveCard({ Reason, StartDate, EndDate }) {
  const navigate = useNavigate();

  const goToNewLeaveForm = () => {
    navigate('/new-leave-form');
  };

  const goToHistory = () => {
    navigate('/history');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 
                    bg-white/20 
                    backdrop-blur-md 
                    border border-black/30 
                    rounded-2xl 
                    shadow-xl 
                    transition-all duration-300">
      
      {/* Header / Action */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-y-2">
        <h1 className="text-2xl font-extrabold text-white drop-shadow-md tracking-wide">
          Your Leave Status
        </h1>


        <div className="flex gap-3">
          <button
            onClick={goToHistory}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow"
          >
            History
          </button>
          <button
            onClick={goToNewLeaveForm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow"
          >
            New Leave Form
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="mb-6">
        <ProgressCard applied={true} staffAccepted={true} hodAccepted={true} />
      </div>

      {/* Recent Leave Card */}
      <div>
        <RecentLeaveCard Reason={Reason} StartDate={StartDate} EndDate={EndDate} />
      </div>
    </div>
  );
}

export default LeaveCard;
