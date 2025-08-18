
import express from "express";
import { Logout } from "../controllers/Auth/logout.controller.js";
import { createClassController } from "../controllers/Admin/manageClass.controller.js";
import { AuthenticatedData } from "../controllers/Auth/authenticatedData.controller.js";

import { checkAuthentication } from "../Middleware/checkAuthentication.Middleware.js";
import { LoginController } from "../controllers/Auth/login.controller.js";
import { createMultipleFacultyController } from "../controllers/Admin/faculty/createMultipleFaculty.controller.js";
import { createMultipleStudentController } from "../controllers/Admin/student/createMultipleStudent.controller.js";
import { updateFacultyController } from "../controllers/Admin/faculty/updateFaculty.controller.js";
import { getStudentController } from "../controllers/Admin/student/getStudent.controller.js";

const router = express.Router();

// Admin Create Routes...
router.post("/admin/student/create-multiple-student", createMultipleStudentController);
router.post("/admin/faculty/create-multiple-faculty", createMultipleFacultyController);
router.post("/admin/create-class", createClassController);

// Read Operations...
router.get("/admin/student/get-student/by/:action", checkAuthentication, getStudentController);
// router.get("/admin/faculty/get-faculty", checkAuthentication, getFacultyController);

// Admin Update Operations...
// router.get("/admin/student/update-student", checkAuthentication, updateStudentController);
router.get("/admin/faculty/update-faculty", checkAuthentication, updateFacultyController);

// Checking Authentication...
router.get("/checkAuthenticated", checkAuthentication , AuthenticatedData );

// Route to handle login...
router.post("/login", LoginController);

// Route to handle user logout...
router.post("/logout", Logout);

export default router;
