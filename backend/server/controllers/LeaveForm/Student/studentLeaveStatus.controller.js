import { getRecentAppliedStudentForm } from "../../../services/form.service.js";

export const studentLeaveStatus = async (req, res) => {
    try {
        if (req.user.designation !== "STUDENT") {
            return res.status(403).json({ message: "Forbidden" });
        }
        const studentId = req.user.id;
        const form = await getRecentAppliedStudentForm(studentId);

        // If no form found, send not found
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "No Recent Data.",
                LeaveForm: null,
            });
        }

        // Check status constraint
        if (form.status !== "Approved") {
            return res.status(200).json({
                success: true,
                message: "Data fetched successfully.",
                LeaveForm: form,
            });
        } else {
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            const endDate = new Date(form.endDate);
            endDate.setHours(0, 0, 0, 0);

            if (now <= endDate) {
                return res.status(200).json({
                    success: true,
                    message: "Data fetched successfully.",
                    LeaveForm: form,
                });
            }
        } 
        res.status(200).send(form);
    } catch (error) {
        console.error("Error fetching student leave status: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Need to Have Auto Rejection Logic, and need to display no data Available

// {
//     "_id": "687b9f20f62cff91a92d6fd4",
//     "applicantId": "6873cd700069d5c88a1e5d43",
//     "classId": "6873cb680069d5c88a1e5d35",
//     "startDate": "2025-07-19T00:00:00.000Z",
//     "endDate": "2025-07-21T00:00:00.000Z",
//     "reason": "home town Festival",
//     "status": "Pending",
//     "appliedAt": "2025-07-19T13:35:28.083Z",
//     "__v": 0
// }


