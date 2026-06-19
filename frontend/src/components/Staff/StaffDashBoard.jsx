import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  ClipboardCheck,
  ShieldCheck,
  Ticket,
  Menu,
  X,
  LayoutDashboard,
  User,
  DoorOpen,
  Plus,
  ArrowRight,
  MapPin,
  Phone,
  MessageSquareQuote,
  CircleUserRound,
  Trash2
} from "lucide-react";
import { useStaffFormStore } from "../../store/useStaffFormStore";
import { useAuthStore } from "../../store/useAuthStore";
import { toast, Toaster } from "react-hot-toast";

import PendingLeaveRequests from "./PendingLeaveRequests";
import ReviewedLeaveRequests from "./ReviewedLeaveRequests";
import ApprovedLeaveRequests from "./ApprovedLeaveRequests";
import StaffProfile from "./StaffProfile";
import StaffOutpassRequestPopup from "./StaffOutpassRequestPopup";

function StaffDashBoard() {
  const [activeMainTab, setActiveMainTab] = useState("dashboard"); // "dashboard" or "profile"
  const [activeSubTab, setActiveSubTab] = useState("pending"); // "pending", "reviewed", "approved", "my-outpasses"
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOutpassPopupOpen, setIsOutpassPopupOpen] = useState(false);
  const [isSubmittingOutpass, setIsSubmittingOutpass] = useState(false);

  const { userData } = useAuthStore();
  const { pendingLeaves, getFacultypending } = useStaffFormStore();
  const [myOutpasses, setMyOutpasses] = useState([]);

  // Load outpasses for the logged-in staff member
  useEffect(() => {
    getFacultypending();
  }, [getFacultypending]);

  useEffect(() => {
    if (userData?.email) {
      const key = "all_staff_outpasses";
      const stored = localStorage.getItem(key);
      if (stored) {
        const allOps = JSON.parse(stored);
        setMyOutpasses(allOps.filter(op => op.staffEmail === userData.email));
      } else {
        // Populate default mock data if empty
        const mock = [
          {
            id: "stf-op-381",
            place: "Karpagam Academy Admin Office",
            startDate: new Date(Date.now() - 3600000 * 24).toISOString().slice(0, 16),
            endDate: new Date(Date.now() - 3600000 * 20).toISOString().slice(0, 16),
            mobile: "9442158903",
            reason: "Deliver finalized semester assessment papers to exam division.",
            status: "Approved",
            appliedAt: new Date(Date.now() - 3600000 * 25).toISOString(),
            staffName: userData.name,
            staffEmail: userData.email,
            staffDepartment: userData.department
          },
          {
            id: "stf-op-942",
            place: "Town Hall Central Bank",
            startDate: new Date(Date.now() + 3600000 * 4).toISOString().slice(0, 16),
            endDate: new Date(Date.now() + 3600000 * 7).toISOString().slice(0, 16),
            mobile: "9442158903",
            reason: "Withdraw institution scholarship funds for departmental distribution.",
            status: "Pending",
            appliedAt: new Date().toISOString(),
            staffName: userData.name,
            staffEmail: userData.email,
            staffDepartment: userData.department
          }
        ];
        localStorage.setItem(key, JSON.stringify(mock));
        setMyOutpasses(mock.filter(op => op.staffEmail === userData.email));
      }
    }
  }, [userData]);

  const handleCreateOutpass = (data) => {
    setIsSubmittingOutpass(true);
    setTimeout(() => {
      const newOutpass = {
        id: `stf-op-${Math.floor(100000 + Math.random() * 900000)}`,
        place: data.place,
        startDate: data.startDate,
        endDate: data.endDate,
        mobile: data.mobile,
        reason: data.reason,
        status: "Pending",
        appliedAt: new Date().toISOString(),
        staffName: userData?.name || "Anonymous Staff",
        staffEmail: userData?.email || "anonymous",
        staffDepartment: userData?.department || "CSE"
      };

      const key = "all_staff_outpasses";
      const stored = localStorage.getItem(key);
      const allOps = stored ? JSON.parse(stored) : [];
      const updated = [newOutpass, ...allOps];
      localStorage.setItem(key, JSON.stringify(updated));
      setMyOutpasses(updated.filter(op => op.staffEmail === userData?.email));

      setIsSubmittingOutpass(false);
      setIsOutpassPopupOpen(false);
      toast.success("Outpass requested successfully! Sent to HOD for approval.");
      setActiveSubTab("my-outpasses"); // Switch to my-outpasses tab to show the ticket
    }, 800);
  };

  const handleDeleteOutpass = (id) => {
    const key = "all_staff_outpasses";
    const stored = localStorage.getItem(key);
    const allOps = stored ? JSON.parse(stored) : [];
    const updated = allOps.filter(op => op.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    setMyOutpasses(updated.filter(op => op.staffEmail === userData?.email));
    toast.success("Outpass request removed");
  };

  const calculateDuration = (start, end) => {
    const diff = new Date(end) - new Date(start);
    if (isNaN(diff) || diff < 0) return "0 hrs";
    const hrs = Math.round(diff / (1000 * 60 * 60));
    if (hrs >= 24) {
      const days = Math.floor(hrs / 24);
      const remHrs = hrs % 24;
      return `${days} day${days > 1 ? "s" : ""}${remHrs > 0 ? ` ${remHrs} hr${remHrs > 1 ? "s" : ""}` : ""}`;
    }
    return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  };

  const formatDateTimeDisplay = (dtStr) => {
    if (!dtStr) return "N/A";
    const date = new Date(dtStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    }) + " @ " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Setup sub-tabs under Dashboard
  const SUB_TABS = [
    { title: "Pending Leaves", component: <PendingLeaveRequests />, icon: Clock, id: "pending" },
    { title: "Reviewed Leaves", component: <ReviewedLeaveRequests />, icon: ClipboardCheck, id: "reviewed" },
    { title: "Approved Leaves", component: <ApprovedLeaveRequests />, icon: ShieldCheck, id: "approved" },
    { title: "My Outpasses", component: null, icon: DoorOpen, id: "my-outpasses" }, // Custom rendered below
  ];

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50/50">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-[52px] z-20 shadow-sm">
        <span className="text-base font-bold text-gray-800 tracking-wide">
          {activeMainTab === "dashboard" ? "Dashboard Menu" : "Profile"}
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
            Staff Portal
          </h2>
          <p className="text-xs text-gray-400 mt-1">Leave & Outpass System</p>
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
              <StaffProfile />
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
              {/* Dashboard Content Container */}
              <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-2 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 tracking-tight leading-tight">Dashboard</h1>
                  {/* <p className="text-xs text-gray-500 font-medium mt-0.5">Manage student permissions and request outpasses</p> */}
                </div>

                {/* Staff Outpass Request Button */}
                <button
                  onClick={() => setIsOutpassPopupOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md shadow-orange-500/20 active:scale-95 hover:cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Request Staff Outpass
                </button>
              </div>

              {/* Sub Navigation Bar for Dashboard Sections */}
              <div className="flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8 pt-1 pb-4 border-b border-gray-200 bg-white">
                {SUB_TABS.map((subTab) => {
                  const Icon = subTab.icon;
                  const isActive = activeSubTab === subTab.id;
                  const isPendingTab = subTab.id === "pending";
                  const isMyOutpassTab = subTab.id === "my-outpasses";
                  const showBadge = isPendingTab && pendingLeaves.length > 0;
                  const count = isMyOutpassTab ? myOutpasses.length : 0;

                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setActiveSubTab(subTab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider
                        transition-all duration-200 cursor-pointer border
                        ${isActive
                          ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/20"
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800"}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{subTab.title}</span>
                      {showBadge && (
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white text-orange-600" : "bg-red-500 text-white"}`}>
                          {pendingLeaves.length}
                        </span>
                      )}
                      {isMyOutpassTab && count > 0 && (
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Render Selected Sub Tab */}
              <div className="flex-grow">
                {activeSubTab === "my-outpasses" ? (
                  <div className="p-4 sm:p-6 lg:p-8">
                    {myOutpasses.length === 0 ? (
                      <div className="text-center py-16 px-6 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm flex flex-col items-center max-w-2xl mx-auto mt-4">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                          <DoorOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-700">No Outpass Requests</h2>
                        <p className="text-slate-500 mt-1 max-w-sm text-sm">
                          You haven't requested any gate passes. Click the "Request Staff Outpass" button at the top to apply for one.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {myOutpasses.map((outpass) => (
                          <div key={outpass.id} className="relative bg-white rounded-2xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                            {/* Decorative Accent Strip */}
                            <div className="h-2.5 w-full bg-gradient-to-r from-orange-500 to-amber-500" />

                            {/* Card Header (Details & Status Badge) */}
                            <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-4 border-b border-slate-100/80">
                              <div className="flex items-center gap-3">
                                <div className="relative flex-shrink-0">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-100 to-orange-200 flex items-center justify-center border-2 border-white shadow-md">
                                    <CircleUserRound className="w-8 h-8 text-orange-600" />
                                  </div>
                                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                    F
                                  </span>
                                </div>
                                <div className="overflow-hidden">
                                  <h3 className="font-bold text-slate-800 text-sm leading-tight truncate">
                                    {userData?.name}
                                  </h3>
                                  <p className="text-xs font-semibold text-slate-400 tracking-wider mt-0.5">{userData?.department} Dept</p>
                                </div>
                              </div>

                              {outpass.status === "Approved" ? (
                                <div className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  GATE-READY
                                </div>
                              ) : (
                                <div className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  PENDING HOD
                                </div>
                              )}
                            </div>

                            {/* Details Grid */}
                            <div className="px-5 pt-1.5 pb-3 grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                                <div className="flex items-center gap-1.5 text-slate-700">
                                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                  <span className="text-sm font-semibold truncate" title={outpass.place}>{outpass.place}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
                                <div className="flex items-center gap-1.5 text-slate-700">
                                  <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                  <span className="text-sm font-semibold">{calculateDuration(outpass.startDate, outpass.endDate)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Date Stub */}
                            <div className="px-5 py-3 bg-slate-50 border-y border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Exit Time</span>
                                <span className="font-bold text-slate-700">{formatDateTimeDisplay(outpass.startDate)}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-300" />
                              <div className="flex flex-col text-right">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Return Time</span>
                                <span className="font-bold text-slate-700">{formatDateTimeDisplay(outpass.endDate)}</span>
                              </div>
                            </div>

                            {/* Contact and Delete */}
                            <div className="px-5 py-3 flex justify-between items-center gap-4 text-xs border-b border-slate-100/50">
                              <div className="flex items-center gap-1 text-slate-500">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <span>Mobile: <strong className="text-slate-700 font-semibold">{outpass.mobile}</strong></span>
                              </div>
                              <button
                                onClick={() => handleDeleteOutpass(outpass.id)}
                                className="flex items-center gap-1 text-red-500 hover:text-red-700 font-bold transition cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>

                            {/* Reason Statement */}
                            <div className="px-5 pb-5 pt-3">
                              <blockquote className="bg-slate-50 border-l-3 border-orange-500 p-2.5 rounded-r-lg">
                                <div className="flex items-center mb-1">
                                  <MessageSquareQuote className="w-3.5 h-3.5 text-orange-500/70 mr-1" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reason Statement</span>
                                </div>
                                <p className="text-xs italic text-slate-600 pl-4 leading-relaxed font-medium line-clamp-2" title={outpass.reason}>
                                  "{outpass.reason}"
                                </p>
                              </blockquote>
                            </div>

                            {/* Punch Holes */}
                            <div className="relative py-1 flex items-center justify-center bg-white">
                              <div className="border-t-2 border-dashed border-slate-200/80 w-full" />
                              <div className="absolute -left-2.5 w-5 h-5 rounded-full bg-slate-50 border border-slate-200/60 shadow-[inset_-3px_0_4px_rgba(0,0,0,0.01)]" />
                              <div className="absolute -right-2.5 w-5 h-5 rounded-full bg-slate-50 border border-slate-200/60 shadow-[inset_3px_0_4px_rgba(0,0,0,0.01)]" />
                            </div>

                            {/* QR Barcode Section */}
                            <div className="px-5 pb-5 pt-3 bg-white flex-grow flex flex-col justify-end">
                              {outpass.status === "Approved" ? (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 border border-emerald-100 py-2 rounded-lg">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>OUTPASS ISSUED</span>
                                  </div>
                                  <div className="flex flex-col items-center justify-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 w-full">
                                    <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">PASS ID</span>
                                    <span className="text-[10px] font-mono tracking-[0.2em] text-gray-700 font-bold mt-1 uppercase">{outpass.id}</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-[11px] text-center text-slate-400 font-bold bg-amber-50/50 py-3 rounded-lg border border-dashed border-amber-200">
                                  ⚠️ HOD Permission Pending
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  SUB_TABS.find(tab => tab.id === activeSubTab)?.component
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Staff Outpass Request Modal */}
      <StaffOutpassRequestPopup
        isOpen={isOutpassPopupOpen}
        onClose={() => setIsOutpassPopupOpen(false)}
        onSubmit={handleCreateOutpass}
        isLoading={isSubmittingOutpass}
      />
    </div>
  );
}

export default StaffDashBoard;