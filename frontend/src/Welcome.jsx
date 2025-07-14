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
          <img src="/KCE.png" alt="KCE Logo" className="h-24 w-auto mx-auto" />
        </div>

        {/* 🔷 Second Line: SDC + AURA Logos */}
        <div className="flex justify-center gap-10 animate-slideInLeft delay-300">
          <img src="/SDC.png" alt="SDC Logo" className="h-20 w-auto" />
          <img src="/AURA-removebg-preview.png" alt="AURA Logo" className="h-20 w-auto" />
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
