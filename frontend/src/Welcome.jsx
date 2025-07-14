// import React, { useEffect } from "react";

// function Welcome() {
//   // Optional: Add fade-in effect or load state
//   return (
//     <>
//       {/* 🔸 Background Video */}
//       <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-10 blur-md">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           <source src="/vedio4.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* 🔸 Content */}
//       <div className="flex flex-col items-center justify-center text-white text-center h-screen px-4">
//         {/* Logo */}
//         <div className="animate-dropIn">
//           <img
//             src="logo-kce.png"
//             alt="Karpagam Logo"
//             className="h-28 drop-shadow-[0_0_1px_white] mb-6"
//           />
//         </div>

//         {/* Headline */}
//         <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl opacity-0 animate-slideUp delay-500">
//           KARPAGAM COLLEGE OF ENGINEERING
//         </h1>

//         {/* Tagline */}
//         <p className="mt-4 text-sm md:text-lg tracking-widest text-gray-100 opacity-0 animate-fadeIn delay-[1500ms]">
//           Rediscover | Refine | Redefine
//         </p>

//         {/* Sub Headings */}
//         <h2 className="mt-6 text-2xl font-semibold text-[#ffd3b5] drop-shadow-md opacity-0 animate-slideUp delay-[1000ms]">
//           Welcome to
//         </h2>
//         <h2 className="text-2xl font-semibold text-[#ffd3b5] drop-shadow-md opacity-0 animate-slideUp delay-[1200ms]">
//           CSE Leave Portal
//         </h2>
//       </div>
//     </>
//   );
// }

// export default Welcome;
//=========================================
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-6">

        {/* 🔶 First Line: KCE Logo */}
        <div className="animate-slideInLeft delay-100">
          <img src="kce-wl.png" alt="KCE Logo" className="h-24 w-auto mx-auto" />
        </div>
        {/* 🔷 Second Line: SDC + AURA Logos */}
        <div className="flex justify-center gap-10 animate-slideInLeft delay-300">
          <img src="sdc-wl.png" alt="SDC Logo" className="h-20 w-auto" />
          <img src="aura-wl.png" alt="AURA Logo" className="h-20 w-auto" />
        </div>

        {/* 🔹 Third Line: Title */}
        <h1 className="text-3xl font-extrabold text-[#3d699b] tracking-[0.5em] animate-fadeInTop delay-500 drop-shadow-md tracking-widest">
          CSE LEAVE PORTAL
        </h1>
      </div>
    </div>
  );
}

export default Welcome;