import { useState, useEffect } from "react";
import SummaryCard from "../../../components/SummaryCard";
import Spinner from "../../../components/Spinner";
import api from "../../../utils/api";

function AdminSummary() {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    leavesPending: 0,
    totalSalary: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/dashboard/summary");
        if (res.data.success) {
          setSummary({
            totalEmployees: res.data.totalEmployees || 0,
            totalDepartments: res.data.totalDepartments || 0,
            leavesPending: res.data.leaveSummary?.pending || 0,
            totalSalary: res.data.totalSalary || 0
          });
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SummaryCard title="Total Employees" number={summary.totalEmployees} />
      <SummaryCard title="Departments" number={summary.totalDepartments} />
      <SummaryCard title="Leaves Pending" number={summary.leavesPending} />
      <SummaryCard title="Monthly Salary" number={`$${summary.totalSalary.toLocaleString()}`} />
    </div>
  );
}

export default AdminSummary;
