import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Spinner from "../../../components/Spinner";
import api from "../../../utils/api";

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get(`/leave/${user._id}/employee`);
        const data = response.data;
        
        if (data.success) {
          setLeaves(data.leaves || []);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id) {
      fetchLeaves();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Leaves</h2>
        <Link to="/employeeDashboard/leaves/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add New Leave
        </Link>
      </div>
      {leaves.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No leave requests found. Click "Add New Leave" to create one.
        </div>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, i) => (
              <tr key={leave._id} className="border-t text-center">
                <td>{i + 1}</td>
                <td>{leave.leaveType}</td>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td>{leave.reason || "-"}</td>
                <td>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
