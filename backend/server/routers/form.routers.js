import express from "express";
import { applyLeaveForm } from "../controllers/LeaveForm/applyForm.controller.js";
import { facultyFormResponse } from "../controllers/LeaveForm/facultyResponse.controller.js";

const router = express.Router();

// Create a new leave form (student applies)
router.post("/student/apply-leave", applyLeaveForm);

router.post("/faculty/response", facultyFormResponse);

export default router;