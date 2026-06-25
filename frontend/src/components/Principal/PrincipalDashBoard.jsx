import React from 'react';
import { useAuthStore } from "../../store/useAuthStore";

const PrincipalDashBoard = () => {
  const { userData } = useAuthStore();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, Principal {userData?.name}
        </h1>
        <p className="text-gray-600">
          This is your dashboard. You can add your specific content and features here later.
        </p>
      </div>
    </div>
  );
};

export default PrincipalDashBoard;
