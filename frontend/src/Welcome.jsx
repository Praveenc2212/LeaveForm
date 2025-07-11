import React, { useEffect } from "react";

function Welcome() {
  // Optional: Add fade-in effect or load state
  return (
    <>
      {/* 🔸 Background Video */}
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-10 blur-md">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/vedio4.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 🔸 Content */}
      <div className="flex flex-col items-center justify-center text-white text-center h-screen px-4">
        {/* Logo */}
        <div className="animate-dropIn">
          <img
            src="logo-kce.png"
            alt="Karpagam Logo"
            className="h-28 drop-shadow-[0_0_6px_white] mb-6"
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl opacity-0 animate-slideUp delay-500">
          KARPAGAM COLLEGE OF ENGINEERING
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-sm md:text-lg tracking-widest text-gray-100 opacity-0 animate-fadeIn delay-[1500ms]">
          Rediscover | Refine | Redefine
        </p>

        {/* Sub Headings */}
        <h2 className="mt-6 text-2xl font-semibold text-[#ffd3b5] drop-shadow-md opacity-0 animate-slideUp delay-[1000ms]">
          Welcome to
        </h2>
        <h2 className="text-2xl font-semibold text-[#ffd3b5] drop-shadow-md opacity-0 animate-slideUp delay-[1200ms]">
          CSE Leave Portal
        </h2>
      </div>
    </>
  );
}

export default Welcome;
