import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    API.get(`/employee/${id}`).then(res => {
      if (res.data.success) {
        setEmployee(res.data.employee);
        const emp = res.data.employee;
        setForm({
          name: emp.userId?.name || "",
          email: emp.userId?.email || "",
          employeeCode: emp.employeeCode || "",
          dob: emp.dob ? emp.dob.split("T")[0] : "",
          gender: emp.gender || "",
          maritalStatus: emp.maritalStatus || "",
          designation: emp.designation || "",
          departmentId: emp.department?._id || "",
          salary: emp.salary || ""
        });
      }
    }).catch(console.error);
  }, [id]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onFile = e => setFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (file) fd.append("image", file);

    try {
      const res = await API.put(`/employee/update/${id}`, fd, { headers: { "Content-Type":"multipart/form-data" }});
      if (res.data.success) {
        alert("Updated");
        nav("/employees");
      }
    } catch(err) { console.error(err); alert("Error"); }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Edit Employee</h2>
      <form onSubmit={submit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" /><br/>
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" /><br/>
        <input name="employeeCode" value={form.employeeCode} onChange={onChange} placeholder="Employee Code" /><br/>
        <input name="dob" type="date" value={form.dob} onChange={onChange} /><br/>
        <input name="gender" value={form.gender} onChange={onChange} /><br/>
        <input name="maritalStatus" value={form.maritalStatus} onChange={onChange} /><br/>
        <input name="designation" value={form.designation} onChange={onChange} /><br/>
        <input name="departmentId" value={form.departmentId} onChange={onChange} placeholder="DepartmentId (ObjectId)" /><br/>
        <input name="salary" value={form.salary} onChange={onChange} /><br/>
        <input type="file" onChange={onFile} /><br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
