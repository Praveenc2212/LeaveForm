import React, { useState, useEffect } from "react";
import { 
  CircleUserRound, 
  Clock, 
  MapPin, 
  Calendar, 
  Hash, 
  MessageSquareQuote, 
  Phone, 
  ShieldCheck,
  CheckCircle,
  XCircle,
  Search
} from "lucide-react";
import toast from "react-hot-toast";

function HodStaffOutpassRequests() {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("pending"); // "pending" or "authorized"
  const [searchQuery, setSearchQuery] = useState("");

  const loadRequests = () => {
    const stored = localStorage.getItem("all_staff_outpasses");
    if (stored) {
      setRequests(JSON.parse(stored));
    } else {
      setRequests([]);
    }
  };

  useEffect(() => {
    loadRequests();
    // Listen for storage changes in case staff requests in another tab
    window.addEventListener("storage", loadRequests);
    return () => window.removeEventListener("storage", loadRequests);
  }, []);

  const handleAction = (id, action) => {
    const updated = requests.map((req) => {
      if (req.id === id) {
        return { ...req, status: action === "approve" ? "Approved" : "Rejected" };
      }
      return req;
    });

    localStorage.setItem("all_staff_outpasses", JSON.stringify(updated));
    setRequests(updated);

    if (action === "approve") {
      toast.success("Staff outpass authorized successfully!");
    } else {
      toast.error("Staff outpass request declined.");
    }
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

  // Filter requests by tab & search query
  const filteredRequests = requests.filter((req) => {
    const matchesTab = activeTab === "pending" 
      ? req.status === "Pending" 
      : req.status === "Approved" || req.status === "Rejected";

    const matchesSearch = 
      req.staffName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.place?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.staffDepartment?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const pendingCount = requests.filter(req => req.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Search & Navigation Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center gap-2 ${
              activeTab === "pending"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/10"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            Pending Requests
            {pendingCount > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === "pending" ? "bg-white text-orange-600" : "bg-red-500 text-white"}`}>
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("authorized")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
              activeTab === "authorized"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/10"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            Reviewed Requests
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search staff, place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-slate-50 hover:bg-slate-100/50 focus:bg-white transition-all text-xs placeholder:text-slate-400 font-semibold text-slate-700"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <ShieldCheck className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-700">No Staff Outpasses</h2>
          <p className="text-slate-500 mt-1 max-w-sm text-xs">
            There are no staff outpass requests matching this category.
          </p>
        </div>
      )}

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredRequests.map((req) => (
          <div 
            key={req.id} 
            className="relative bg-white rounded-2xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
          >
            {/* Gradient Top Banner Accent */}
            <div className={`h-2.5 w-full bg-gradient-to-r ${
              req.status === "Approved" ? "from-emerald-400 to-teal-500" :
              req.status === "Rejected" ? "from-red-400 to-rose-500" : "from-orange-500 to-amber-500"
            }`} />

            {/* Profile Header */}
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
                    {req.staffName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 tracking-wider mt-0.5">{req.staffDepartment} Department</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                req.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                req.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {req.status}
              </div>
            </div>

            {/* Details Grid */}
            <div className="px-5 pt-3 pb-3 grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="font-semibold truncate" title={req.place}>{req.place}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="font-semibold">{calculateDuration(req.startDate, req.endDate)}</span>
                </div>
              </div>
            </div>

            {/* Date Details Bar */}
            <div className="px-5 py-3 bg-slate-50 border-y border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Exit Time</span>
                <span className="font-bold text-slate-700">{formatDateTimeDisplay(req.startDate)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Return Time</span>
                <span className="font-bold text-slate-700">{formatDateTimeDisplay(req.endDate)}</span>
              </div>
            </div>

            {/* Reason Statement block */}
            <div className="px-5 pt-3 pb-3 flex-grow">
              <blockquote className="bg-slate-50 border-l-3 border-orange-500 p-2.5 rounded-r-lg">
                <div className="flex items-center mb-1">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-orange-500/70 mr-1" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Reason Statement</span>
                </div>
                <p className="text-xs italic text-slate-600 pl-4 leading-relaxed font-medium line-clamp-2" title={req.reason}>
                  "{req.reason}"
                </p>
              </blockquote>
            </div>

            {/* Contact details */}
            <div className="px-5 py-3 border-t border-slate-100 flex items-center text-xs text-slate-500 gap-1 bg-white">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Mobile: <strong className="text-slate-700 font-semibold">{req.mobile}</strong></span>
            </div>

            {/* Actions for HOD approval */}
            {req.status === "Pending" ? (
              <div className="p-4 bg-slate-50/50 flex justify-between items-center gap-3 border-t border-slate-100/50 rounded-b-2xl">
                <button 
                  onClick={() => handleAction(req.id, "decline")}
                  className="flex-1 py-2 px-3 border border-red-200 text-red-500 bg-white hover:bg-red-500 hover:text-white hover:border-red-500 font-bold rounded-lg flex items-center justify-center gap-1.5 transition text-xs cursor-pointer shadow-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Decline
                </button>
                <button 
                  onClick={() => handleAction(req.id, "approve")}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 font-bold rounded-lg flex items-center justify-center gap-1.5 transition text-xs cursor-pointer shadow-md shadow-orange-500/10"
                >
                  <CheckCircle className="w-4 h-4" />
                  Authorize
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-50/20 text-center border-t border-slate-100/50 text-[11px] font-semibold text-slate-400">
                Processed on {new Date(req.appliedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HodStaffOutpassRequests;
