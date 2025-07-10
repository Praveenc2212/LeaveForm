import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.model.js"; // Adjust path if needed

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.Leave_Form_JWT_Token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token not provided.",
            });
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found." });
        }
        req.user = user; // Attach user info to req
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error("User Authentication Error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
};
