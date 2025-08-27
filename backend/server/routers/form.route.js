import express from "express";
import { applyLeaveForm } from "../controllers/LeaveForm/Student/applyForm.controller.js";
import { studentLeaveStatus } from "../controllers/LeaveForm/Student/studentLeaveStatus.controller.js";
import { checkAuthentication } from "../Middleware/checkAuthentication.Middleware.js";
import { studentLeaveForms } from "../controllers/LeaveForm/Student/studentLeaveForms.controller.js";
import { RetrieveStaffForms } from "../controllers/LeaveForm/Staff/RetrieveStaffForms.controller.js";
import {
    acceptLeaveByStaff,
    discussLeaveByStaff,
    rejectLeaveByStaff,
} from "../controllers/LeaveForm/Staff/staffConfirmation.controller.js";
import {
    acceptLeaveByHod,
    rejectLeaveByHod,
} from "../controllers/LeaveForm/Hod/HodConfirmation.controller.js";

import { RetrieveHodForms } from "../controllers/LeaveForm/Hod/RetrieveHodForms.controller.js";
// import {RetrieveStaffForms } from "../controllers/LeaveForm/Hod/RetrieveHodForms.controller.js"

import { acceptAllLeavesForms } from "../controllers/LeaveForm/AcceptAllLeaveForms.controller.js";

const router = express.Router();

// STUDENT Routes...
// Create a new leave form (student applies)
router.post("/student/apply-leave-form", checkAuthentication, applyLeaveForm);

// Get the status of the applied leave form (student)
router.get("/student/leave-status", checkAuthentication, studentLeaveStatus);

// Get all leave forms applied by the student
router.get("/student/leave-forms", checkAuthentication, studentLeaveForms);

//  STAFF Routes...
// Get Pending LeaveForms For Staff
router.get("/staff/leave-pending-forms", checkAuthentication, (req, res) => {
    RetrieveStaffForms(req, res, "Pending");
});

// Get Reviewed LeaveForms For Staff
router.get("/staff/leave-reviewed-forms", checkAuthentication, (req, res) => {
    RetrieveStaffForms(req, res, "Reviewed");
});

// Get Approved LeaveForms For Staff
router.get("/staff/leave-approved-forms", checkAuthentication, (req, res) => {
    RetrieveStaffForms(req, res, "Approved");
});

// Staff Acceptance..
router.post("/staff/accept/:formId", checkAuthentication, acceptLeaveByStaff);

// Staff Rejection...
router.post("/staff/reject/:formId", checkAuthentication, rejectLeaveByStaff);

// staff Discussion...
router.post("/staff/discuss/:formId", checkAuthentication, discussLeaveByStaff);

// Staff Oprations...
router.post("/staff/accept-all", checkAuthentication, acceptAllLeavesForms);

// // HOD Oprations...
router.post("/hod/accept/:formId",checkAuthentication, acceptLeaveByHod);
router.post("/hod/reject/:formId",checkAuthentication, rejectLeaveByHod);
router.get("/hod/leave-pending-forms", checkAuthentication, (req, res) => {
    RetrieveHodForms(req, res, "Reviewed");
});
router.get("/hod/leave-approved-forms", checkAuthentication, (req, res) => {
    RetrieveHodForms(req, res, "Approved");
});

// router.post("/hod/discuss/:formId", discussLeaveByHOD);
router.post("/hod/accept-all", checkAuthentication, acceptAllLeavesForms);


export default router;