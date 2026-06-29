import React, { useState } from 'react';
import { useAuthStore } from "../../store/useAuthStore";
import { Activity, LayoutDashboard, User } from "lucide-react";
import MonitoringTab from "../Security/MonitoringTab";
import TodaysHistoryTab from "../Security/TodaysHistoryTab";
import StaffProfile from "../Staff/StaffProfile";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

const PrincipalDashBoard = () => {
  const { userData } = useAuthStore();
  const [activeTab, setActiveTab] = useState("dashboard");

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm flex-shrink-0 relative z-10 md:min-h-[calc(100vh-4rem)]">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 tracking-wide">
            Principal Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">Management & Oversight</p>
        </div>
        
        <nav className="p-4 space-y-2 flex-grow">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard" ? "bg-orange-50 text-orange-600 shadow-sm" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === "dashboard" ? "text-orange-500" : "text-slate-400"}`} />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab("monitoring")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "monitoring" ? "bg-orange-50 text-orange-600 shadow-sm" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Activity className={`w-5 h-5 ${activeTab === "monitoring" ? "text-orange-500" : "text-slate-400"}`} />
            Live Monitoring
          </button>
          
          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "history" ? "bg-orange-50 text-orange-600 shadow-sm" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Clock className={`w-5 h-5 ${activeTab === "history" ? "text-orange-500" : "text-slate-400"}`} />
            Today's History
          </button>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "profile" ? "bg-orange-50 text-orange-600 shadow-sm" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === "profile" ? "text-orange-500" : "text-slate-400"}`} />
            Profile
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-x-hidden p-6">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" variants={contentVariants} initial="hidden" animate="visible" exit="hidden">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  Welcome, Principal {userData?.name}
                </h1>
                <p className="text-slate-600">
                  Select <b>Live Monitoring</b> from the sidebar to view active campus outpasses.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "monitoring" && (
            <motion.div key="monitoring" variants={contentVariants} initial="hidden" animate="visible" exit="hidden" className="h-full">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  Campus-Wide Monitoring
                </h2>
                <p className="text-xs text-slate-500 mt-1">Viewing all staff and student active check-outs</p>
              </div>
              <MonitoringTab filterType="both" />
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div key="history" variants={contentVariants} initial="hidden" animate="visible" exit="hidden" className="h-full">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  Today's Campus Movement History
                </h2>
                <p className="text-xs text-slate-500 mt-1">Viewing all outpasses used today</p>
              </div>
              <TodaysHistoryTab />
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div key="profile" variants={contentVariants} initial="hidden" animate="visible" exit="hidden">
              <StaffProfile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PrincipalDashBoard;
