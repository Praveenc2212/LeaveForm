import { UserModel } from "../../models/User.model.js";
import bcrypt from "bcryptjs";
import { GenerateJwtTokens } from "../../utils/GenerateJWT.util.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await UserModel.findOne({ email });
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

        

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                designation: user.designation,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};
