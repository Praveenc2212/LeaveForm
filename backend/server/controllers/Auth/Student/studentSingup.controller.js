
import bcrypt from "bcryptjs";
import { getStudentByEmail, createStudent ,getClassByDetails } from "../../../services/user.service.js";

export const StudentSignUp = async (req, res) => {
    try {
        const { name, email, password, rollno, department, year, section } =
            req.body;

        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !rollno ||
            !department ||
            !year ||
            !section
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check for existing student
        const existingStudent = await getStudentByEmail(email);
        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Email already in use.",
            });
        }

        // Find the class by department, year, section
        const studentClass = await getClassByDetails(department, year, section);
        if (!studentClass) {
            return res.status(404).json({
                success: false,
                message:
                    "Class not found for the provided department, year, and section.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Register student
        const student = await createStudent({
            name,
            email,
            password: hashedPassword,
            rollno,
            classId: studentClass._id,
        });

        res.status(201).json({
            success: true,
            message: "Student registered successfully.",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                rollno: student.rollno,
                classId: student.classId,
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
