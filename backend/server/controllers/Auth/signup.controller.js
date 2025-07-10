import bcrypt from "bcryptjs";
import { getUserByEmail, registerUser } from "../../services/user.service.js";

export const SignUp = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            department,
            designation,
            rollno,
            staffId,
            year,
            section,
        } = req.body;

        // Check required fields for all users
        if (!name || !email || !password || !department) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password, and department are required.",
            });
        }

        // Additional checks for STUDENT
        if (designation === "STUDENT") {
            if (!rollno || !year || !section) {
                return res.status(400).json({
                    success: false,
                    message:
                        "For STUDENT, rollno, year, and section are required.",
                });
            }
        }

        // Check for existing email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user data
        const userData = {
            name,
            email,
            password: hashedPassword,
            department,
            designation,
            ...(designation === "STUDENT" && { rollno, year, section }),
            ...(designation === "STAFF" && { staffId }),
        };

        // Create user via service
        const user = await registerUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                department: user.department,
                designation: user.designation,
                ...(designation === "STUDENT" && {
                    rollno: user.rollno,
                    year: user.year,
                    section: user.section,
                }),
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
