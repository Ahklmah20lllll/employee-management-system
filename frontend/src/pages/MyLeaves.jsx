import { useEffect, useState } from "react";
import API from "../api/axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const { data } = await API.get("/leaves/my");
      setLeaves(data);
    };
    fetchLeaves();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">My Leaves</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t text-center">
              <td>{leave.leaveType}</td>
              <td>{leave.startDate.split("T")[0]}</td>
              <td>{leave.endDate.split("T")[0]}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;
