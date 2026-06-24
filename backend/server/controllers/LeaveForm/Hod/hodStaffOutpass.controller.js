import {
    getPendingStaffOutpassesByDepartment,
    getReviewedStaffOutpassesByDepartment,
    updateStaffOutpassStatus
} from "../../../services/staffOutpass.service.js";

export const getHodStaffOutpasses = async (req, res) => {
    if (req.user.designation !== "HOD") {
        return res.status(403).json({ success: false, message: "Forbidden: HOD only" });
    }

    try {
        const { status } = req.query; // "pending" or "reviewed"
        let rawOutpasses;

        if (status === "reviewed") {
            rawOutpasses = await getReviewedStaffOutpassesByDepartment(req.user.department);
        } else {
            rawOutpasses = await getPendingStaffOutpassesByDepartment(req.user.department);
        }

        const outpasses = rawOutpasses.map(op => ({
            id: op._id,
            place: op.place,
            startDate: op.startDate,
            endDate: op.endDate,
            mobile: op.mobile,
            reason: op.reason,
            status: op.status,
            appliedAt: op.appliedAt,
            staffName: op.staffId?.name,
            staffEmail: op.staffId?.email,
            staffDepartment: op.staffId?.department
        }));

        return res.status(200).json({
            success: true,
            outpasses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve staff outpasses.",
            error: error.message,
        });
    }
};

export const confirmStaffOutpassByHod = async (req, res) => {
    if (req.user.designation !== "HOD") {
        return res.status(403).json({ success: false, message: "Forbidden: HOD only" });
    }

    try {
        const { id } = req.params;
        const { action } = req.body; // "approve" or "reject"

        if (!id || !action || !["approve", "reject"].includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Valid Outpass ID and action ('approve' or 'reject') are required."
            });
        }

        const status = action === "approve" ? "Approved" : "Rejected";
        const updatedOutpass = await updateStaffOutpassStatus(id, req.user.department, status);

        return res.status(200).json({
            success: true,
            message: `Staff outpass ${status.toLowerCase()} successfully.`,
            outpass: updatedOutpass,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update staff outpass.",
        });
    }
};
