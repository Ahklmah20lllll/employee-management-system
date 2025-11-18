import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    leaveType: "Sick",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (!user?._id) {
        setError("Please login first");
        return;
      }

      const response = await api.post("/leave/add", {
        userId: user._id,
        leaveType: form.leaveType,
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason,
      });

      if (response.data.success) {
        alert("Leave applied successfully!");
        setForm({ leaveType: "Sick", startDate: "", endDate: "", reason: "" });
        navigate("/employeeDashboard/leaves");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error applying leave");
      alert(error.response?.data?.message || "Error applying leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
      <form onSubmit={submitHandler} className="space-y-3">
        <select 
          value={form.leaveType} 
          onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Sick">Sick</option>
          <option value="Casual">Casual</option>
          <option value="Annual">Annual</option>
        </select>
        <input 
          type="date" 
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })} 
          className="border p-2 w-full" 
          required
        />
        <input 
          type="date" 
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })} 
          className="border p-2 w-full" 
          required
        />
        <textarea 
          placeholder="Reason (optional)" 
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })} 
          className="border p-2 w-full"
          rows="4"
        />
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;
