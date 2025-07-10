import { UserModel } from "../models/User.model.js"; // Adjust path as needed

// Register a new user
export async function registerUser(data) {
    const user = new UserModel(data);
    return await user.save();
}

// Find user by email
export async function getUserByEmail(email) {
    return await UserModel.findOne({ email });
}

// Find user by ID
export async function getUserById(userId) {
    return await UserModel.findById(userId);
}
