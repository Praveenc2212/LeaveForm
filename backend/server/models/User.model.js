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
    rollno: {
        type: String,
        required: function () {
            return this.designation === "STUDENT";
        },
    },
    staffId: {
        type: String,
        required: function () {
            return this.designation === "STAFF";
        },
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        enum: ["I", "II", "III", "IV"],
        required: function () {
            return this.designation === "STUDENT";
        },
    },
    section: {
        type: String,
        required: function () {
            return this.designation === "STUDENT";
        },
    },
    designation: {
        type: String,
        enum: ["STUDENT", "STAFF", "HOD", "WARDEN", "ADMIN"],
        default: "STUDENT",
    },
});

export const UserModel = mongoose.model("User", UserSchema);
