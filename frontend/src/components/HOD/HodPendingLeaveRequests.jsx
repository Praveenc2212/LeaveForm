import React, { useEffect, useState, useMemo } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, ShieldCheck, Users } from 'lucide-react';
import { useHodFormStore } from '../../store/useHodFormStore';
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import AcceptAllPopUp from '../Staff/common/AcceptAllPopUp'; // Using the reusable popup

// --- Helper Functions ---
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

const calculateNumberOfDays = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return 0;
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  const timeDiff = end.getTime() - start.getTime();
  if (isNaN(timeDiff) || timeDiff < 0) return 0;
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDiff + 1;
};

// --- Main Component ---
function HodPendingLeaveRequests() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const {
    pendingLeaves,
    isFetching,
    processingId,
    processingAction,
    isAcceptingAll,
    getPendingLeaves,
    handleLeaveAction,
    acceptAllLeaves,
  } = useHodFormStore();

  useEffect(() => {
    getPendingLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupedLeaves = useMemo(() => {
    if (!pendingLeaves) return {};
    return pendingLeaves.reduce((acc, leave) => {
      // Corrected the typo from "SectionSection" to "Section"
      const classKey = `${leave.classId.year} Year - ${leave.classId.section} Section`;
      if (!acc[classKey]) {
        acc[classKey] = [];
      }
      acc[classKey].push(leave);
      return acc;
    }, {});
  }, [pendingLeaves]);

  const sortedGroupKeys = useMemo(() => Object.keys(groupedLeaves).sort(), [groupedLeaves]);

  const handleConfirmAcceptAll = () => {
    acceptAllLeaves();
    setConfirmModalOpen(false);
  };

  // --- Render Logic ---
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 px-2 py-4 sm:px-4 font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative">
              <FileText className="w-10 h-10 text-orange-500" />
              {pendingLeaves.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
                >
                  {pendingLeaves.length}
                </motion.span>
              )}
            </div>
            {pendingLeaves.length > 0 && (
              <button
                onClick={() => setConfirmModalOpen(true)}
                disabled={isAcceptingAll}
                className="border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors flex items-center justify-center shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAcceptingAll ? <Loader className="animate-spin w-5 h-5 mr-2" /> : <ShieldCheck className="w-5 h-5 mr-2" />}
                {isAcceptingAll ? 'Processing...' : 'Accept All'}
              </button>
            )}
          </div>

          {/* Loading State */}
          {isFetching && pendingLeaves.length === 0 && (
            <div className="flex items-center justify-center p-10">
              <Loader className="animate-spin text-orange-500" size={36} />
              <span className="ml-4 text-gray-600">Fetching pending requests...</span>
            </div>
          )}

          {/* Empty State */}
          {!isFetching && pendingLeaves.length === 0 && (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md border">
                <FileText className="mx-auto w-16 h-16 text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-700 mt-4">All Clear!</h2>
                <p className="text-gray-500 mt-2">There are no pending leave requests from any class.</p>
            </div>
          )}

          {/* Grouped Leave Requests */}
          <AnimatePresence>
            {sortedGroupKeys.map((groupKey) => (
              <motion.section
                key={groupKey}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-10"
              >
                <div className="flex justify-between items-center gap-3 mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-orange-600" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">{groupKey}</h2>
                  </div>
                  <div className="text-center flex-shrink-0">
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                      {groupedLeaves[groupKey].length} <span className="hidden sm:inline">Pending</span>
                    </span>
                  </div>
                </div>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {groupedLeaves[groupKey].map((leave) => {
                    const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
                    const isBeingProcessed = processingId === leave._id;
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        key={leave._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-200"
                      >
                        <div className="p-5 flex items-center gap-4 border-b border-gray-100">
                          <CircleUserRound className="w-12 h-12 text-orange-500 flex-shrink-0" />
                          <div className="overflow-hidden">
                            <p className="font-bold text-gray-800 text-lg truncate" title={leave.applicantId.name}>{leave.applicantId.name}</p>
                            <p className="text-sm text-gray-500">{leave.applicantId.rollno}</p>
                          </div>
                        </div>
                        <div className="p-5 pt-3 flex-grow space-y-3">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
                                <div>
                                    <span className="font-semibold text-gray-700">From:</span>
                                    <span className="block text-gray-600">{formatDate(leave.startDate)}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
                                <div>
                                    <span className="font-semibold text-gray-700">To:</span>
                                    <span className="block text-gray-600">{formatDate(leave.endDate)}</span>
                                </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <Hash className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
                            <div>
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="ml-1.5 text-gray-600">{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}</span>
                            </div>
                          </div>
                          <blockquote className="bg-orange-50/80 border-l-4 border-orange-400 p-3 mt-2 text-gray-800 rounded-r-md">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquareQuote className="w-5 h-5 text-orange-500 flex-shrink-0"/>
                              <h3 className="font-semibold text-orange-800 text-sm">Reason for Leave</h3>
                            </div>
                            <p className="pl-1 text-sm italic leading-relaxed">{leave.reason}</p>
                          </blockquote>
                        </div>
                        <div className="p-4 bg-gray-50/70 flex justify-between items-center gap-3 rounded-b-xl">
                          <button onClick={() => handleLeaveAction(leave._id, 'reject')} disabled={isBeingProcessed} className="w-full py-2 px-4 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                            {isBeingProcessed && processingAction === "reject" ? <Loader className="animate-spin" size={20} /> : "Decline"}
                          </button>
                          <button onClick={() => handleLeaveAction(leave._id, 'accept')} disabled={isBeingProcessed} className="w-full py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                            {isBeingProcessed && processingAction === "accept" ? <Loader className="animate-spin" size={20} /> : "Accept"}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Reusable Confirmation Modal */}
      <AcceptAllPopUp
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmAcceptAll}
        count={pendingLeaves.length}
        title="Confirm HOD Action"
      />
    </>
  );
}

export default HodPendingLeaveRequests;