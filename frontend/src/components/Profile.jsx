import React from "react";
import { UserRound, LogOut, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userData, Logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout();
  };

  const handleClose = () => {
    navigate(-1); // 👈 Go back to the previous page
  };

  return (
    <>
      {/* Fullscreen Overlay to make sure modal is above header */}
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 z-[100]">
        <div className="relative w-full max-w-xs md:max-w-3xl bg-white rounded-2xl shadow-xl shadow-black/15 p-8 pt-0 pb-4 px-2 md:px-12 text-center font-sans text-sm">
          
          {/* ❌ Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>

          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white shadow">
              <UserRound className="text-orange-500 size-8" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1">Profile</h2>

          <div className="bg-white rounded-xl p-2 sm:p-4 text-left font-sans">
            <div className="md:flex md:gap-4">
              <div className="md:w-1/2 mb-2">
                <label className="text-sm text-gray-600">Name</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800">
                  {userData.name}
                </div>
              </div>
              <div className="md:w-1/2 mb-2">
                <label className="text-sm text-gray-600">Roll Number</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800">
                  {userData.rollno}
                </div>
              </div>
            </div>

            <div className="md:flex md:gap-4 items-start">
              <div className="md:w-1/2 mb-2 flex flex-col justify-start">
                <label className="text-sm text-gray-600">Gender</label>
                <div className="w-full mt-1 px-4 py-2 h-[44px] rounded-lg border border-gray-300 bg-white text-gray-800 flex items-center">
                  {userData.gender}
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-sm text-gray-600">Year</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800">
                  {userData.year} Year
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="md:w-1/2 mb-2 flex flex-col justify-start">
                <label className="text-sm text-gray-600">Department</label>
                <div className="w-full mt-1 px-4 py-2 h-[44px] rounded-lg border border-gray-300 bg-white text-gray-800 flex items-center">
                  {userData.department}
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-sm text-gray-600">Section</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800">
                  {userData.section}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-orange-300 text-orange-500 bg-white rounded-lg transition-colors duration-200 text-base font-semibold w-full max-w-2xs justify-center cursor-pointer hover:bg-orange-300/80 hover:text-white"
        >
          <LogOut size={18} className="transition-colors duration-200" />
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
