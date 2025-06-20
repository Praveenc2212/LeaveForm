import React from 'react'
import logo from "../../../assets/logo.png"; // Update path as needed
import profilePic from "../../../assets/Profile.png"; // Update path as needed

function Header() {
  return (
      <>
      <div className="flex justify-between items-center bg-white shadow-md rounded-xl py-2 px-6 mb-6">
                  {/* Left: Logo + Title */}
                  <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="h-16 object-contain" />
                    {/* <span className="text-2xl font-bold text-blue-700">Staff Portal</span> */}
                  </div>
          
                  {/* Right: Profile */}
                  <div className="flex items-center space-x-3">
                    {/* <span className="text-sm text-gray-700 font-medium">  name of the profile  </span> */}
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-blue-400"
                    />
                  </div>
                </div>
      
      </>
  )
}

export default Header