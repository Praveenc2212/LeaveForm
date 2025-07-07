import express from "express";
import { Login } from "../controllers/Auth/login.controller.js";
import { SignUp } from "../controllers/Auth/signup.controller.js";
import { LoginOut } from "../controllers/Auth/logout.controller.js";

const router = express.Router();

// Temporary route for testing purposes...
router.get("/signup", SignUp);

// Route to handle user login...
router.get("/login", Login);

// Route to handle user logout...
router.get("/logout", LoginOut)


export default router;
