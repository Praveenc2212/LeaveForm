import { createStaffOutpass, deleteStaffOutpassById, getOutpassesByStaff } from "../../../services/staffOutpass.service.js";

export const applyStaffOutpass = async (req, res) => {
    if (req.user.designation !== "STAFF") {
        return res.status(403).json({ success: false, message: "Forbidden: Staff only" });
    }

    try {
        const { place, startDate, endDate, mobile, reason } = req.body;

        if (!place || !startDate || !endDate || !mobile || !reason) {
            return res.status(400).json({
                success: false,
                message: "All fields (place, startDate, endDate, mobile, reason) are required.",
            });
        }

        const newOutpass = await createStaffOutpass({
            staffId: req.user.id,
            place,
            startDate,
            endDate,
            mobile,
            reason,
        });

        return res.status(201).json({
            success: true,
            message: "Staff outpass requested successfully.",
            outpass: newOutpass,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to request staff outpass.",
            error: error.message,
        });
    }
};

export const deleteStaffOutpass = async (req, res) => {
    if (req.user.designation !== "STAFF") {
        return res.status(403).json({ success: false, message: "Forbidden: Staff only" });
    }

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Outpass ID is required." });
        }

        const deleted = await deleteStaffOutpassById(id, req.user.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Outpass not found or cannot be deleted (only pending requests can be deleted).",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Outpass request deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete outpass request.",
            error: error.message,
        });
    }
};

export const getStaffOutpasses = async (req, res) => {
    if (req.user.designation !== "STAFF") {
        return res.status(403).json({ success: false, message: "Forbidden: Staff only" });
    }

    try {
        const rawOutpasses = await getOutpassesByStaff(req.user.id);
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
            message: "Failed to retrieve outpasses.",
            error: error.message,
        });
    }
};
