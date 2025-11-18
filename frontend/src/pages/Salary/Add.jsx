import React, { useState, useEffect } from "react";
import { getDepartments, getEmployees } from "../helper/employeeHelper";
import api from "../../utils/api";

const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salary, setSalary] = useState({
    department: "",
    employeeID: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: ""
  });

  // Fetch departments
  useEffect(() => {
    (async () => {
      const data = await getDepartments();
      setDepartments(data);
    })();
  }, []);

  // Handle department change
  const handleDepartment = async (e) => {
    const depId = e.target.value;
    setSalary({ ...salary, department: depId });

    const emps = await getEmployees(depId);
    setEmployees(emps);
  };

  // Generic input change
  const handleChange = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  // Submit salary
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/salary/add", salary);
    alert("Salary Added Successfully");
  };

  return (
    <div>
      <h2>Add Salary</h2>

      {/* Select Department */}
      <select name="department" onChange={handleDepartment}>
        <option>Select Department</option>
        {departments?.map(dep => (
          <option key={dep._id} value={dep._id}>
            {dep.name}
          </option>
        ))}
      </select>

      {/* Select Employee */}
      <select name="employeeID" onChange={handleChange}>
        <option>Select Employee</option>
        {employees?.map(emp => (
          <option key={emp._id} value={emp._id}>
            {emp.employeeID}
          </option>
        ))}
      </select>

      {/* Salary Fields */}
      <input type="number" name="basicSalary" onChange={handleChange} placeholder="Basic Salary" />
      <input type="number" name="allowances" onChange={handleChange} placeholder="Allowances" />
      <input type="number" name="deductions" onChange={handleChange} placeholder="Deductions" />
      <input type="date" name="payDate" onChange={handleChange} />

      <button onClick={handleSubmit}>Add Salary</button>
    </div>
  );
};
export default AddSalary;
