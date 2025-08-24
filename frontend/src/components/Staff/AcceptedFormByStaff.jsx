import React, { useEffect } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, ShieldCheck } from 'lucide-react';
import { useStaffFormStore } from '../../store/useStaffFormStore';
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to format dates (consistent with PendingLeaveRequests)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to calculate the number of days (consistent with PendingLeaveRequests)
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

function AcceptedFormByStaff() {
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
    <div className="w-full font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <FileText className="w-10 h-10 text-green-500" />
            {acceptedLeaves.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
              >
                {acceptedLeaves.length}
              </motion.span>
            )}
          </div>
        </div>

        {isFetching && acceptedLeaves.length === 0 && (
          <div className="flex items-center justify-center p-10">
            <Loader className="animate-spin text-green-500" size={36} />
          </div>
        )}

        {!isFetching && acceptedLeaves.length === 0 && (
          <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">No Accepted Requests</h2>
            <p className="text-gray-500 mt-2">There are currently no accepted leave requests to display.</p>
          </div>
        )}
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {acceptedLeaves.map((leave) => {
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
                  <div className="p-4 sm:p-5 flex items-center gap-4 border-b border-gray-100">
                    <CircleUserRound className="w-12 h-12 text-green-500 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <div className="font-bold text-gray-800 text-lg truncate">
                        {leave.applicantId.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {leave.applicantId.rollno}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5 flex-grow space-y-2 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-4">
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

                    <blockquote className="bg-green-50/70 border-l-4 border-green-400 p-3 text-gray-800">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquareQuote className="w-5 h-5 text-green-500 flex-shrink-0"/>
                        <h3 className="font-bold text-green-800 text-sm">Reason:</h3>
                      </div>
                      <p className="pl-1 text-sm italic">
                        {leave.reason}
                      </p>
                    </blockquote>
                  </div>

                  <div className="p-3 sm:p-4 bg-gray-50/50 flex justify-end items-center gap-3 rounded-b-xl mt-auto">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <ShieldCheck size={20} />
                      <span>Approved</span>
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

export default AcceptedFormByStaff;