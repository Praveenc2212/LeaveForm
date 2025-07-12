
import express from "express";
import { Logout } from "../controllers/Auth/logout.controller.js";
import { StudentLogin } from "../controllers/Auth/Student/studentLogin.controller.js";
import { FacultyLogin } from "../controllers/Auth/Faculty/facultyLogin.controller.js";
import { StudentSignUp } from "../controllers/Auth/Student/studentSingup.controller.js";
import { FacultySignUp } from "../controllers/Auth/Faculty/facultySingup.controller.js";
import { createClass } from "../controllers/Auth/class.controller.js";
import { checkAuthentication } from "../Middleware/UserAuthentication.Middleware.js";

const router = express.Router();

// Temporary route for testing purposes...
router.post("/admin/student/signup", StudentSignUp);
router.post("/admin/faculty/signup", FacultySignUp);
router.post("/admin/class", createClass);

// Checking Authentication...
router.get("/checkAuthenticated", checkAuthentication);
// Route to handle Student login...
router.post("/student/login", StudentLogin);

// Route to handle Faculty login...
router.post("/faculty/login", FacultyLogin);

// Route to handle user logout...
router.post("/logout", Logout);

export default router;
