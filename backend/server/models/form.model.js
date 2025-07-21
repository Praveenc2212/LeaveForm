import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
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
            "Reviewed",
            "Approved",
            "Tutor Rejected",
            "HOD Rejected",
        ],
    },
    appliedAt: { type: Date, default: Date.now },
});

FormSchema.index({ applicantId: 1 });
FormSchema.index({ classId: 1 , status: 1 });
FormSchema.index({ status: 1 });

export const FormModel = mongoose.model("Form", FormSchema);
