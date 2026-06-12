import { createLeaveForm } from "../../../services/form.service.js";

// For Student to apply for a leave form...
export const applyLeaveForm = async (req, res) => {
    if (req.user.designation !== "STUDENT") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const { classId, startDate, endDate, reason } = req.body;

        if (!classId || !startDate || !endDate || !reason) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields (classId, startDate, endDate, reason) are required.",
            });
        }

        await createLeaveForm({
            applicantId: req.user.id,
            classId,
            startDate,
            endDate,
            reason,
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
