import express from "express";

import { createMultipleFacultyController } from "../controllers/Admin/faculty/createMultipleFaculty.controller.js";
import { createMultipleStudentController } from "../controllers/Admin/student/createMultipleStudent.controller.js";
import { updateFacultyController } from "../controllers/Admin/faculty/updateFaculty.controller.js";
import { getStudentController } from "../controllers/Admin/student/getStudent.controller.js";
import { createClassController } from "../controllers/Admin/manageClass.controller.js";

import { checkAuthentication } from "../Middleware/checkAuthentication.Middleware.js";
import { updateFacultySignature } from "../controllers/Admin/faculty/updateFacultySignature.controller.js";

import { upload } from "../utils/uploadFile.util.js";
const router = express.Router();

// Admin Create Routes...
router.post("/student/create-multiple-student", createMultipleStudentController);
router.post("/faculty/create-multiple-faculty", createMultipleFacultyController);
router.post("/create-class", createClassController);

// Read Operations...
router.get("/student/get-student/by/:action", checkAuthentication, getStudentController);
// router.get("/admin/faculty/get-faculty", checkAuthentication, getFacultyController);

// Admin Update Operations...
// router.get("/admin/student/update-student", checkAuthentication, updateStudentController);
router.get("/faculty/update-faculty", checkAuthentication, updateFacultyController);

// get signature of faculties...
router.post("/faculty/signature/", upload.single("facultySignature") , updateFacultySignature);


export default router;