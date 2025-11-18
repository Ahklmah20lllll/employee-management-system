import employeeService from "../services/employeeService.js";
import Employee from "../model/Employee.js";
import Department from "../model/Department.js";

/**
 * POST /api/employee/create
 * body: { fname, lname, email, password, contact, designation, department, address }
 * file: image
 */
export const createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body, req.file);
    res.status(201).json({ success: true, employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * GET /api/employee/list
 * returns employees
 */
export const listEmployees = async (req, res) => {
  try {
    const employees = await employeeService.listEmployees();
    return res.json({ success: true, employees });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/employee/:id
 */
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    return res.json({ success: true, employee });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/employee/update/:id
 * body fields: fname, lname, email, contact, designation, department, address
 * file: image (optional)
 */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await employeeService.updateEmployee(id, req.body, req.file);
    if (!updated) return res.status(404).json({ success: false, message: "Employee not found" });
    return res.json({ success: true, employee: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
/**
 * GET /api/employee/department/:id
 * returns employees by department
 */
export const getEmployeesByDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const employees = await Employee.find({ department: id });

    return res.status(200).json({
      success: true,
      employees
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
