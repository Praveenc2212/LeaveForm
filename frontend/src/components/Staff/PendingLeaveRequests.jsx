import React, { useEffect, useState } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useStaffFormStore } from '../../store/useStaffFormStore';
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './common/Modal'; // Assuming you have created Modal.js in the same directory

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to calculate the number of days, inclusive
const calculateNumberOfDays = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return 0;
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);
  const timeDiff = end.getTime() - start.getTime();
  if (isNaN(timeDiff) || timeDiff < 0) return 0;
  const dayDiff = timeDiff / (1000 * 3600 * 24);
  return dayDiff + 1;
};

function PendingLeaveRequests() {
  // State to manage the visibility of the confirmation modal
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

  // This function is called when the user confirms the action in the modal
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
                  onClick={() => setConfirmModalOpen(true)} // Changed to open the modal
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
                return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      key={leave._id}
                      className="bg-white rounded-xl shadow-sm flex flex-col border border-gray-200"
                    >
                      <div className="p-5 flex items-center gap-4 border-b border-gray-100">
                          <CircleUserRound className="w-12 h-12 text-orange-500 flex-shrink-0" />
                          <div className="overflow-hidden">
                            <div className="font-bold text-gray-800 text-lg truncate">
                                {leave.applicantId.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {leave.applicantId.rollno}
                            </div>
                          </div>
                      </div>
                      
                      <div className="p-5 pt-0 flex-grow sm:space-y-4 space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-start gap-2 text-sm">
                                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
                                  <div>
                                      <span className="font-bold text-gray-700">From:</span>
                                      <span className="ml-1.5">{formatDate(leave.startDate)}</span>
                                  </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
                                  <div>
                                      <span className="font-bold text-gray-700">To:</span>
                                      <span className="ml-1.5">{formatDate(leave.endDate)}</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="flex items-start gap-2 text-sm">
                              <Hash className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
                              <div>
                                  <span className="font-bold text-gray-700">No. of Days:</span>
                                  <span className="ml-1.5">{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}</span>
                              </div>
                          </div>

                          <blockquote className="bg-orange-50/70 border-l-4 border-orange-400 p-3 mt-3 text-gray-800">
                              <div className="flex items-center gap-2 mb-1">
                                  <MessageSquareQuote className="w-5 h-5 text-orange-500 flex-shrink-0"/>
                                  <h3 className="font-bold text-orange-800 text-sm">Reason:</h3>
                              </div>
                              <p className="pl-1 text-sm italic">
                                  {leave.reason}
                              </p>
                          </blockquote>
                      </div>

                      <div className="p-4 pt-0 bg-gray-50/50 flex justify-between items-center gap-3 rounded-b-xl mt-auto">
                          <button
                            onClick={() => handleLeaveAction(leave._id, 'reject')}
                            disabled={processingId === leave._id}
                            className="w-full py-2 px-4 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {(processingId === leave._id && processingAction === "reject")
                                ? <Loader className="animate-spin" size={20} />
                                : "Decline"
                            }
                          </button>
                          <button
                            onClick={() => handleLeaveAction(leave._id, 'accept')}
                            disabled={processingId === leave._id}
                            className="w-full py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {(processingId === leave._id && processingAction === "accept")
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

      {/* Confirmation Modal */}
      <Modal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Action"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <AlertTriangle className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mt-4">Accept All Requests?</h4>
          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to accept all {pendingLeaves.length} pending leave requests? This action cannot be undone.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={() => setConfirmModalOpen(false)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleConfirmAcceptAll}
            className="px-4 py-2 bg-green-600 border border-transparent rounded-lg text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Confirm & Accept All
          </button>
        </div>
      </Modal>
    </>
  );
}

export default PendingLeaveRequests;