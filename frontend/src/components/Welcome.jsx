import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo8.png'; // ✅ adjust path if needed

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white text-center">
      <div className="animate-fadeIn">
        <img src={logo} alt="Karpagam Logo" className="mx-auto h-28 drop-shadow-md" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">KARPAGAM COLLEGE OF ENGINEERING</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">Welcome to</h2>
        <h2 className="text-xl font-semibold text-gray-700">CSE Leave Portal</h2>
        <p className="text-sm text-gray-500 mt-4 tracking-wide">Rediscover | Refine | Redefine</p>
      </div>
    </div>
  );
};

export default Welcome;
