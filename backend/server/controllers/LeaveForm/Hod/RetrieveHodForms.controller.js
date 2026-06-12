import { getFormsByDepartment } from "../../../services/form.service.js";

export const RetrieveHodForms = async (req, res, status) => {
    try {
        if (req.user.designation !== "HOD") {
            return res.status(403).json({ message: "Forbidden hod only allowed" });
        }
        // const hodId = req.user.id;
        const leaveForms = await getFormsByDepartment(req.user.department , status);
        // const leaveForms = await getFromsByHod(hodId, status);
        // console.log("Leave Forms for HOD:", leaveForms);
        
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
