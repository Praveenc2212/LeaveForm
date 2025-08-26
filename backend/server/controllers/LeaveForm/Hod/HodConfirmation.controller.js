
import { updateLeaveFormStatus } from "../../../services/form.service.js";
export const acceptLeaveByHod = async (req, res) => {
    try {
        const { formId } = req.params;

        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Form.",
            });
        }

        const data = await updateLeaveFormStatus(formId, "Approved");

        return res.status(200).json({
            success: true,
            message: "Leave form accepted successfully.",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Operation failed. Please try again.",
            error: error.message,
        });
    }
};
export const rejectLeaveByHod = async (req, res) => {
    try {
        const { formId } = req.params;

        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Form.",
            });
        }
        await updateLeaveFormStatus(formId, "Hod Rejected");

        // Logic to push the forms to the Archived...

        return res.status(200).json({
            success: true,
            message: "Leave form rejected successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Operation failed. Please try again.",
            error: error.message,
        });
    }
};
