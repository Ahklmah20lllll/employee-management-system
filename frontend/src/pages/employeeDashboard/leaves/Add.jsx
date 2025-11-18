import React, { useState } from "react";
import api from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/leave/add", leave);
    navigate("/employeeDashboard/leaves");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Request for Leave</h2>
      <select name="leaveType" onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">Select Leave Type</option>
        <option value="Sick">Sick</option>
        <option value="Casual">Casual</option>
        <option value="Annual">Annual</option>
      </select>
      <input type="date" name="startDate" onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="date" name="endDate" onChange={handleChange} className="w-full border p-2 rounded" />
      <textarea name="reason" placeholder="Reason..." onChange={handleChange} className="w-full border p-2 rounded"></textarea>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Leave</button>
    </form>
  );
};

export default Add;
