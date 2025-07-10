import bcrypt from "bcryptjs";
import { GenerateJwtTokens } from "../../utils/GenerateJWT.util.js";
import { getUserByEmail } from "../../services/user.service.js";
import { getFormsByApplicant } from "../../services/form.service.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Generate JWT token and set it in cookies...
        GenerateJwtTokens(user._id, res);

        switch (user.designation) {
            case "STUDENT":
                res.status(200).json({
                    success: true,
                    message: "Login successful.",
                    userData: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        rollno: user.rollno,
                        department: user.department,
                        year: user.year,
                        section: user.section,
                        designation: user.designation,
                    },
                    leaveData: await getFormsByApplicant(user._id),
                });
                break;
            case "STAFF":
                user.designation = "Staff";
                break;
            case "HOD":
                user.designation = "HOD";
                break;
            default:
                res.status(400).json({
                    success: false,
                    message: "Invalid designation.",
                });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
        });
    } catch (err) {
        console.error("Login error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};
