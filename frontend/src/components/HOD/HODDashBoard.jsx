import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, User, Menu, X, Ticket, Activity } from "lucide-react";
import HodPendingLeaveRequests from "./HodPendingLeaveRequests";
import HodApprovedLeaveRequests from "./HodApprovedLeaveRequests";
import HodStaffOutpassRequests from "./HodStaffOutpassRequests";
import Profile from "./Profile";
import TodaysHistoryTab from "../Security/TodaysHistoryTab";
import MonitoringTab from "../Security/MonitoringTab";
import { useAuthStore } from "../../store/useAuthStore";
import { Clock } from "lucide-react";
const TABS = [
    { title: "Pending", component: <HodPendingLeaveRequests /> },
    { title: "Approved", component: <HodApprovedLeaveRequests /> },
];

function HODDashboard() {
    const { userData } = useAuthStore();
    const [activeIdx, setActiveIdx] = useState(0);
    const [activeMainTab, setActiveMainTab] = useState("dashboard"); // "dashboard", "profile", or "staff-outpasses"
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50/50">
            {/* Mobile Header Bar */}
            <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-[52px] z-20 shadow-sm w-full">
                <span className="text-base font-bold text-gray-800 tracking-wide">
                    {activeMainTab === "dashboard" 
                        ? "HOD Dashboard" 
                        : activeMainTab === "staff-outpasses" 
                        ? "Staff Outpasses" 
                        : activeMainTab === "monitoring"
                        ? "Monitoring"
                        : activeMainTab === "history"
                        ? "History"
                        : "Profile"}
                </span>
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
                        HOD Portal
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Leave & Gate Pass System</p>
                </div>

                <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                    {/* Main Dashboard tab */}
                    <button
                        onClick={() => {
                            setActiveMainTab("dashboard");
                            setIsMobileOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold 
                            transition-all duration-200 group cursor-pointer
                            ${activeMainTab === "dashboard" 
                                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                    >
                        <LayoutDashboard className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${activeMainTab === "dashboard" ? "text-orange-500" : "text-gray-400"}`} />
                        <span>Dashboard</span>
                    </button>

                    {/* Main Staff Outpasses tab */}
                    <button
                        onClick={() => {
                            setActiveMainTab("staff-outpasses");
                            setIsMobileOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold 
                            transition-all duration-200 group cursor-pointer
                            ${activeMainTab === "staff-outpasses" 
                                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                    >
                        <Ticket className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${activeMainTab === "staff-outpasses" ? "text-orange-500" : "text-gray-400"}`} />
                        <span>Staff Outpasses</span>
                    </button>

                    <button
                        onClick={() => {
                            setActiveMainTab("monitoring");
                            setIsMobileOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold 
                            transition-all duration-200 group cursor-pointer
                            ${activeMainTab === "monitoring" 
                                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                    >
                        <Activity className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${activeMainTab === "monitoring" ? "text-orange-500" : "text-gray-400"}`} />
                        <span>Live Monitoring</span>
                    </button>

                    {/* Today's History Tab */}
                    <button
                        onClick={() => {
                            setActiveMainTab("history");
                            setIsMobileOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold 
                            transition-all duration-200 group cursor-pointer
                            ${activeMainTab === "history" 
                                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                    >
                        <Clock className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${activeMainTab === "history" ? "text-orange-500" : "text-gray-400"}`} />
                        <span>Today's History</span>
                    </button>

                    {/* Main Profile tab */}
                    <button
                        onClick={() => {
                            setActiveMainTab("profile");
                            setIsMobileOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold 
                            transition-all duration-200 group cursor-pointer
                            ${activeMainTab === "profile" 
                                ? "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                        `}
                    >
                        <User className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${activeMainTab === "profile" ? "text-orange-500" : "text-gray-400"}`} />
                        <span>Profile</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow overflow-x-hidden">
                <AnimatePresence mode="wait">
                    {activeMainTab === "profile" ? (
                        <motion.div
                            key="profile"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full"
                        >
                            <Profile />
                        </motion.div>
                    ) : activeMainTab === "staff-outpasses" ? (
                        <motion.div
                            key="staff-outpasses"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full"
                        >
                            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                                <HodStaffOutpassRequests />
                            </div>
                        </motion.div>
                    ) : activeMainTab === "monitoring" ? (
                        <motion.div
                            key="monitoring"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full"
                        >
                            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
                                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-indigo-500" />
                                        Department Monitoring
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1">Viewing all staff and student active check-outs in {userData?.department} department</p>
                                </div>
                                <MonitoringTab filterDepartment={userData?.department} filterType="both" />
                            </div>
                        </motion.div>
                    ) : activeMainTab === "history" ? (
                        <motion.div
                            key="history"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full"
                        >
                            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
                                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-indigo-500" />
                                        Today's History
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1">Viewing all outpasses used today in {userData?.department} department</p>
                                </div>
                                <TodaysHistoryTab filterDepartment={userData?.department} />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full flex flex-col"
                        >
                            {/* Tabs view at the top */}
                            <div className="sticky top-16 md:top-0 sm:pt-3 z-10 bg-white/80 backdrop-blur-lg">
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
                            
                            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                                {TABS[activeIdx].component}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default HODDashboard;