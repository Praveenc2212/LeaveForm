import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import AuthHeader from "./AuthHeader";
function Signup() {
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL","AIDS","CD","CY","CT","IT"];
  const sections = {
    CSE: ["A", "B", "C"],
    ECE: ["A", "B", "C"],
    EEE: ["A", "B"],
    MECH: ["A", "B"],
    CIVIL: ["A", "B"],
    AIDS: ["A", "B"],
    CD: ["A"],
    CY: ["A"],
    CT: ["A"],
    IT: ["A", "B"],
  };
  const hostelBlocks = ["Block H", "Block J", "Block C"];

  return (


    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-white-300 font-sans p-4">
      {/* <img
        src={logo}
        alt="Logo"
        className="absolute top-4 left-4 w-80 h-25 border-4 border-white rounded-xl shadow-lg"
        /> */}
      
       <div className='p-0'>
      <AuthHeader />
      </div>

      <div className="flex justify-center mt-10 mb-6 relative z-10">
        <div className="bg-white/20 backdrop-blur-md border border-white p-6 shadow-lg rounded-2xl w-full max-w-md">
          <h1 className="text-center text-black text-2xl font-bold mb-6">Register</h1>

          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-black font-semibold mb-1 text-lg">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Enter Name"
                className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="designation" className="block text-black font-semibold mb-1 text-lg">
                Designation:
              </label>
              <select
                id="designation"
                name="designation"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                  setDepartment(""); 
                }}
                className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <option value="">-- Select --</option>
                <option value="Student" className="text-black">Student</option>
                <option value="Tutor" className="text-black">Tutor</option>
                <option value="HOD" className="text-black">HOD</option>
                <option value="Principal" className="text-black">Principal</option>
                <option value="Warden" className="text-black">Warden</option>
                <option value="Transport" className="text-black">Transport Officer</option>
              </select>
            </div>

            {(designation === "Student" || designation === "Tutor" || designation === "HOD") && (
              <div className="mb-4">
                <label htmlFor="department" className="block text-black font-semibold mb-1 text-lg">
                  Department:
                </label>
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <option value="">-- Select Department --</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="text-black">{dept}</option>
                  ))}
                </select>
              </div>
            )}

            {(designation === "Student" || designation === "Tutor") && department && (
              <div className="mb-4">
                <label htmlFor="section" className="block text-black font-semibold mb-1 text-lg">
                  Section:
                </label>
                <select
                  id="section"
                  name="section"
                  className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  {sections[department].map((sec) => (
                    <option key={sec} value={sec} className="text-black">{sec}</option>
                  ))}
                </select>
              </div>
            )}

            {designation === "Warden" && (
              <div className="mb-4">
                <label htmlFor="hostel" className="block text-black font-semibold mb-1 text-lg">
                  Hostel Block:
                </label>
                <select
                  id="hostel"
                  name="hostel"
                  className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  {hostelBlocks.map((block) => (
                    <option key={block} value={block} className="text-black">{block}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-black font-semibold mb-1 text-lg">
                E-Mail:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Enter E-Mail"
                className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-black font-semibold mb-1 text-lg">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Register
            </button>

            <p className="text-center mt-4 text-black text-lg">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-pink-500 hover:text-purple-700 underline transition-colors duration-300 hover:drop-shadow-md"
              >
                Login in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
