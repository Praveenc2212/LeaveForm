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
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
        enum: [ "TUTOR" ,"STAFF", "HOD", "ADMIN" , "PRINCIPLE" , "SECURITY"],
    },
});

export const FacultyModel = mongoose.model("Faculty", FacultySchema);
