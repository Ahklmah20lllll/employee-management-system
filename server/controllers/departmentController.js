import Department from "../model/Department.js";

// ✅ CREATE
export const createDepartment = async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ READ ALL
export const getDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.json(depts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ READ ONE
export const getDepartment = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    res.json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
export const updateDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
