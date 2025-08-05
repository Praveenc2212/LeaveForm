import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PendingLeaveRequests from "./PendingLeaveRequests";
// import AcceptedFormByStaff from "./AcceptedFormByStaff";
// import ReviewedLeaveRequests from "./ReviewedLeaveRequests";
// import {useNavigate} from 'react-router-dom';
function StaffDashBoard() {
    const cards = [
        { title: "pandding" },
        { title: "Accepect" },
        { title: "OnForm" },
    ];
    const [activeIdx, setActiveIdx] = useState(0); // "My links" is active by default

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
            
                {/* <h1>Hello</h1> */}
        </>
    );
}

export default StaffDashBoard;