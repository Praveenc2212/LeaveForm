import bcrypt from "bcryptjs";
import {
    getFacultyByEmail,
    createFaculty,
} from "../../../services/user.service.js";

export const FacultySignUp = async (req, res) => {
    try {
        const { name, email, password, staffId, designation, department } = req.body;

        // Check for minimal required fields
        if (!name || !email || !password || !staffId || !designation && !department) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password, staffId, designation, and department are required.",
            });
        }

        // Check for existing faculty
        const existingFaculty = await getFacultyByEmail(email);
        if (existingFaculty) {
            return res.status(409).json({
                success: false,
                message: "Email already in use.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Register faculty (with or without classId)
        const faculty = await createFaculty({
            name,
            email,
            password: hashedPassword,
            staffId,
            department,
            designation,
        });

        res.status(201).json({
            success: true,
            message: "Faculty registered successfully.",
            faculty: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email,
                staffId: faculty.staffId,
                department: faculty.department,
                designation: faculty.designation,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed.",
            error: error.message,
        });
    }
};