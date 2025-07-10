// import React, { useState } from 'react'
// // import bg from "../../assets/bg.jpg";
// import { useNavigate } from 'react-router-dom';
// // import logo from "../../assets/logo.png";
// // import { IconUser } from "@lucid/react";
// import { Link } from "react-router-dom";
// import AuthHeader from './AuthHeader';
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const admin = "ppp@kce.ac.in"
//   const passkey = "123"
//   const navigate = useNavigate()
//   const HandleLogin = (e) => {
//     e.preventDefault();
//     if (email === admin && (passkey === password)) {
//       navigate("/student");
//     }
//     if ((email === "sss@kce.ac.in") && (passkey === password)) {
//       navigate("/staff");

//     }
//     if ((email === "hod@kce.ac.in") && (passkey === password)) {
//       navigate("/hod");

//     }
//   }

//   return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-300 to-white-300 font-sans p-4">
//       <div className='p-0'>
//       <AuthHeader />

//       </div>
//       <div className="flex justify-center mt-10 mb-6 relative z-10">
//           <div className="bg-white/20 backdrop-blur-md border border-white p-6 shadow-lg rounded-2xl w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/3 xl:w-1/4">
//             <h1 className="text-center text-black text-2xl font-bold mb-6">Login</h1>

//             <form onSubmit={HandleLogin} >

//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-black font-semibold mb-1 text-lg">
//                   E-Mail:
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={(e)=>setEmail(e.target.value)}
//                   autoComplete="off"
//                   placeholder="Enter E-Mail"
//                   className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label htmlFor="password" className="block text-black font-semibold mb-1 text-lg">
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   autoComplete="off"
//                   onChange={(e)=>setPassword(e.target.value)}
//                   placeholder="Enter Password"
//                   className="w-full px-4 py-2 bg-transparent border border-gray/60 text-gray rounded focus:outline-none focus:ring-2 focus:ring-white/70"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 // onClick={ HandleLogin  }
//                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
//               > 
//                 Login
//               </button>
//               <p className="text-center mt-4 text-black text-lg">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-pink-500 hover:text-purple-700 underline transition-colors duration-300 hover:drop-shadow-md"
//               >
//                 SignUp 
//               </Link>
//             </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   // return (
//   //   <div className="min-h-screen flex items-center justify-center bg-gray-50">
//   //     <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
//   //       <div className="flex flex-col items-center mb-8">
//   //         <div className="bg-blue-500 rounded-full w-24 h-24 flex items-center justify-center mb-4">
//   //           {/* Lucid React IconUser */}
//   //           <IconUser className="w-12 h-12 text-white" />
//   //         </div>
//   //         <h2 className="text-3xl font-normal text-black">Sign In</h2>
//   //       </div>
//   //       <form className="space-y-4">
//   //         <input
//   //           type="text"
//   //           placeholder="Username"
//   //           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //         <input
//   //           type="password"
//   //           placeholder="Password"
//   //           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         />
//   //         <button
//   //           type="submit"
//   //           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition"
//   //         >
//   //           Login
//   //         </button>
//   //         <div className="flex items-center justify-between pt-2">
//   //           <label className="flex items-center">
//   //             <input
//   //               type="checkbox"
//   //               className="form-checkbox h-5 w-5 text-blue-500 border-blue-300 rounded focus:ring-blue-400"
//   //               defaultChecked
//   //             />
//   //             <span className="ml-2 text-blue-500 font-medium">Remember Me</span>
//   //           </label>
//   //           <a
//   //             href="#"
//   //             className="text-blue-500 font-medium hover:underline"
//   //           >
//   //             Forgot Password
//   //           </a>
//   //         </div>
//   //       </form>
//   //     </div>
//   //   </div>
//   // );
// };

// export default Login



import { useState } from "react";
import { Eye, EyeOff, UserRound } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import AuthHeader from './AuthHeader';
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const HandleLogin = (e) => {
    e.preventDefault();
    // if (email === admin && passkey === password) {
    //   navigate("/student");
    // }
    if (email === "sss@kce.ac.in" && "123" === password) {
      navigate("/staff");
    }
    if (email === "ppp@kce.ac.in" && "123" === password) {
      navigate("/student");
    }
  };
  
  return ( // flex items-center justify-center
    <div className="min-h-screen bg-orange-50/30 font-sans pt-7 pr-5 pl-5 ">
      <div className="flex justify-center mt-10 mb-6 relative z-10">
        <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-orange-100 rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <UserRound className="size-10 text-orange-500" />
            </div>
            <h2 className="text-3xl font-normal text-black">Log In</h2>
          </div>
          <form className="space-y-4" onSubmit={HandleLogin}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="Enter E-Mail"
              className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
             <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-100 bg-transparent pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 focus:outline-none cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            <button
              // onClick={HandleLogin}
              className="w-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-3 cursor-pointer rounded-md transition"
            >
              Login
            </button>          
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;