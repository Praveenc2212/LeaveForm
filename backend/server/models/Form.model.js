    import mongoose from "mongoose";

    const FormSchema = new mongoose.Schema({
        fullname: {
            type: String,
            required: true,
        },
        rollno: {
            type: String,
            required: true,
        },
        studentPhoneNo: {
            type: String,
            required: true,
        },
        parantPhoneNo: {
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
            enum: ["Pending", "Approved", "Rejected"],
        },
        appliedAt: { type: Date, default: Date.now },
    });

    export const FormModel = mongoose.model("Form", FormSchema);
