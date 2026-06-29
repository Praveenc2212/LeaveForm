import express from "express";
import { checkAuthentication } from "../Middleware/checkAuthentication.Middleware.js";
import { scanQrCode, getActiveGatePasses, getTodaysHistory } from "../controllers/Security/gate.controller.js";

const router = express.Router();

// Route to process a scanned QR code (check-in / check-out)
router.post("/scan", checkAuthentication, scanQrCode);

// Route to get all currently checked-out passes
router.get("/active-passes", checkAuthentication, getActiveGatePasses);

// Route to get today's completed and active passes
router.get("/todays-history", checkAuthentication, getTodaysHistory);

export default router;
