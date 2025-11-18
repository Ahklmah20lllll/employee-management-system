import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="bg-teal-600 text-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-3">
        <FaUser size={30} />
        <div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-lg">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
