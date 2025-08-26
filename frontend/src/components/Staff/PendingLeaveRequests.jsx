import React, { useEffect, useState } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, ShieldCheck } from 'lucide-react';
import { useStaffFormStore } from '../../store/useStaffFormStore';
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import AcceptAllPopUp from './common/AcceptAllPopUp';

// Helper function to format dates - updated to be more consistent
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

// Helper function to calculate the number of days, inclusive
const calculateNumberOfDays = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return 0;
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  const timeDiff = end.getTime() - start.getTime();
  if (isNaN(timeDiff) || timeDiff < 0) return 0;
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDiff + 1;
};

function PendingLeaveRequests() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const {
    pendingLeaves,
    isFetching,
    processingId,
    processingAction,
    isAcceptingAll,
    getFacultypending,
    handleLeaveAction,
    acceptAllLeaves,
  } = useStaffFormStore();

  useEffect(() => {
    getFacultypending();
    // eslint-disable-next-line
  }, []);

  const handleConfirmAcceptAll = () => {
    acceptAllLeaves();
    setConfirmModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 font-sans">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="max-w-7xl mx-auto">
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

          {isFetching && pendingLeaves.length === 0 && (
            <div className="flex items-center justify-center p-10">
              <Loader className="animate-spin text-orange-500" size={36} />
            </div>
          )}

          {!isFetching && pendingLeaves.length === 0 && (
              <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-700">No Pending Requests</h2>
                  <p className="text-gray-500 mt-2">All leave requests have been reviewed.</p>
              </div>
          )}
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {pendingLeaves.map((leave) => {
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
                      <div className="p-5 pb-4 flex items-center gap-4 border-b border-gray-100">
                          <CircleUserRound className="w-12 h-12 text-orange-500 flex-shrink-0" />
                          <div className="overflow-hidden">
                            <p className="font-bold text-gray-800 text-lg truncate" title={leave.applicantId.name}>{leave.applicantId.name}</p>
                            <p className="text-sm text-gray-500">{leave.applicantId.rollno}</p>
                          </div>
                      </div>
                      
                      <div className="p-5 pb-3 pt-3 flex-grow space-y-3">
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

                        <blockquote className="bg-orange-50/80 border-l-4 border-orange-400 p-2 mt-2 text-gray-800 rounded-r-md">
                          <div className="flex items-center mb-0.5">
                            <MessageSquareQuote className="size-5 mt-1 mr-1 text-orange-600/60" />
                            <h3 className="font-semibold text-orange-600/70 text-[13px]">Reason for Leave</h3>
                          </div>
                          <p className="pl-6 text-[15px] italic leading-relaxed text-gray-600">{leave.reason}</p>
                        </blockquote>
                      </div>

                      <div className="p-4 bg-gray-50/70 flex justify-between items-center gap-3 border-t-1 border-gray-300/50 rounded-b-xl">
                          <button
                            onClick={() => handleLeaveAction(leave._id, 'reject')}
                            disabled={isBeingProcessed}
                            className="w-full py-2 px-4 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {isBeingProcessed && processingAction === "reject"
                                ? <Loader className="animate-spin" size={20} />
                                : "Decline"
                            }
                          </button>
                          <button
                            onClick={() => handleLeaveAction(leave._id, 'accept')}
                            disabled={isBeingProcessed}
                            className="w-full py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {isBeingProcessed && processingAction === "accept"
                                ? <Loader className="animate-spin" size={20} />
                                : "Accept"
                            }
                          </button>
                      </div>
                    </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AcceptAllPopUp
        isOpen={isConfirmModalOpen} 
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmAcceptAll}
        count={pendingLeaves.length}
        title="Confirm Staff Action"
      />
    </>
  );
}

export default PendingLeaveRequests;