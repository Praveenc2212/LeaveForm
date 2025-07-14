import jwt from "jsonwebtoken";
import { StudentModel } from "../models/student.model.js";
import { FacultyModel } from "../models/faculty.model.js";
import {
    getFormsByApplicant,
    getFormsByTutor,
} from "../services/form.service.js";

export const checkAuthentication = async (req, res) => {
    try {
        const token = req.cookies[process.env.JWT_TOKEN_NAME]; //JWT_TOKEN_NAME
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token missing.",
            });
        }

        console.log("Token:", token);
        

        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!data) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid token." });
        }

        if (data.designation === "STUDENT") {
            const user = await StudentModel.findById(data.userId);
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    rollno: user.rollno,
                    department: user.classId.department,
                    year: user.classId.year,
                    section: user.classId.section,
                },
                leaveData: await getFormsByApplicant(user._id),
            });
        } else {
            const user = await FacultyModel.findById(data.userId);
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    staffId: user.staffId,
                    department: user.department,
                    designation: user.designation,
                },
                leaveData: await getFormsByTutor(user._id),
            });
        }
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
};
