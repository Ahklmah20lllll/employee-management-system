// routes/dashboard.js
import express from "express";
import { getSummary } from "../controllers/dashboardController.js";
// Note: For now, making it unprotected. Add auth middleware later if needed
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/dashboard/summary
router.get("/summary", getSummary);

export default router;
