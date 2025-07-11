import React from "react";
import { UserRound, LogOut } from "lucide-react";
import AuthHeader from "../LoginSignUp/AuthHeader"; // ✅ Correct path



function Profile() {
  return (
    <>
      {/* <AuthHeader /> */}
      <div className="min-h-screen mt-7 h-[90vh] overflow-hidden bg-orange-50/30 font-sans text-sm flex flex-col items-center justify-center p-1">
        {/* Outer Profile Card */}
        <div className="w-full max-w-xs md:max-w-3xl bg-white rounded-2xl shadow-xl pt-4 pb-4 px-2 md:px-12 text-center font-sans text-sm">
          {/* Avatar - Now placed inside card at the top */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white shadow">
              <UserRound className="text-orange-500 size-8" />
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Profile</h2>
          {/* Profile Fields Section (restore card style) */}
          <div className="bg-white rounded-xl p-2 sm:p-4 text-left font-sans">
            <div className="md:flex md:gap-4">
              <div className="md:w-1/2 mb-2">
                <label className="text-sm text-gray-600">Name</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800">
                  Shankar
                </div>
              </div>
              <div className="md:w-1/2 mb-2">
                <label className="text-sm text-gray-600">Roll Number</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800">
                  717823P254
                </div>
              </div>
            </div>
            <div className="md:flex md:gap-4 items-start">
              <div className="md:w-1/2 mb-2 flex flex-col justify-start">
                <label className="text-sm text-gray-600">Email</label>
                <div className="w-full mt-1 px-4 py-2 h-[44px] rounded-lg border border-gray-300 bg-gray-100 text-gray-800 flex items-center">
                  shankar@example.com
                </div>
              </div>
              <div className="md:w-1/2 mb-2 flex flex-col justify-start">
                <label className="text-sm text-gray-600">Department</label>
                <div className="w-full mt-1 px-4 py-2 h-[44px] rounded-lg border border-gray-300 bg-gray-100 text-gray-800 flex items-center">
                  Computer Science and Engineering
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-sm text-gray-600">Year</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800">
                  IV-Year
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-sm text-gray-600">Section</label>
                <div className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800">
                  B
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Logout Button */}
        <button className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full shadow hover:bg-orange-200 transition text-xs">
          <LogOut size={14} />
          LogOut
        </button>
      </div>
    </>
  );
}

export default Profile;
