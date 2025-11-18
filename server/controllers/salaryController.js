import Salary from "../model/Salary.js";

// ADD Salary
export const addSalary = async (req, res) => {
  try {
    const {
      employeeID,
      basicSalary,
      allowances,
      deductions,
      payDate
    } = req.body;

    // Calculate total salary
    const netSalary =
      parseInt(basicSalary) +
      parseInt(allowances) -
      parseInt(deductions);

    const salary = new Salary({
      employeeID,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      payDate
    });

    await salary.save();

    return res.status(200).json({
      success: true,
      message: "Salary added successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// GET salary history by employee ID
export const getSalaryByEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const salaries = await Salary.find({ employeeID: id })
      .populate("employeeID", "fname lname email");

    return res.status(200).json({
      success: true,
      salaries: salaries
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Admin: Get all salaries
export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find()
      .populate("employeeID", "fname lname email department");

    return res.status(200).json({
      success: true,
      salaries: salaries
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Admin: Get salary by employee ID and role
export const getSalaryByIdAndRole = async (req, res) => {
  try {
    const { id, role } = req.params;

    const salaries = await Salary.find({ employeeID: id })
      .populate("employeeID", "fname lname email department");

    return res.status(200).json({
      success: true,
      salaries: salaries
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
