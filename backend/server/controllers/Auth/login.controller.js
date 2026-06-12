import { FacultyLogin } from "./facultyLogin.controller.js";
import { StudentLogin } from "./studentLogin.controller.js";

export const LoginController = async (req, res) => {
    // Based on the Email what to Connec the Controller...
    const { email, password } = req.body;

   // Validate user credentials
   if (!email || !password) {
       return res.status(400).json({ message: "Email and password are required." });
   }

   try {
       if(email.startsWith("7178"))
            StudentLogin(req, res);
       else 
            FacultyLogin(req, res);
   } catch (error) {
       console.error("Login error:", error);
       res.status(500).json({ message: "Internal server error." });
   }
};
