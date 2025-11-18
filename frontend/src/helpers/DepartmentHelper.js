// DepartmentHelper.js
import api from "../utils/api.jsx";

export const handleDeleteDepartment = async (id, onDepartmentDelete) => {
  try {
    await api.delete(`/departments/${id}`);
    if (onDepartmentDelete) {
      onDepartmentDelete(); // reload updated department list
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};
