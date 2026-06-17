import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Clock, ClipboardCheck, ShieldCheck, Ticket, Menu, X } from "lucide-react";
import { useStaffFormStore } from "../../store/useStaffFormStore";

import PendingLeaveRequests from "./PendingLeaveRequests";
import ReviewedLeaveRequests from "./ReviewedLeaveRequests";
import ApprovedLeaveRequests from "./ApprovedLeaveRequests";
import StaffOutpassRequests from "./StaffOutpassRequests";

const TABS = [
    { title: "Pending", component: <PendingLeaveRequests />, icon: Clock, id: "pending" },
    { title: "Reviewed", component: <ReviewedLeaveRequests />, icon: ClipboardCheck, id: "reviewed" },
    { title: "Approved", component: <ApprovedLeaveRequests />, icon: ShieldCheck, id: "approved" },
    { title: "Outpass", component: <StaffOutpassRequests />, icon: Ticket, id: "outpass" },
];

function StaffDashBoard() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const { pendingLeaves, getFacultypending } = useStaffFormStore();

    useEffect(() => {
        getFacultypending();
        // eslint-disable-next-line
    }, []);

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50/50">
            {/* Mobile Header Bar */}
            <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-[52px] z-20 shadow-sm">
                <span className="text-base font-bold text-gray-800 tracking-wide">Staff Menu</span>
                <button 
                    onClick={() => setIsMobileOpen(!isMobileOpen)} 
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                    {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Backdrop for mobile sidebar */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-30 md:hidden mt-[96px]" 
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar / Left side panel */}
            <aside className={`
                fixed md:sticky md:top-16 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 
                flex flex-col shrink-0 z-40 transition-transform duration-300 ease-in-out mt-[96px] md:mt-0 h-[calc(100vh-4rem)]
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="p-6 border-b border-gray-100 hidden md:block">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 tracking-wide">
                        Staff Dashboard
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Leave & Outpass Approvals</p>
                </div>

                <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                    {TABS.map((tab, idx) => {
                        const Icon = tab.icon;
                        const isActive = activeIdx === idx;
                        const isPendingTab = tab.title === "Pending";
                        const showBadge = isPendingTab && pendingLeaves.length > 0;

                        return (
                            <button
                                key={tab.title}
                                onClick={() => {
                                    setActiveIdx(idx);
                                    setIsMobileOpen(false);
                                }}
                                className={`
                                    w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold 
                                    transition-all duration-200 group cursor-pointer
                                    ${isActive 
                                        ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10" 
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-orange-500" : "text-gray-400"}`} />
                                    <span>{tab.title}</span>
                                </div>
                                
                                {showBadge && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                        {pendingLeaves.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow overflow-x-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIdx}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="h-full"
                    >
                        {TABS[activeIdx].component}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default StaffDashBoard;