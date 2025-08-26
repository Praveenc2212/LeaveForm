import { updateManyFormsByDepartment, updateManyFormsByTutor } from "../../services/form.service.js";

export const acceptAllLeavesForms = async (req, res) => {
    const user = req.user;
    console.log(user);
    try {
        if (user.designation === "STAFF") {
            await updateManyFormsByTutor(user.id);
            return res.status(200).json({
                success: true,
                message: "All leave forms accepted successfully.",
            });
        }
        else if (user.designation === "HOD") {
            await updateManyFormsByDepartment(user.department);
            return res.status(200).json({
                success: true,
                message: "All reviewed leave forms approved successfully.",
            });
        }
        else {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to accept all leave forms.",
            error: error.message,
        });
    }
};
