
import jwt from "jsonwebtoken";
import { StudentModel } from "../models/student.model.js";
import { FacultyModel } from "../models/faculty.model.js";

// Middleware to authenticate student or faculty
export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies[process.env.JWT_TOKEN_NAME];
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication token missing." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded || !decoded.userId || !decoded.role) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        let user;
        if (decoded.role === "student") {
            user = await StudentModel.findById(decoded.userId).select("-password");
        } else if (decoded.role === "faculty") {
            user = await FacultyModel.findById(decoded.userId).select("-password");
        } else {
            return res.status(401).json({ success: false, message: "Invalid user role in token." });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        req.user = user; // Attach user to request
        req.userRole = decoded.role;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};