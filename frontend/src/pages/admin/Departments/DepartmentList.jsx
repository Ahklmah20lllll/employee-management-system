import { Link } from "react-router-dom";

function DepartmentList() {
  const departments = [
    { id: 1, name: "HR", head: "John" },
    { id: 2, name: "IT", head: "Michael" },
  ];

  return (
    <div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Departments</h1>
        <Link to="/admin/departments/add" className="px-4 py-2 bg-teal-600 text-white rounded">
          Add Department
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Head</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((d) => (
            <tr key={d.id}>
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border">{d.head}</td>
              <td className="p-2 border">
                <Link to={`/admin/departments/edit/${d.id}`} className="text-blue-600">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default DepartmentList;
