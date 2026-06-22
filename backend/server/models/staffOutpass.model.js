import mongoose from "mongoose";

const StaffOutpassSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Approved", "Rejected"],
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

StaffOutpassSchema.index({ staffId: 1 });
StaffOutpassSchema.index({ status: 1 });

export const StaffOutpassModel = mongoose.model("StaffOutpass", StaffOutpassSchema);
