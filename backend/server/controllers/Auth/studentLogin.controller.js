import bcrypt from "bcryptjs";
import { GenerateJwtTokens } from "../../utils/GenerateJWT.util.js";
import { getStudentByEmail } from "../../services/user.service.js";

export const StudentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const student = await getStudentByEmail(email);

        if (!student) {
            return res.status(401).json({
                success: false,
                message: "Invalid email.",
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        // Generate JWT token and set it in cookies...
        GenerateJwtTokens({ id: student._id, designation: "STUDENT" }, res);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            userData: {
                id: student._id,
                name: student.name,
                email: student.email,
                rollno: student.rollno,
                gender: student.gender,
                classId: student.classId._id,
                department: student.classId.department,
                year: student.classId.year,
                section: student.classId.section,
                designation: "STUDENT",
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};
