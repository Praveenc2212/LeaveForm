import { UserModel } from "../../models/User.model.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
    try {
        const { name, email, password, designation } = req.body;

        if (!name || !email || !password || !designation) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password, and designation are required.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            designation: designation.toUpperCase(),
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                designation: newUser.designation,
            },
        });
    } catch (err) {
        console.error("Signup error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};
