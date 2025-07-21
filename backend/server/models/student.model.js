import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["MALE", "FEMALE"],
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
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
});

export const StudentModel = mongoose.model("Student", StudentSchema);
