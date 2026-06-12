import jwt from "jsonwebtoken";

export const checkAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies[process.env.JWT_TOKEN_NAME]; //JWT_TOKEN_NAME
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token missing.",
            });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!data) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid token." });
        }
        req.user = data;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
};
