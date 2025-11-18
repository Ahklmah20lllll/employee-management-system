import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const ViewSalary = () => {
  const { id } = useParams();
  const [salaries, setSalaries] = useState(null);
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    fetchSalary();
  }, []);

  const fetchSalary = async () => {
    const res = await api.get(`/salary/${id}`);
    setSalaries(res.data.salaries);
    setFiltered(res.data.salaries);
  };

  if (!filtered) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Salary History</h2>

      {filtered.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee ID</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Total</th>
              <th>Pay Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.employeeID.employeeID}</td>
                <td>{s.basicSalary}</td>
                <td>{s.allowances}</td>
                <td>{s.deductions}</td>
                <td>{s.netSalary}</td>
                <td>{new Date(s.payDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No Records Found</h3>
      )}
    </div>
  );
};

export default ViewSalary;
