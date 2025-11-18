// controllers/dashboardController.js
import Employee from "../model/Employee.js";
import Department from "../model/Department.js";
import Leave from "../model/Leave.js";
import Salary from "../model/Salary.js";

export const getSummary = async (req, res) => {
  try {
    // 1) total employees
    const totalEmployees = await Employee.countDocuments();

    // 2) total departments
    const totalDepartments = await Department.countDocuments();

    // 3) total monthly salary - sum of netSalary from Salary records
    const totalSalaryAgg = await Salary.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: { $ifNull: ["$netSalary", 0] } },
        },
      },
    ]);
    const totalSalary = (totalSalaryAgg[0] && totalSalaryAgg[0].totalSalary) || 0;

    // 4) how many distinct employees have applied for leave
    const distinctLeaveEmployees = await Leave.distinct("employeeId");
    const leaveAppliedCount = Array.isArray(distinctLeaveEmployees)
      ? distinctLeaveEmployees.length
      : 0;

    // 5) leave counts by status (approved, pending, rejected, etc.)
    //    Replace "status" with the actual field name if different.
    const leaveByStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Map aggregation output into a friendly object with defaults
    const statusMap = {};
    leaveByStatus.forEach((item) => {
      // item._id may be e.g. "approved", "pending", "rejected"
      statusMap[String(item._id).toLowerCase()] = item.count;
    });

    const leaveSummary = {
      appliedFor: leaveAppliedCount,
      approved: statusMap["approved"] || 0,
      pending: statusMap["pending"] || 0,
      rejected: statusMap["rejected"] || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary,
      leaveSummary,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard summary",
      error: error.message || error,
    });
  }
};
