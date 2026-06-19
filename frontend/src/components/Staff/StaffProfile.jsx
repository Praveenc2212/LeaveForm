import React from "react";
import { UserRound, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

function StaffProfile() {
  const { userData, Logout } = useAuthStore();

  const handleLogout = () => {
    Logout();
  };

  if (!userData) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 min-h-[calc(100vh-8rem)] bg-gray-50/30">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-8 text-center font-sans">
        
        {/* Avatar Header */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <UserRound className="text-orange-500 size-10" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Staff Profile</h2><br></br>

        {/* Profile Details Grid */}
        <div className="bg-white rounded-xl text-left font-sans space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
              <div className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 font-semibold shadow-inner">
                {userData.name}
              </div>
            </div>
            <div className="sm:w-1/2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Designation</label>
              <div className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 font-semibold shadow-inner">
                {userData.designation || "STAFF"}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department</label>
              <div className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 font-semibold shadow-inner">
                {userData.department}
              </div>
            </div>
            <div className="sm:w-1/2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
              <div className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 font-semibold shadow-inner truncate">
                {userData.email}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center border-t border-gray-100 pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 border-2 border-orange-300 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl transition-all duration-250 text-sm font-bold shadow-sm shadow-orange-500/5 active:scale-95 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default StaffProfile;
