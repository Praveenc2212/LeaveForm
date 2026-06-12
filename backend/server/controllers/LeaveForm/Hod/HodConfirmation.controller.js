import { updateLeaveFormStatus } from "../../../services/form.service.js";
import sendMail from "../../../services/EmailService/sendEmail.js";
export const acceptLeaveByHod = async (req, res) => {
    try {
        const { formId } = req.params;

        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Form.",
            });
        }

        // const data = 
        await updateLeaveFormStatus(formId, "Approved");

        // const subject = "Leave Application Approved by HOD";
        // const message = `
        //     Hello ${data.applicantId.name},

        //     Your leave application has been APPROVED by the HOD.

        //     📅 From: ${data.startDate.toDateString()}
        //     📅 To: ${data.endDate.toDateString()}

        //     Status: APPROVED ✅

        //     Regards,
        //     College Management
        //             `;
        // await sendMail(data.applicantId.email, subject, message);
        return res.status(200).json({
            success: true,
            message: "Leave form accepted successfully.",
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
        const data = await updateLeaveFormStatus(formId, "Hod Rejected");

        // Logic to push the forms to the Archived...

        sendMail(
            data.applicantId.email,
            "Leave Application Rejected by HOD",
            `
                    Hello ${data.applicantId.name},

                    Your leave application has been REJECTED by the HOD.

                    📅 From: ${data.startDate.toDateString()}
                    📅 To: ${data.endDate.toDateString()}

                    Status: REJECTED ❌

                    If you have any questions or need clarification,
                    please contact your department office.

                    Regards,
                    College Management
                        `
        );
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
