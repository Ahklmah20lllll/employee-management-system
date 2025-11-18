import { useState, useEffect } from "react";
import api from "../../../utils/api";
import Spinner from "../../../components/Spinner";

function LeaveList() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Fetch all leaves
  useEffect(() => {
    const fetchAllLeaves = async () => {
      try {
        const res = await api.get("/leave");
        if (res.data.success) {
          setLeaves(res.data.leaves || []);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeaves();
  }, []);

  // Fetch leaves for a specific employee (admin view)
  const fetchEmployeeLeaves = async (employeeId) => {
    try {
      setLoading(true);
      const response = await api.get(`/leave/${employeeId}/admin`);
      const data = response.data;
      
      if (data.success) {
        setLeaves(data.leaves || []);
        setSelectedEmployeeId(employeeId);
      }
    } catch (error) {
      console.error("Error fetching employee leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leave Management</h1>
      
      {selectedEmployeeId && (
        <button
          onClick={() => {
            setSelectedEmployeeId(null);
            // Reload all leaves
            window.location.reload();
          }}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          View All Leaves
        </button>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Employee</th>
              <th className="border border-gray-300 p-2">Leave Type</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Reason</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="7" className="border border-gray-300 p-4 text-center">
                  No leave requests found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {leave.employeeId?.fname} {leave.employeeId?.lname}
                  </td>
                  <td className="border border-gray-300 p-2">{leave.leaveType}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">{leave.reason || "-"}</td>
                  <td className="border border-gray-300 p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => fetchEmployeeLeaves(leave.employeeId?._id || leave.employeeId)}
                      className="text-blue-600 hover:underline"
                    >
                      View Employee
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveList;

