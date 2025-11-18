import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import EmployeeAdd from "./pages/EmployeeAdd";
import EmployeeView from "./pages/EmployeeView";
import EmployeeEdit from "./pages/EmployeeEdit";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 12 }}>
        <nav style={{ marginBottom: 12 }}>
          <Link to="/employees">Employees</Link> | <Link to="/employees/add">Add Employee</Link>
        </nav>
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<EmployeeAdd />} />
          <Route path="/employees/view/:id" element={<EmployeeView />} />
          <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
          <Route path="/" element={<EmployeeList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
