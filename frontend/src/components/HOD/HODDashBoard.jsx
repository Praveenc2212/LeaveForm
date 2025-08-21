// import React from 'react'

// const HODDashBoard = () => {
//   return (
//     <div>HODDashBoard</div>
//   )
// }

// export default HODDashBoard






import React ,{useState} from "react";
import { Outlet } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import HodPendingLeaveRequests from "./HodPendingLeaveRequests";
import AcceptedFormByHod from "./AcceptedFormByHod";
function HODDashboard() {

  const navigate = useNavigate();
  // const leaveRequests = [
  //     { id: 1, studentName: 'Praveen M', days: 3, startDate: '2025-06-20', endDate: '2025-06-22', pic: PraveenM },
  //     { id: 2, studentName: 'Praveen C', days: 2, startDate: '2025-06-25', endDate: '2025-06-26', pic: PraveenC },
  //     { id: 3, studentName: 'Praveen R', days: 1, startDate: '2025-06-30', endDate: '2025-07-01', pic: PraveenR },
  //   ];
  // Glassmorphism-style box class
 const glassBox = `w-full max-w-[200px] aspect-square 
  bg-white/10 border border-white/30 backdrop-blur-lg 
  rounded-2xl shadow-[0_6px_12px_#fcd9b0] 
  transition duration-300 transform hover:scale-105 
  hover:shadow-[0_10px_20px_#fcd9b0] 
  flex items-center justify-center`;
  const [activeIdx, setActiveIdx] = useState(0);
     const cards = [
        { title: "pandding" },
        { title: "OnForm" },
    ];
  return (
    <>
            <div className="w-full flex justify-center mt-4">
                <div className="flex w-full border-b border-gray-200">
                    {cards.map((card, idx) => (
                        <button
                            type="button"
                            key={card.title}
                            onClick={() => setActiveIdx(idx)}
                            className={`flex-1 text-lg font-medium text-center py-4 transition
                            ${activeIdx === idx ? "text-orange-300" : "text-gray-500"}
                            relative hover:bg-gray-100 cursor-pointer  
                            ${idx !== 0 ? "border-l-2 border-gray-300" : ""}
                            `}>
                            {card.title}
                            {activeIdx === idx && (
                                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-2/3 bg-orange-400 rounded  "></span>
                            )}
                        </button>
                    ))}
                    
                </div>

            </div>
            <Outlet />
            <div>
                {activeIdx === 0 && <HodPendingLeaveRequests />}
                {activeIdx === 1 && <AcceptedFormByHod />}
                 {/* {activeIdx === 2 && <ReviewedLeaveRequests />}  */}
            </div>
                {/* <h1>Hello</h1> */}
        </>
  );
}

export default HODDashboard;