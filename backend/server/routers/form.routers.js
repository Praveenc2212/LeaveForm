import express from "express";
import { applyForm } from "../controllers/LeaveForm/applyForm.controller.js";
import { facultyFormResponse } from "../controllers/LeaveForm/facultyResponse.controller.js";

const router = express.Router();

// Create a new leave form (student applies)
router.post("/student/apply", applyForm);

router.post("/faculty/response", facultyFormResponse);

export default router;