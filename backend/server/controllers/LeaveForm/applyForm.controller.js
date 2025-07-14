
import { createLeaveForm } from "../../services/form.service.js";

export const applyLeaveForm = async (req, res) => {
    try {
        const { applicantId, classId, startDate, endDate, reason } = req.body;

        if (!applicantId || !classId || !startDate || !endDate || !reason) {
            return res.status(400).json({
                success: false,
                message: "All fields (applicantId, classId, startDate, endDate, reason) are required.",
            });
        }

        await createLeaveForm({
            applicantId,
            classId,
            startDate,
            endDate,
            reason,
            status: "Pending",
        });
        
        return res.status(201).json({
            success: true,
            message: "Leave form submitted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to apply for leave.",
            error: error.message,
        });
    }
};