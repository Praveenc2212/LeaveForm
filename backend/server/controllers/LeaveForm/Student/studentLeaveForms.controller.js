import { deleteManyFormsByIds, getFormsByApplicant } from "../../../services/form.service.js";

export const studentLeaveForms = async (req, res) => {
    if (req.user.designation !== "STUDENT") {
        return res.status(403).json({ message: "Forbidden" });
    }
    const studentId = req.user.id;
    try {
        const leaveForms = await getFormsByApplicant(studentId);
        if (leaveForms.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No Leave Forms Available",
                leaveForms: [],
            });
        }
        const endDate = new Date(leaveForms[0].endDate);
        endDate.setHours(0, 0, 0, 0);

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (now <= endDate) {
            leaveForms.shift();
        }
        
        const forms = leaveForms.slice(0, 5);

        res.status(200).json({
            success: true,
            message: "Leave forms fetched successfully.",
            leaveForms: forms,
        });

        if (leaveForms.length > 5) {
            const formsToDelete = leaveForms.slice(5);
            const idsToDelete = formsToDelete.map((form) => form._id);
            deleteManyFormsByIds(idsToDelete);
        }
    } catch (error) {
        console.error("Error fetching student leave forms:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch student leave forms",
            error: error.message,
        });
    }
};
// what to redesign this // 
// we need to get forms from the ArchivedForms Model, 
// Leave Forms Should be retrived from the ArchiveForm Model, Not From Active Form Model.
