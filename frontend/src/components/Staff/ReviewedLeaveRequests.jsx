import React, { useEffect } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, Clock } from 'lucide-react';
import { useStaffFormStore } from '../../store/useStaffFormStore';
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to format dates
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

function ReviewedLeaveRequests() {
  const {
    acceptedLeaves,
    isFetching,
    getFacultyAcceptedForms,
  } = useStaffFormStore();

  useEffect(() => {
    getFacultyAcceptedForms();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            {/* Icon color changed to yellow */}
            <FileText className="w-10 h-10 text-yellow-500" />
            {acceptedLeaves.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                // Notification badge color changed to yellow
                className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
              >
                {acceptedLeaves.length}
              </motion.span>
            )}
          </div>
        </div>

        {isFetching && acceptedLeaves.length === 0 && (
          <div className="flex items-center justify-center p-10">
            <Loader className="animate-spin text-yellow-500" size={36} />
          </div>
        )}

        {!isFetching && acceptedLeaves.length === 0 && (
          <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">No Reviewed Requests</h2>
            <p className="text-gray-500 mt-2">There are currently no leave requests awaiting HOD approval.</p>
          </div>
        )}
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {acceptedLeaves.map((leave) => {
              const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
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
                    {/* Icon color changed to yellow */}
                    <CircleUserRound className="w-12 h-12 text-yellow-500 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-800 text-lg truncate" title={leave.applicantId.name}>
                        {leave.applicantId.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {leave.applicantId.rollno}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-3 pb-2 flex-grow space-y-3">
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

                    <blockquote className="bg-yellow-50/80 border-l-4 border-yellow-400 p-3 mt-5 text-gray-800 rounded-r-md">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquareQuote className="w-5 h-5 text-yellow-500 flex-shrink-0"/>
                        <h3 className="font-semibold text-yellow-800 text-sm">Reason for Leave</h3>
                      </div>
                      <p className="pl-1 text-sm italic leading-relaxed">
                        {leave.reason}
                      </p>
                    </blockquote>
                  </div>

                  <div className="p-4 pt-3 mt-0 bg-gray-50/70 flex justify-end items-center gap-3 rounded-b-xl">
                    {/* Status updated to be more descriptive */}
                    <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                      <Clock size={20} />
                      <span>Awaiting</span>
                    </div>
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

export default ReviewedLeaveRequests;