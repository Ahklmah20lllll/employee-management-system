// routes/salary.js
import express from "express";
import {
  addSalary,
  getSalaryByEmployee,
  getAllSalaries,
  getSalaryByIdAndRole,
} from "../controllers/salaryController.js";
// Note: Auth middleware commented out for now - add back when needed
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Employee routes
router.post("/add", addSalary);

// Admin routes - MUST come before /:id to avoid route conflicts
// Admin route to get ALL salaries
router.get("/", getAllSalaries);
// Admin route to get salary by employee ID and role: /api/salary/:id/:role
router.get("/:id/:role", getSalaryByIdAndRole);

// Employee route to get their own salary: /api/salary/:id
router.get("/:id", getSalaryByEmployee);

export default router;
