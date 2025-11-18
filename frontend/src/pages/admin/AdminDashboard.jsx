import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AdminSummary from "./Summary/AdminSummary";

function AdminDashboard() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex flex-col w-full">
        <Navbar />

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
