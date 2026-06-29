import React, { useState } from 'react';
import { CircleUserRound, FileText, Loader, Calendar, MessageSquareQuote, Hash, ShieldCheck, Ticket, MapPin, Phone, Search, Landmark, Clock, ArrowRight } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import MonitoringTab from "../Security/MonitoringTab";
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' @ ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper function to calculate duration in hours
const calculateHours = (startDateString, endDateString) => {
  if (!startDateString || !endDateString) return 0;
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  const diffMs = end - start;
  if (isNaN(diffMs) || diffMs < 0) return 0;
  const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
  return diffHrs;
};

// Helper function to format roll numbers to college guidelines
const formatRollNumber = (rollno) => {
  if (!rollno) return '';
  if (/^\d{2}P\d{3}$/.test(rollno)) {
    return rollno;
  }
  const match = rollno.match(/^(\d{2})([A-Za-z]+)(\d{3})$/);
  if (match) {
    const num = match[3];
    const newNum = num.startsWith("0") ? "1" + num.substring(1) : num;
    return `23P${newNum}`;
  }
  return rollno;
};



const INITIAL_MOCK_OUTPASSES = [
  {
    _id: "outpass-1",
    applicantId: { name: "Praveen C", rollno: "23P118", studentType: "Hosteller" },
    hostelBlock: "A-Block",
    roomNumber: "204",
    place: "Coimbatore Junction",
    studentMobile: "9876543210",
    parentMobile: "9012345678",
    reason: "Going to native town to attend emergency family event.",
    startDate: "2026-06-18T10:00:00.000Z",
    endDate: "2026-06-18T18:00:00.000Z",
    status: "Pending"
  },
  {
    _id: "outpass-2",
    applicantId: { name: "Harini S", rollno: "23P102", studentType: "Hosteller" },
    hostelBlock: "C-Block",
    roomNumber: "112",
    place: "VGM Hospital Clinic",
    studentMobile: "9445678901",
    parentMobile: "9843210987",
    reason: "Prior appointment with dental surgeon for root canal.",
    startDate: "2026-06-19T09:00:00.000Z",
    endDate: "2026-06-19T13:00:00.000Z",
    status: "Pending"
  },
  {
    _id: "outpass-3",
    applicantId: { name: "Praveen Kumar R", rollno: "23P105", studentType: "Hosteller" },
    hostelBlock: "B-Block",
    roomNumber: "405",
    place: "Nehru Stadium Market",
    studentMobile: "8765432109",
    parentMobile: "7654321098",
    reason: "Purchase lab hardware accessories and sensors for major project.",
    startDate: "2026-06-17T14:00:00.000Z",
    endDate: "2026-06-17T17:00:00.000Z",
    status: "Approved"
  }
];

