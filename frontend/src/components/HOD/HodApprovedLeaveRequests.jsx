import React, { useEffect } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, CheckCircle, Download, UserCheck } from 'lucide-react';
import { useHodFormStore } from '../../store/useHodFormStore';
import { useAuthStore } from '../../store/useAuthStore'; // Corrected import
import { Toaster, toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { generateLeaveForm } from '../../utils/Leaveform/generateLeaveForm';

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
function HodApprovedLeaveRequests() {
  // Correctly destructuring from useHodFormStore
  const {
    approvedLeaves,
    isFetching,
    getApprovedLeaves,
  } = useHodFormStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    // Calling the correct action from the store
    getApprovedLeaves();
    // eslint-disable-next-line
  }, []);
  
  const handleDownload = (leave) => {
    toast.success(`Generating PDF for ${leave.applicantId.name}...`);
    try {
      generateLeaveForm(leave); // Call the PDF generation function
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Could not generate PDF. See console for details.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Approved Leave Requests</h1>
            <p className="text-gray-500 mt-1">Review all leave requests that you have approved.</p>
        </header>

        {/* Using correct state for loading check */}
        {isFetching && approvedLeaves.length === 0 && (
          <div className="flex items-center justify-center p-10">
            <Loader className="animate-spin text-blue-500" size={36} />
            <span className="ml-4 text-gray-600">Loading Approved Requests...</span>
          </div>
        )}

        {/* Using correct state for empty check */}
        {!isFetching && approvedLeaves.length === 0 && (
          <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No Approved Requests</h2>
            <p className="text-gray-500 mt-2">There are currently no leave requests that have been approved by you.</p>
          </div>
        )}
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {/* Mapping over the correct state variable */}
            {approvedLeaves.map((leave) => {
              const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
              const tutorNames = leave.classId?.tutorIds?.map(t => t.name).join(', ') || 'N/A';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={leave._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-200"
                >
                  <div className="p-5 pb-3 flex items-center gap-4 border-b border-gray-100">
                    <CircleUserRound className="w-12 h-12 text-blue-500 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-800 text-lg truncate" title={leave.applicantId.name}>
                        {leave.applicantId.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {leave.applicantId.rollno}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-4 flex-grow space-y-3">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
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

                    <blockquote className="bg-blue-50/80 border-l-4 border-blue-400 p-3 mt-3 text-gray-800 rounded-r-md">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquareQuote className="w-5 h-5 text-blue-500 flex-shrink-0"/>
                        <h3 className="font-semibold text-blue-800 text-sm">Reason for Leave</h3>
                      </div>
                      <p className="pl-1 text-sm italic leading-relaxed">
                        {leave.reason}
                      </p>
                    </blockquote>

                    <div className="border-t border-gray-200 pt-3 mt-3">
                        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-gray-500"/>
                            Approved By
                        </h3>
                        <div className="space-y-1.5 text-sm pl-2">
                            <div className=" ">
                                <span className="font-medium text-gray-600">Tutor : </span>
                                <span className="text-gray-800"> {tutorNames}</span>
                            </div>
                            <div className="">
                                <span className="font-medium text-gray-600">HOD : </span>
                                <span className="text-gray-800"> {userData?.name}</span>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="p-4 mt-[-10px] bg-gray-50/70 flex justify-between items-center gap-3 rounded-b-xl border-t border-gray-100">
                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                      <CheckCircle size={18} />
                      <span>Approved</span>
                    </div>
                    <button
                      onClick={() => handleDownload(leave)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center shadow-sm text-sm font-medium cursor-pointer"
                    >
                      <Download size={16} className="mr-2" />
                      Download Proof
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default HodApprovedLeaveRequests;