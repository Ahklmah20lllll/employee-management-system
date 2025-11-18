import { useState } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
  const [depName, setDepName] = useState("");
  const [depHead, setDepHead] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/departments", { depName, depHead });
      navigate("/admin/departments");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Department</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Name</label>
          <input
            className="border p-2 w-full"
            value={depName}
            onChange={e => setDepName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Head</label>
          <input
            className="border p-2 w-full"
            value={depHead}
            onChange={e => setDepHead(e.target.value)}
            required
          />
        </div>

        <button className="px-4 py-2 bg-teal-600 text-white rounded">
          Save
        </button>

      </form>
    </div>
  );
}

export default AddDepartment;
