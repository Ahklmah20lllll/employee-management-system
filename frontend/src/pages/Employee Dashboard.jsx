import React from "react";
import Sidebar from "../employeeDashboard/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
