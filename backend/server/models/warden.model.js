import mongoose from "mongoose";

const WardenSchema = new mongoose.Schema({
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
    year: {
        type: String,
        required: true,
        enum: ["I", "II", "III", "IV"],
    },
});

export const WardenModel = mongoose.model("Warden", WardenSchema);
