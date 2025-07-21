export const Logout = (req, res) => {
    try {
        // Clear the cookie...
        res.cookie(process.env.JWT_TOKEN_NAME, "", { maxAge: 0 });

        // Send response...
        res.status(200).json({
            success: true,
            message: "Logout Successful...",
        });
    } catch (error) {
        console.log("Logout Error:", error);

        res.status(500).json({
            success: false,
            message: `Error: Logout Failed...`,
        });
    }
};
