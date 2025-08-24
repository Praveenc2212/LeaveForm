import bcrypt from "bcryptjs";
import { GenerateJwtTokens } from "../../utils/GenerateJWT.util.js";
import { getFacultyByEmail } from "../../services/user.service.js";

export const FacultyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const faculty = await getFacultyByEmail(email);

        if (!faculty) {
            return res.status(401).json({
                success: false,
                message: "Invalid email.",
            });
        }

        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        // Generate JWT token and set it in cookies...
        GenerateJwtTokens(
            { id: faculty._id, designation: faculty.designation, department: faculty.department },
            res
        );
        
        res.status(200).json({
            success: true,
            message: "Login successful.",
            userData: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email,
                staffId: faculty.staffId,
                department: faculty.department,
                designation: faculty.designation,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};
