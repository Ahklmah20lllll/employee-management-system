// routes/leave.js
import express from "express";
import {
  getAllLeaves,
  getLeaveByIdAndRole,
  addLeave,
  getLeavesByUser,
} from "../controllers/leaveController.js";
// Note: Auth middleware commented out for now - add back when needed
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Employee routes
router.post("/add", addLeave);

// Admin routes - MUST come before /:id to avoid route conflicts
// Admin route to fetch ALL leaves
router.get("/", getAllLeaves);
// Admin route to get leaves for specific employee: /api/leave/:employeeId/admin
router.get("/:id/admin", getLeaveByIdAndRole);

// Employee route to get their own leaves: /api/leave/:userId/employee
router.get("/:id/employee", getLeavesByUser);

// Employee route to get their own leaves (fallback): /api/leave/:userId
router.get("/:id", getLeavesByUser);

export default router;
