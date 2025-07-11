import express from "express";

const router = express.Router();

// Create a new leave form (student applies)
router.post("/apply", applyForm);

// Get all forms for a specific class (for tutors/HODs)
router.get("/class/:classId/forms", getFormsByClass);

// Get all forms for a specific student
router.get("/student/:studentId/forms", getFormsByStudent);

// Update status of a form (approve/reject by tutor or HOD)
router.patch("/form/:id/status", updateFormStatus);

export default router;