import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function EmployeeView() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    API.get(`/employee/${id}`).then(res => {
      if (res.data.success) setEmployee(res.data.employee);
    }).catch(console.error);
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  const u = employee.userId || {};
  return (
    <div style={{ maxWidth: 800 }}>
      <h2>Employee Details</h2>
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          {u.profileImage ? <img src={`http://localhost:5000/uploads/${u.profileImage}`} alt="" style={{ width: 160 }} /> : null}
        </div>
        <div>
          <h3>{u.name}</h3>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Employee Code:</b> {employee.employeeCode}</p>
          <p><b>DOB:</b> {employee.dob ? new Date(employee.dob).toLocaleDateString() : "-"}</p>
          <p><b>Gender:</b> {employee.gender}</p>
          <p><b>Department:</b> {employee.department?.name || "-"}</p>
          <p><b>Designation:</b> {employee.designation}</p>
          <p><b>Salary:</b> {employee.salary}</p>
        </div>
      </div>
    </div>
  );
}
