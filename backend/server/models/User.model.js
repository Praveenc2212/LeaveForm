import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 8,
        required: true,
    },
    designation: {
        type: String,
        enum: ["STUDENT", "STAFF", "HOD", "WARDEN", "ADMIN"],
        default: "STUDENT",
    },
});

export const UserModel = mongoose.model("User", UserSchema);