function StaffOutpassRequests() {
  const [outpasses, setOutpasses] = useState(INITIAL_MOCK_OUTPASSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState("requests");

  const handleApprove = (id, name) => {
    setProcessingId(id);
    setTimeout(() => {
      setOutpasses(prev =>
        prev.map(op => op._id === id ? { ...op, status: "Approved" } : op)
      );
      setProcessingId(null);
      toast.success(`Outpass for ${name} has been authorized!`);
    }, 700);
  };

  const filteredOutpasses = outpasses.filter(op =>
    op.applicantId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    op.applicantId.rollno.toLowerCase().includes(searchQuery.toLowerCase()) ||
    op.place.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = filteredOutpasses.filter(op => op.status === "Pending").length;

  return (
    <div className="min-h-screen w-full bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative bg-orange-100 p-2 rounded-xl text-orange-600 flex-shrink-0">
              <Ticket className="w-5 h-5" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">
                  {pendingCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">Gate Pass Hub</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Verify, authenticate, and authorize hosteller outpasses</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === "requests" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Requests
            </button>
            <button
              onClick={() => setActiveTab("monitoring")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === "monitoring" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Monitoring
            </button>
          </div>

          {/* Premium Search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search student or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-slate-50 hover:bg-slate-100/50 focus:bg-white shadow-inner transition-all duration-200 text-xs placeholder:text-slate-400 font-semibold text-slate-700"
            />
          </div>
        </div>

        {activeTab === "monitoring" ? (
          <MonitoringTab filterType="student" />
        ) : (
          <>
        {/* Empty State */}
        {filteredOutpasses.length === 0 && (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-700">No Match Found</h2>
            <p className="text-slate-500 mt-1 max-w-sm">No student gate pass matches your query. Try searching with other parameters.</p>
          </div>
        )}

        {/* Tickets Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredOutpasses.map((outpass) => {
              const durationHrs = calculateHours(outpass.startDate, outpass.endDate);
              const isBeingProcessed = processingId === outpass._id;
              const isApproved = outpass.status === "Approved";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={outpass._id}
                  className="relative bg-white rounded-2xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Decorative Gradient Accent Strip */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${
                    isApproved ? 'from-emerald-400 to-teal-500' : 'from-orange-500 to-amber-500'
                  }`} />

                  {/* Card Header (Student Details & Status Badge) */}
                  <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-4 border-b border-slate-100/80">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center border-2 border-white shadow-md">
                          <CircleUserRound className="w-8 h-8 text-slate-500" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                          H
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-orange-500 transition-colors truncate">
                          {outpass.applicantId.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 tracking-wider mt-0.5">{formatRollNumber(outpass.applicantId.rollno)}</p>
                      </div>
                    </div>

                    <div className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 flex-shrink-0 ${
                      isApproved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isApproved ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      {outpass.status === "Approved" ? "AUTHORIZED" : "PENDING"}
                    </div>
                  </div>

                  {/* Trip Details Grid */}
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
                        <span className="text-sm font-semibold">{durationHrs} Hours</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Date Stub */}
                  <div className="px-5 py-3 bg-slate-50 border-y border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Exit Time</span>
                      <span className="font-bold text-slate-700">{formatDate(outpass.startDate)}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Return Time</span>
                      <span className="font-bold text-slate-700">{formatDate(outpass.endDate)}</span>
                    </div>
                  </div>

                  {/* Contacts block */}
                  <div className="px-5 py-3 flex justify-between gap-4 text-xs">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Student: <strong className="text-slate-700 font-semibold">{outpass.studentMobile}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Parent: <strong className="text-slate-700 font-semibold">{outpass.parentMobile}</strong></span>
                    </div>
                  </div>

                  {/* Reason quote */}
                  <div className="px-5 pb-5 pt-1">
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

                  {/* DOTTED TICKET SEPARATOR WITH PUNCH-HOLES */}
                  <div className="relative py-2 flex items-center justify-center bg-white">
                    {/* Dashed line */}
                    <div className="border-t-2 border-dashed border-slate-200/80 w-full" />
                    {/* Left punch-out */}
                    <div className="absolute -left-2.5 w-5 h-5 rounded-full bg-slate-50 border border-slate-200/60 shadow-[inset_-3px_0_4px_rgba(0,0,0,0.02)]" />
                    {/* Right punch-out */}
                    <div className="absolute -right-2.5 w-5 h-5 rounded-full bg-slate-50 border border-slate-200/60 shadow-[inset_3px_0_4px_rgba(0,0,0,0.02)]" />
                  </div>

                  {/* TICKET STUB FOOTER */}
                  <div className="px-5 pb-5 pt-3 bg-white flex-grow flex flex-col justify-end">
                    {isApproved ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 border border-emerald-100 py-2 rounded-lg">
                          <ShieldCheck className="w-4 h-4" />
                          <span>OUTPASS ACTIVE</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 w-full">
                          <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">PASS ID</span>
                          <span className="text-[10px] font-mono tracking-[0.2em] text-gray-700 font-bold mt-1 uppercase">{outpass._id}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-[10px] text-center text-slate-400 font-medium bg-amber-50/50 py-1.5 rounded border border-dashed border-amber-200">
                          ⚠️ Security clearance QR is generated post-authorization.
                        </div>
                        <button
                          onClick={() => handleApprove(outpass._id, outpass.applicantId.name)}
                          disabled={isBeingProcessed}
                          className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer text-sm tracking-wide"
                        >
                          {isBeingProcessed ? (
                            <Loader className="animate-spin w-4 h-4 mr-2" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 mr-2" />
                          )}
                          AUTHORIZE OUTPASS
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default StaffOutpassRequests;
