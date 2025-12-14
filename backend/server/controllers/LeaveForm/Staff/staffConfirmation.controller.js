import { updateLeaveFormStatus } from "../../../services/form.service.js"; 

import sendMail from "../../../services/EmailService/sendEmail.js";
export const acceptLeaveByStaff = async (req, res) => {
    try {
        const { formId } = req.params;

        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Form.",
            });
        }

        const data = await updateLeaveFormStatus(formId, "Reviewed");
                    sendMail(
                data.applicantId.email,
                "Leave Application Accepted by Tutor",
                `
            Hello ${data.applicantId.name},

            Your leave application has been Accepted by the Tutor.

            📅 From: ${data.startDate.toDateString()}
            📅 To: ${data.endDate.toDateString()}

            Status: Accepted

            Regards,
            College Management
                `
            );
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

export const rejectLeaveByStaff = async (req, res) => {
    try {
        const { formId } = req.params;

        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Form.",
            });
        }

        const data = await updateLeaveFormStatus(formId, "Tutor Rejected");


                            sendMail(
                        data.applicantId.email,
                        "Leave Application Rejected by Tutor",
                        `
                    Hello ${data.applicantId.name},

                    Your leave application has been REJECTED by the Tutor.

                    📅 From: ${data.startDate.toDateString()}
                    📅 To: ${data.endDate.toDateString()}

                    Status: REJECTED ❌

                    If you have any questions or need clarification,
                    please contact your department office.

                    Regards,
                    College Management
                        `
                    );


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

export const discussLeaveByStaff = async (req, res) => {
    try {
        const { formId } = req.params;

        if (!formId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Form.",
            });
        }

        // Logic to Send Notification to the student for discussion About the Leave...

        return res.status(200).json({
            success: true,
            message: "Leave form discussion initiated successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Operation failed. Please try again.",
            error: error.message,
        });
    }
};
