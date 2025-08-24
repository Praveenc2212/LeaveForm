import React, { useState } from "react";
import { useEffect } from "react";
import {
  CircleUserRound,
  Loader,
  Calendar,
  Hash,
  MessageSquareQuote
} from "lucide-react";
import useHodFormStore from "../../store/useHodFormStore";
// import { set } from "mongoose";
function HodPendingLeaveRequests() {
  const [processingId, setProcessingId] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);
  const [hodleaves ,setHodleaves] = useState([]);
  const [toggle , setToggle] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [loading , setLoading] = useState(true);
  const [ accepting  , setAccepting ] = useState(false);
  const [ rejecting  , setRejecting ] = useState(false);

  
  const { setHodAccepteTheForm, setHodRejectTheForm, isFetching } = useHodFormStore();
  const { pendingLeaves, getHodpending } = useHodFormStore();
   React.useEffect(() => {
    setLoading(true);
    getHodpending();
    setLoading(false);
  }, [ toggle ]);

  useEffect(()=>{
    setHodleaves(pendingLeaves);
  } )

  
  // Calculate number of days between two dates (inclusive)
  function calculateNumberOfDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  // Format date as dd/mm/yyyy
  function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  const handleAccept = async (id) => {
   
    // Optionally show toast or feedback
  };
  const handleReject = async (id) => {
  
    // Optionally show toast or feedback
  };
   const handleAction = async (id, action) => {
    setProcessingId(id);
    setProcessingAction(action);
    try {
      if (action === 'accept') {
        // await setHodAccepteTheForm(id);
        setAccepting(true);
        await setHodAccepteTheForm(id);
        setAccepting(false);
        setToggle(!toggle);

      } else {
        // await setHodRejectTheForm(id);
            setRejecting(true);
            await setHodRejectTheForm(id);
            setRejecting(false);
            setToggle(!toggle);
      }
      setRemovingId(id);
      // setTimeout(() => {
      //   setHodleaves((leaves) => leaves.filter((leave) => leave._id !== id));
      //   setRemovingId(null);
      // }, 300);
    } catch (err) {
      toast.error(`Failed to ${action} request. Please try again.`);
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
    }
  };


 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-orange-500" size={50} />
      </div>
    );
  }

  if (hodleaves.length === 0 ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700">No Pending Requests</h2>
          <p className="text-gray-500 mt-2">All leave requests have been reviewed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 font-sans">
     
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold mb-8 text-gray-800">Pending Leave Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {hodleaves.map((leave) => {
            const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
            return (
              <div
                key={leave._id}
                className="bg-white rounded-xl shadow-sm flex flex-col transition-all duration-300 border border-gray-200"
              >
                {/* Header */}
                <div className="p-5 flex items-center gap-4 border-b border-gray-100">
                  <CircleUserRound className="w-12 h-12 text-orange-500 flex-shrink-0" />
                  <div className="flex justify-between items-start w-full">
                    <div className="overflow-hidden">
                      <div className="font-bold text-gray-800 text-lg truncate">
                        {leave.applicantId.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {leave.applicantId.rollno}
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-4 min-w-[48px]">
                      <span className="text-sm text-gray-800 font-semibold"> Year :{ leave.classId.year}</span>
                      <span className="text-sm text-gray-800 font-semibold"> Section : {leave.classId.section}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-grow space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-700">From:</span>
                        <span className="ml-1.5">{formatDate(leave.startDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-700">To:</span>
                        <span className="ml-1.5">{formatDate(leave.endDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Hash className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-700">No. of Days:</span>
                      <span className="ml-1.5">{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}</span>
                    </div>
                  </div>
                  <blockquote className="bg-orange-50/70 border-l-4 border-orange-400 p-3 text-gray-800">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquareQuote className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <h3 className="font-bold text-orange-800 text-sm">Reason:</h3>
                    </div>
                    <p className="pl-1 text-sm italic">
                      {leave.reason}
                    </p>
                  </blockquote>
                </div>

                {/* Actions */}
               <div className="p-4 bg-gray-50/50 flex justify-between items-center gap-3 rounded-b-xl mt-auto">
                                   <button
                                   onClick={() => handleAction(leave._id, 'reject')}
                                   disabled={processingId === leave._id}
                                   className="w-full py-2 px-4 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                   >
                                   {(rejecting  && processingId ==   leave._id  )
                                       ? <Loader className="animate-spin" size={20} />
                                       : "Decline"
                                   }
                                   </button>
                                   <button
                                   onClick={() => handleAction(leave._id, 'accept')}
                                   disabled={processingId === leave._id}
                                   className="w-full py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                   >
                                   {(accepting &&  leave._id == processingId )
                                       ? <Loader className="animate-spin" size={20} />
                                       : "Accept"
                                   }
                                   </button>
                               </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ====================================================================================
  //   <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 font-sans">
  //     <Toaster position="top-center" reverseOrder={false} />

  //     <div className="max-w-7xl mx-auto">
  //       <div className="flex justify-between items-center mb-8">
  //           <div className="relative">
  //             <FileText className="w-10 h-10 text-orange-500" />
  //             {localLeaves.length > 0 && (
  //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
  //                 {localLeaves.length}
  //               </span>
  //             )}
  //           </div>
  //         {localLeaves.length > 0 && (
  //           <button
  //               onClick={handleAcceptAll}
  //               disabled={isAcceptingAll}
  //               className="border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors flex items-center justify-center shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
  //           >
  //               {isAcceptingAll ? <Loader className="animate-spin w-5 h-5 mr-2" /> : <ShieldCheck className="w-5 h-5 mr-2" />}
  //               {isAcceptingAll ? 'Processing...' : 'Accept All'}
  //           </button>
  //         )}
  //       </div>

  //       {isFetching && (
  //         <div className="flex items-center justify-center p-10">
  //           <Loader className="animate-spin text-orange-500" size={36} />
  //         </div>
  //       )}

  //       {!isFetching && localLeaves.length === 0 && (
  //           <div className="text-center py-12 px-6 bg-white rounded-xl shadow-sm">
  //               <h2 className="text-2xl font-semibold text-gray-700">No Pending Requests</h2>
  //               <p className="text-gray-500 mt-2">All leave requests have been reviewed.</p>
  //           </div>
  //       )}
        
  //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  //         {localLeaves.map((leave) => {
  //           const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
  //           return (
  //               <div
  //               key={leave._id}
  //               className={`bg-white rounded-xl shadow-sm flex flex-col transition-all duration-300 border border-gray-200
  //                   ${removingId === leave._id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
  //               `}
  //               >
  //               <div className="p-5 flex items-center gap-4 border-b border-gray-100">
  //                   <CircleUserRound className="w-12 h-12 text-orange-500 flex-shrink-0" />
  //                   <div className="overflow-hidden">
  //                   <div className="font-bold text-gray-800 text-lg truncate">
  //                       {leave.applicantId.name}
  //                   </div>
  //                   <div className="text-sm text-gray-500">
  //                       {leave.applicantId.rollno}
  //                   </div>
  //                   </div>
  //               </div>
                
  //               <div className="p-5 flex-grow space-y-4">
  //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //                       <div className="flex items-start gap-2 text-sm">
  //                           <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
  //                           <div>
  //                               <span className="font-bold text-gray-700">From:</span>
  //                               <span className="ml-1.5">{formatDate(leave.startDate)}</span>
  //                           </div>
  //                       </div>
  //                       <div className="flex items-start gap-2 text-sm">
  //                           <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
  //                           <div>
  //                               <span className="font-bold text-gray-700">To:</span>
  //                               <span className="ml-1.5">{formatDate(leave.endDate)}</span>
  //                           </div>
  //                       </div>
  //                   </div>
                    
  //                   <div className="flex items-start gap-2 text-sm">
  //                       <Hash className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"/>
  //                       <div>
  //                           <span className="font-bold text-gray-700">No. of Days:</span>
  //                           <span className="ml-1.5">{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}</span>
  //                       </div>
  //                   </div>

  //                   <blockquote className="bg-orange-50/70 border-l-4 border-orange-400 p-3 text-gray-800">
  //                       <div className="flex items-center gap-2 mb-1">
  //                           <MessageSquareQuote className="w-5 h-5 text-orange-500 flex-shrink-0"/>
  //                           <h3 className="font-bold text-orange-800 text-sm">Reason:</h3>
  //                       </div>
  //                       <p className="pl-1 text-sm italic">
  //                           {leave.reason}
  //                       </p>
  //                   </blockquote>
  //               </div>

  //               <div className="p-4 bg-gray-50/50 flex justify-between items-center gap-3 rounded-b-xl mt-auto">
  //                   <button
  //                   onClick={() => handleAction(leave._id, 'reject')}
  //                   disabled={processingId === leave._id}
  //                   className="w-full py-2 px-4 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
  //                   >
  //                   {(processingId === leave._id && processingAction === "reject")
  //                       ? <Loader className="animate-spin" size={20} />
  //                       : "Decline"
  //                   }
  //                   </button>
  //                   <button
  //                   onClick={() => handleAction(leave._id, 'accept')}
  //                   disabled={processingId === leave._id}
  //                   className="w-full py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white font-semibold flex items-center justify-center transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
  //                   >
  //                   {(processingId === leave._id && processingAction === "accept")
  //                       ? <Loader className="animate-spin" size={20} />
  //                       : "Accept"
  //                   }
  //                   </button>
  //               </div>
  //               </div>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default HodPendingLeaveRequests;
