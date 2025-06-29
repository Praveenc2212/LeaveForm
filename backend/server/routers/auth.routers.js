import express from "express";
import { Login } from "../controllers/Auth/login.controller.js";
import { SignUp } from "../controllers/Auth/signup.controller.js";

const router = express.Router();

router.get("/login", Login);
router.get("/signup", SignUp);

export default router;
