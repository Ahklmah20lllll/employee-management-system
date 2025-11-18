import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function EditDepartment() {
  const { id } = useParams();

  const [depName, setDepName] = useState("");
  const [depHead, setDepHead] = useState("");

  const navigate = useNavigate();

  const getDepartment = async () => {
    try {
      const res = await api.get(`/departments/${id}`);
      setDepName(res.data.depName);
      setDepHead(res.data.depHead);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await api.put(`/departments/${id}`, { depName, depHead });
      navigate("/admin/departments");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <h1 className="text-xl font-bold mb-4">Edit Department</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

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
          Update
        </button>

      </form>

    </div>
  );
}

export default EditDepartment;
