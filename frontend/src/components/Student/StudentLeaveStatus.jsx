import React, { useEffect, useRef } from "react";
import { useFormStore } from "../../store/useFormStore.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, FileDown, Clock, User, MessageSquare, CheckCircle, XCircle, Hourglass, Timer, SquareArrowDown } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.jsx";
import { generateLeaveForm } from "../../utils/Leaveform/generateLeaveForm";

// Placeholder for download component
const LeaveFormDownload = React.forwardRef((props, ref) => {
  const handleDownload = () => {
    generateLeaveForm(props.leaveData);
  };

  React.useImperativeHandle(ref, () => ({
    handleDownload,
  }));

  return <div style={{ display: "none" }}></div>;
});

// New, improved Status Card Component
function LeaveStatusCard({ leaveData, userData }) {
  const downloadRef = useRef();
  const navigate = useNavigate();

  const { reason, startDate, endDate, status, appliedAt } = leaveData;
  const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };


  const getStatusInfo = (status) => {
    switch (status) {
      case "Pending":
        return { icon: <Hourglass />, color: "bg-yellow-100 text-yellow-800", text: "Pending" };
      case "Reviewed":
        return { icon: <CheckCircle />, color: "bg-blue-100 text-blue-800", text: "Reviewed" };
      case "Approved":
        return { icon: <CheckCircle />, color: "bg-green-100 text-green-800", text: "Approved" };
      case "Tutor Rejected":
        return { icon: <XCircle />, color: "bg-red-100 text-red-800", text: "Tutor Rejected" };
      case "HOD Rejected":
        return { icon: <XCircle />, color: "bg-red-100 text-red-800", text: "HOD Rejected" };
      default:
        return { icon: <Hourglass />, color: "bg-gray-100 text-gray-800", text: "Unknown" };
    }
  };

  const statusInfo = getStatusInfo(status);

  // Timeline Steps
  const timelineSteps = [
    { name: "Applied", completed: true, rejected: false },
    {
      name: "Staff Review",
      completed: ["Reviewed", "Tutor Rejected", "HOD Rejected", "Approved"].includes(status),
      rejected: status === "Tutor Rejected"
    },
    {
      name: "Final Status",
      completed: ["HOD Rejected", "Approved"].includes(status),
      rejected: status === "HOD Rejected"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-lg">
      {/* Card Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Leave Status</h2>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
        >
          {React.cloneElement(statusInfo.icon, { className: "w-5 h-5" })}
          <span>{statusInfo.text}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Timeline */}
        <div className="mb-6">
          <div className="flex items-center">
            {timelineSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.completed ? "border-indigo-500" : "border-gray-300"
                      } ${step.rejected
                        ? "bg-red-100 text-red-600 border-red-400"
                        : step.completed
                          ? "bg-indigo-100 text-indigo-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {step.rejected ? (
                      <XCircle className="w-6 h-6" />
                    ) : (
                      <CheckCircle className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 font-semibold ${step.completed ? "text-gray-700" : "text-gray-500"
                      }`}
                  >
                    {step.name}
                  </p>
                </div>
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${(index === 0 && timelineSteps[1].completed) ||
                      (index === 1 && timelineSteps[2].completed)
                      ? "bg-indigo-500"
                      : "bg-gray-300"
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Leave Details Grid */}
        {/* Leave Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border">
          {/* Student (left) and Applied Date (right) */}
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            <div> 
              <p className="text-sm text-gray-500">Student Name</p>
              <p className="font-semibold text-gray-800">
                {userData.name} <span className="font-normal text-gray-600">({userData.rollno})</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SquareArrowDown className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Applied On</p>
              <p className="font-semibold text-gray-800 text-sm">{formatDateTime(appliedAt)}</p>
            </div>
          </div>

          {/* Leave Dates
          <div className="flex items-center gap-3 md:col-span-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Leave Dates</p>
              <p className="font-semibold text-gray-800">
                {formatDate(startDate)} to {formatDate(endDate)}
              </p>
            </div>
          </div> */}

          {/* Leave Dates (left) and Duration (right) */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Leave Dates</p>
              <p className="font-semibold text-gray-800 text-sm">
                {formatDate(startDate)} to {formatDate(endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-gray-800">
                {days} day{days > 1 ? "s" : ""}
              </p>
            </div>
          </div>


          {/* Reason */}
          <div className="flex items-start gap-3 md:col-span-2">
            <MessageSquare className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Reason</p>
              <p className="font-semibold text-gray-800">{reason}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        {status === "Approved" && (
          <button
            onClick={() => downloadRef.current?.handleDownload()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <FileDown className="w-5 h-5" />
            Download Permit
          </button>
        )}
      </div>
      <LeaveFormDownload ref={downloadRef} leaveData={leaveData} userData={userData} />
    </div>
  );
}

// Main Page Component
function StudentLeaveStatus() {
  const { leaveStatus, getStudentLeaveStatus } = useFormStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    getStudentLeaveStatus();
  }, [getStudentLeaveStatus]);

  const currentLeaveData = leaveStatus;

  return (
    <div className="sm:mt-10 py-10 px-4 flex items-center justify-center">
      {currentLeaveData ? (
        <LeaveStatusCard leaveData={currentLeaveData} userData={userData} />
      ) : (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">No Recent Leave Data</h3>
          <p className="text-gray-500 mt-2">You haven't applied for any leaves recently.</p>
        </div>
      )}
    </div>
  );
}

export default StudentLeaveStatus;
