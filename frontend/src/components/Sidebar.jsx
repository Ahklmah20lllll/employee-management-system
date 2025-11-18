import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaBuilding, FaMoneyBill, FaCalendar } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 min-h-screen">

      <h2 className="text-2xl font-bold mb-10">
        EMS Dashboard
      </h2>

      <ul className="space-y-6">

        <li>
          <Link to="/admin" className="flex items-center gap-2 hover:text-teal-300">
            <FaHome /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/employees" className="flex items-center gap-2 hover:text-teal-300">
            <FaUsers /> Employees
          </Link>
        </li>

        <li>
          <Link to="/admin/departments" className="flex items-center gap-2 hover:text-teal-300">
            <FaBuilding /> Departments
          </Link>
        </li>

        <li>
          <Link to="/admin/leaves" className="flex items-center gap-2 hover:text-teal-300">
            <FaCalendar /> Leaves
          </Link>
        </li>

        <li>
          <Link to="/admin/salary" className="flex items-center gap-2 hover:text-teal-300">
            <FaMoneyBill /> Salary
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;
