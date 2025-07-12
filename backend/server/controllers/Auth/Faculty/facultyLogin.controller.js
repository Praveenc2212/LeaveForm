import bcrypt from "bcryptjs";
import { GenerateJwtTokens } from "../../../utils/GenerateJWT.util.js";
import { getFacultyByEmail } from "../../../services/user.service.js";
import { getFormsByTutor } from "../../../services/form.service.js";

export const FacultyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await getFacultyByEmail(email);

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
        GenerateJwtTokens({ userId: user._id, designation: user.designation }, res);

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
    } catch (err) {
        console.error("Login error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};
