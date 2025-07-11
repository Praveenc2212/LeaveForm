import mongoose from "mongoose";

export const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    staffId: {
        type: String,
        required: true,
        unique: true,
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
    designation: {
        type: String,
        required: true,
        enum: ["Staff", "HOD"],
    },
});

export const FacultyModel = mongoose.model("Faculty", FacultySchema);