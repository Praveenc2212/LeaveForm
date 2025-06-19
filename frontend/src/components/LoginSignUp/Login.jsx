import React from 'react'
import bg from "../../assets/bg.jpg";
import logo from "../../assets/logo.png";

function Login() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-300 to-white-300 font-sans p-10">
        <img
        src={logo}
        alt="Logo"
        className="absolute top-4 left-4 w-80 h-25 border-4 border-white rounded-xl shadow-lg"
      />
        <div className="flex justify-center items-center h-screen relative z-10">
          <div className="bg-white/20 backdrop-blur-md border border-white p-6 shadow-lg rounded-2xl w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/3 xl:w-1/4">
            <h1 className="text-center text-black text-2xl font-bold mb-6">Login</h1>
  
            <form>
  
              <div className="mb-4">
                <label htmlFor="email" className="block text-black font-semibold mb-1 text-lg">
                  E-Mail:
                </label>
                <input
                  type="email"
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login