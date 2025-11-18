import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeButtons({ id, onNavigate }) {
  const nav = onNavigate || useNavigate();
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button onClick={() => nav(`/employees/view/${id}`)}>View</button>
      <button onClick={() => nav(`/employees/edit/${id}`)}>Edit</button>
    </div>
  );
}
