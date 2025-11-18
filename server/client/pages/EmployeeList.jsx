import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import API from "../api";
import { useNavigate } from "react-router-dom";
import EmployeeButtons from "../components/EmployeeButtons";

export default function EmployeeList() {
  const nav = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await API.get("/employee/list");
    if (res.data?.success) {
      setEmployees(res.data.employees);
      setFiltered(res.data.employees);
    }
  };

  useEffect(() => {
    if (!q) return setFiltered(employees);
    const r = employees.filter(e => {
      const name = e.userId?.name || "";
      return name.toLowerCase().includes(q.toLowerCase());
    });
    setFiltered(r);
  }, [q, employees]);

  const columns = [
    { name: "#", selector: (row, i) => i + 1, width: "60px" },
    {
      name: "Image", selector: row => row.userId?.profileImage ? <img src={`http://localhost:5000/uploads/${row.userId.profileImage}`} alt="" style={{ width:40, borderRadius:20 }} /> : "-", width: "80px"
    },
    { name: "Name", selector: row => row.userId?.name || "-", sortable: true },
    { name: "DOB", selector: row => row.dob ? new Date(row.dob).toLocaleDateString() : "-", sortable: true },
    { name: "Department", selector: row => row.department?.name || "-", sortable: true },
    { name: "Designation", selector: row => row.designation || "-" },
    { name: "Salary", selector: row => row.salary || "-" },
    { name: "Actions", cell: row => <EmployeeButtons id={row._id} onNavigate={nav} />, center: true }
  ];

  return (
    <div>
      <h2>Employees</h2>
      <div style={{ marginBottom: 8 }}>
        <input placeholder="Search by name..." value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={()=>nav("/employees/add")} style={{ marginLeft: 8 }}>Add New</button>
      </div>
      <DataTable columns={columns} data={filtered || employees} pagination />
    </div>
  );
}
