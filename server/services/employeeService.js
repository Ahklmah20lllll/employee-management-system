import Employee from "../model/Employee.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";

class EmployeeService {

  // create employee + login user
  async createEmployee(data, file) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newEmployee = new Employee({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      contact: data.contact,
      designation: data.designation,
      department: data.department,
      address: data.address,
      profileImage: file?.filename || null
    });

    const savedEmployee = await newEmployee.save();

    const newUser = new User({
      email: data.email,
      password: hashedPassword,
      employeeId: savedEmployee._id
    });

    await newUser.save();

    return savedEmployee;
  }

  // list employees
  async listEmployees() {
    return await Employee.find({});
  }

  // get single employee
  async getEmployeeById(id) {
    return await Employee.findById(id);
  }

  // update employee
  async updateEmployee(id, body, file) {
    const updateData = {
      fname: body.fname,
      lname: body.lname,
      email: body.email,
      contact: body.contact,
      designation: body.designation,
      department: body.department,
      address: body.address,
    };

    if (file) {
      updateData.profileImage = file.filename;
    }

    return await Employee.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default new EmployeeService();
