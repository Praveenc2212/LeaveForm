export const LoginOut = (req, res) => {
    try {
        // Clear the cookie...
        res.clearCookie("Leave_Form_JWT_Token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.STATUS != 'development',
        });

        // Send response...
        res.status(200).json({
            success: true,
            message: "Logout Successful...",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error: Logout Failed... :- ${error.message}`,
        });
    }
}