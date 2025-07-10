import express from "express";
import { Login } from "../controllers/Auth/login.controller.js";
import { SignUp } from "../controllers/Auth/signup.controller.js";
import { LogOut } from "../controllers/Auth/logout.controller.js";

const router = express.Router();

// Temporary route for testing purposes...
router.post("/signup", SignUp);

// Route to handle user login...
router.post("/login", Login);

// Route to handle user logout...
router.post("/logout", LogOut);


export default router;
