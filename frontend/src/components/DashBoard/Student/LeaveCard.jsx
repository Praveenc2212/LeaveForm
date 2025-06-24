
import React from 'react';
import {useNavigate} from 'react-router-dom';
import ProgressCard from './ProgressCard';
import RecentLeaveCard from './RecentLeaveCard';
import LeaveForm from './LeaveForm';

function LeaveCard({ Reason, StartDate, EndDate }) {
  const navigate = useNavigate();
  const handleLeaveForm = ()=>{
    navigate('/leaveform');
  }

import ProgressCard from './ProgressCard';
import RecentLeaveCard from './RecentLeaveCard';
import { useNavigate } from 'react-router-dom';
function LeaveCard({ Reason, StartDate, EndDate }) {
const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto p-6 
                    bg-white/20 
                    backdrop-blur-md 
                    border border-black/30 
                    rounded-2xl 
                    shadow-xl 
                    transition-all duration-300">
      {/* Header / Action */}
      <div className="flex justify-between items-center mb-6 " >
        <h1 className="text-2xl font-bold text-white drop-shadow">Your Leave Status</h1>

        <button onClick={handleLeaveForm}  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow">

        <button 
          
          onClick={() => navigate("/leaveform")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow">

          New Leave Form
        </button>
      </div>

      {/* Progress Card */}
      <div className="mb-6">
        <ProgressCard 
          applied={true}
          staffAccepted={true}
          hodAccepted={true}
          leaveData={{
            name: "John Doe",
            rollNumber: "12345",
            department: "Computer Science",
            reason: "Family function",
            startDate: "2023-06-15",
            endDate: "2023-06-18"
          }}
        />
      </div>

      {/* Recent Leave Card */}
      <div>
        <RecentLeaveCard Reason={Reason} StartDate={StartDate} EndDate={EndDate} />
      </div>
    </div>
  );
}

export default LeaveCard;
