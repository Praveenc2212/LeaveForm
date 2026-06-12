import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

import PendingLeaveRequests from "./PendingLeaveRequests";
import ReviewedLeaveRequests from "./ReviewedLeaveRequests";
import ApprovedLeaveRequests from "./ApprovedLeaveRequests";

const TABS = [
    { title: "Pending", component: <PendingLeaveRequests /> },
    { title: "Reviewed", component: <ReviewedLeaveRequests /> },
    { title: "Approved", component: <ApprovedLeaveRequests /> },
];

function StaffDashBoard() {
    const [activeIdx, setActiveIdx] = useState(0);

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    return (
        <div>
            <div className="sticky top-16 sm:pt-3 z-10 bg-white/80 backdrop-blur-lg">
                <div className="">
                    <div className="flex border-b border-gray-200">
                        {TABS.map((tab, idx) => (
                            <button
                                type="button"
                                key={tab.title}
                                onClick={() => setActiveIdx(idx)}
                                className={`
                                    flex-1 text-base sm:text-lg font-medium text-center py-4 transition-colors duration-200
                                    relative hover:bg-gray-50 cursor-pointer
                                    ${activeIdx === idx ? "text-orange-500" : "text-gray-500"}
                                    ${idx !== 0 ? "border-l border-gray-200" : ""}
                                `}
                            >
                                {tab.title}
                                {activeIdx === idx && (
                                    <span className="absolute left-0 right-0 bottom-[-1px] h-1 w-full bg-orange-500"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIdx}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {TABS[activeIdx].component}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default StaffDashBoard;