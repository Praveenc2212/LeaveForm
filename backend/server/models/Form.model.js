import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
        enum: ["I", "II", "III", "IV"],
    },
    section: {
        type: String,
        required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        default: "Pending",
        enum: [
            "Pending",
            "Tutor Approved",
            "HOD Approved",
            "Tutor Rejected",
            "HOD Rejected",
        ],
    },
    appliedAt: { type: Date, default: Date.now },
});

FormSchema.index({ tutor: 1, status: 1 });
FormSchema.index({ applicant: 1 });
FormSchema.index({ status: 1 });

export const FormModel = mongoose.model("Form", FormSchema);
