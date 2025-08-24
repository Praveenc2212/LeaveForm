// import React from 'react'

// function AcceptedFormByHod() {
//   return (
//      <div>
//       <div className="flex items-center gap-3 m-4">
//         <div className="relative">
//           <FileText className="w-10 h-10 text-green-500" />
//           <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//             {acceptedLeaves.length}
//           </span>
//         </div>
//         <h1 className="text-xl font-bold text-gray-800">Accepted Leave Requests</h1>
//       </div>

//       <div className="grid grid-cols-1 m-4 md:grid-cols-2 gap-4">
//         {acceptedLeaves.map((leave) => (
//           <div key={leave._id} className="bg-orange-100 p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold">{leave.applicantId.name}</h2>
//             <p className="text-gray-600">Leave Type: {leave.leaveType}</p>
//             <p className="text-gray-600">From: {new Date(leave.fromDate).toLocaleDateString()}</p>
//             <p className="text-gray-600">To: {new Date(leave.toDate).toLocaleDateString()}</p>
//             <p className="text-gray-600">Reason: {leave.reason}</p>
//           </div>
//         ))}
//       </div>
//       {acceptedLeaves.length === 0 && (
//         <p className="text-gray-500">No accepted leave requests found.</p>
//       )}
//     </div>
//   )
// }

// export default AcceptedFormByHod
import React, { useEffect } from 'react'
// import useStaffFormStore from '../../store/useStaffFormStore';
import { FileText } from 'lucide-react'; // Add icon import
import { Loader } from "lucide-react";
import useHodFormStore from '../../store/useHodFormStore';
function AcceptedFormByHod() { //getApprovedLeaveForms
  const { approvedLeaveForms , getApprovedLeaveForms , isFetching } = useHodFormStore();
  useEffect(() => {
    getApprovedLeaveForms();
  }, [getApprovedLeaveForms]);
  console.log("Approved Leaves:", approvedLeaveForms ); 
  
  const acceptedLeaves = approvedLeaveForms || [];
  //
    console.log("Approved Leavesss:", acceptedLeaves   ) ;
  if(acceptedLeaves.length === 0 ){
    return (
       <div className="flex items-center justify-center min-h-screen">
                    <Loader className="animate-spin text-gray-700" size={50} />
       </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-3 m-4">
        <div className="relative">
          <FileText className="w-10 h-10 text-green-500" />
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {acceptedLeaves.length}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">Accepted Leave Requests</h1>
      </div>

      <div className="grid grid-cols-1 m-4 md:grid-cols-2 gap-4">
        {acceptedLeaves.map((leave) => (
          <div key={leave._id} className="bg-orange-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{leave.applicantId.name}</h2>
            {/* <p className="text-gray-600">Leave Type: {leav    e.leaveType}</p> */}
            <p className="text-gray-600">From: {new Date(leave.startDate).toLocaleDateString()}</p>
            <p className="text-gray-600">To: {new Date(leave.endDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Reason: {leave.reason}</p>
          </div>
        ))}
      </div>
      {acceptedLeaves.length === 0 && (
        <p className="text-gray-500">No accepted leave requests found.</p>
      )}
    </div>
  )
}

export default AcceptedFormByHod