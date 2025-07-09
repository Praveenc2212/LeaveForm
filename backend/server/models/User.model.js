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
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,       
        required: true,
        unique: true,
    },
    year: {
        type: String,
        enum: ["I", "II", "III", "IV"],
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        enum: ["STUDENT", "STAFF", "HOD", "WARDEN", "ADMIN"],
        default: "STUDENT",
    },
});

export const UserModel = mongoose.model("User", UserSchema);
