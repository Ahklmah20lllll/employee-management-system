import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function EmployeeAdd() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", employeeCode: "", dob: "", gender: "", maritalStatus: "", designation: "", departmentId: "", salary: ""
  });
  const [file, setFile] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onFile = (e) => setFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k => fd.append(k, form[k]));
      if (file) fd.append("image", file);
      const res = await API.post("/employee/create", fd, { headers: { "Content-Type": "multipart/form-data" }});
      if (res.data.success) {
        alert("Employee created");
        nav("/employees");
      }
    } catch (err) { console.error(err); alert("Error"); }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Add Employee</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required /><br/>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required /><br/>
        <input name="password" placeholder="Password" value={form.password} onChange={onChange} required /><br/>
        <input name="employeeCode" placeholder="Employee code" value={form.employeeCode} onChange={onChange} /><br/>
        <input name="dob" type="date" value={form.dob} onChange={onChange} /><br/>
        <input name="gender" placeholder="gender" value={form.gender} onChange={onChange} /><br/>
        <input name="maritalStatus" placeholder="maritalStatus" value={form.maritalStatus} onChange={onChange} /><br/>
        <input name="designation" placeholder="designation" value={form.designation} onChange={onChange} /><br/>
        <input name="departmentId" placeholder="departmentId (ObjectId)" value={form.departmentId} onChange={onChange} /><br/>
        <input name="salary" placeholder="salary" value={form.salary} onChange={onChange} /><br/>
        <input type="file" onChange={onFile} /><br/>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
