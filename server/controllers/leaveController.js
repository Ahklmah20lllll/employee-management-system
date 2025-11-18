import Leave from "../model/Leave.js";
import Employee from "../model/Employee.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ success: true, message: "Leave added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getLeavesByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id });
    const leaves = await Leave.find({ employeeId: employee._id });
    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaves" });
  }
};
// Admin: Get all leaves
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "fname lname email department");

    res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.error("Leave fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

// Admin: Get leaves for a specific employee (route: /api/leave/:employeeId/admin)
export const getLeaveByIdAndRole = async (req, res) => {
  try {
    const { id } = req.params; // This is the employeeId

    // Admin can view ANY employee's leave requests
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    
    const leaveData = await Leave.find({ employeeId: id })
      .populate("employeeId", "fname lname email department");

    if (!leaveData || leaveData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leave records found for this employee",
      });
    }

    res.status(200).json({
      success: true,
      leaves: leaveData,
    });

  } catch (error) {
    console.error("Leave detail error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching leave",
      error: error.message,
    });
  }
};
