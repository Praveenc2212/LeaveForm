import { getFormsByTutor, getApprovedFormsByTutor } from "../../../services/form.service.js";

export const RetrieveStaffForms = async (req, res, status) => {
    try {
        if (req.user.designation !== "STAFF") {
            return res.status(403).json({ message: "Forbidden only" });
        }
        const staffId = req.user.id;
        
        let leaveForms;
        if(status === "Approved") {
            leaveForms = await getApprovedFormsByTutor(staffId, status);
        } else {
            leaveForms = await getFormsByTutor(staffId, status);
        }
        res.status(200).json({
            success: true,
            message: "Leave forms fetched successfully.",
            leaveForms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching leave forms.",
            error: error.message,
        });
    }
};
