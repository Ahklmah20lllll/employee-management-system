import express from "express";
import upload from "../middlewares/upload.js";
import {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  getEmployeesByDepartment
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createEmployee);
router.get("/list", listEmployees);
router.get("/department/:id", getEmployeesByDepartment);
router.get("/:id", getEmployee);
router.put("/update/:id", upload.single("image"), updateEmployee);

export default router;
