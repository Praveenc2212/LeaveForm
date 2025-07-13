import mongoose from "mongoose";

export const ClassSchema = new mongoose.Schema({
    tutorIds: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    }],
    department: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
});

export const ClassModel = mongoose.model("Class", ClassSchema);
