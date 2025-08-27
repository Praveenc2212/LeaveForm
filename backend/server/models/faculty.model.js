import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
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
    facultySignature : {
        type: String,
        default : ""
    },
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
        enum: ["STAFF", "HOD", "ADMIN"],
    },
});

export const FacultyModel = mongoose.model("Faculty", FacultySchema);