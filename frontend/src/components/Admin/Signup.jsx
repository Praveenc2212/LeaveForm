import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FaUpload } from "react-icons/fa";
// import AuthHeader from "./AuthHeader";
// import ProfileSelector from "./ProfileSelector";
function Signup() {
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [profile, setProfile] = useState(null);

  const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "AIDS", "CD", "CY", "CT", "IT"];
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
  const years = ["I", "II", "III", "IV"];

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImage(URL.createObjectURL(file));
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-white-300 font-sans p-4">
      <div className="flex justify-center mt-10 mb-6 relative z-10">
        <div className="bg-white/20 backdrop-blur-md border border-white p-6 shadow-lg rounded-2xl w-full max-w-md">
          <h1 className="text-center text-black text-2xl font-bold mb-6">Register</h1>

          <form>

            {/* Upload Image */}
          
            <div className="flex items-center justify-center">
              <ProfileSelector image={profile} setImage={setProfile} />
            </div>


            {/* Name */}
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
                className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            {/* Designation */}
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
                  setYear("");
                }}
                className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <option value="">-- Select --</option>
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
                <option value="HOD">HOD</option>
                <option value="Principal">Principal</option>
                <option value="Warden">Warden</option>
                <option value="Transport">Transport Officer</option>
              </select>
            </div>

            {/* Department */}
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
                  className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <option value="">-- Select Department --</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Year & Section */}
            {(designation === "Student" || designation === "Tutor") && department && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="year" className="block text-black font-semibold mb-1 text-lg">
                    Year:
                  </label>
                  <select
                    id="year"
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    <option value="">-- Select Year --</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="section" className="block text-black font-semibold mb-1 text-lg">
                    Section:
                  </label>
                  <select
                    id="section"
                    name="section"
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    <option value="">-- Select Section --</option>
                    {sections[department].map((sec) => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Hostel Block */}
            {designation === "Warden" && (
              <div className="mb-4">
                <label htmlFor="hostel" className="block text-black font-semibold mb-1 text-lg">
                  Hostel Block:
                </label>
                <select
                  id="hostel"
                  name="hostel"
                  className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <option value="">-- Select Hostel --</option>
                  {hostelBlocks.map((block) => (
                    <option key={block} value={block}>{block}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Email */}
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
                className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            {/* Password */}
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
                className="w-full px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Register
            </button>

            {/* Link to Login */}
            <p className="text-center mt-4 text-black text-lg">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-pink-500 hover:text-purple-700 underline transition-colors duration-300"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
