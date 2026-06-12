
import express from "express";
import { Logout } from "../controllers/Auth/logout.controller.js";
import { AuthenticatedData } from "../controllers/Auth/authenticatedData.controller.js";

import { checkAuthentication } from "../Middleware/checkAuthentication.Middleware.js";
import { LoginController } from "../controllers/Auth/login.controller.js";

const router = express.Router();

// Checking Authentication...
router.get("/checkAuthenticated", checkAuthentication , AuthenticatedData );

// Route to handle login...
router.post("/login", LoginController);

// Route to handle user logout...
router.post("/logout", Logout);

export default router;
