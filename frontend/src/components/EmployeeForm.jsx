import React, { useState } from "react";
import api from "../utils/api";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    contact: "",
    address: "",
    image: null
  });

  // Handle text inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]
    });
  };

  // Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      
      // append form fields one by one
      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });

      const res = await api.post(
        "/employee/create",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      console.log("Server Response:", res.data);
      alert("Employee Registered Successfully!");

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ width: "600px", margin: "auto", padding: "20px" }}>
      <h2>Employee Registration Form</h2>

      <form onSubmit={handleSubmit}>
        
        <label>First Name</label>
        <input
          type="text"
          name="fname"
          value={form.fname}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lname"
          value={form.lname}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
        />

        <label>Department</label>
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
        />

        <label>Contact</label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
        ></textarea>

        <label>Employee Image</label>
        <input type="file" name="image" onChange={handleFileChange} />

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
