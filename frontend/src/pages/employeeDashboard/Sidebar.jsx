import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaSignOutAlt, FaCalendarAlt, FaMoneyCheckAlt, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Employee Panel</h2>
      <nav className="flex flex-col space-y-3">
        <NavLink to="/employeeDashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </NavLink>
        <NavLink to={`/employeeDashboard/profile/${user._id}`} className="hover:bg-gray-700 p-2 rounded">
          My Profile
        </NavLink>
        <NavLink to="/employeeDashboard/leaves" className="hover:bg-gray-700 p-2 rounded">
          Leaves
        </NavLink>
        <NavLink to="/employeeDashboard/salary" className="hover:bg-gray-700 p-2 rounded">
          Salary
        </NavLink>
        <NavLink to="/employeeDashboard/setting" className="hover:bg-gray-700 p-2 rounded">
          Settings
        </NavLink>
        <button
          onClick={logout}
          className="mt-4 bg-red-600 p-2 rounded flex items-center justify-center"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
