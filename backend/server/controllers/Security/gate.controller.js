import { FormModel } from "../../models/form.model.js";
import { StaffOutpassModel } from "../../models/staffOutpass.model.js";
import mongoose from "mongoose";

// Helper to format duration
const calculateDuration = (start, end) => {
    const diff = new Date(end) - new Date(start);
    if (isNaN(diff) || diff < 0) return "0 hrs";
    const hrs = Math.round(diff / (1000 * 60 * 60));
    if (hrs >= 24) {
        const days = Math.floor(hrs / 24);
        const remHrs = hrs % 24;
        return `${days} day${days > 1 ? "s" : ""}${remHrs > 0 ? ` ${remHrs} hr${remHrs > 1 ? "s" : ""}` : ""}`;
    }
    return `${hrs} hr${hrs > 1 ? "s" : ""}`;
};

export const scanQrCode = async (req, res) => {
    try {
        const { outpassId, type } = req.body;
        
        if (!outpassId || !type) {
            return res.status(400).json({ success: false, message: "Outpass ID and Type are required." });
        }

        let outpass;
        const isObjectId = mongoose.isValidObjectId(outpassId);
        const query = isObjectId ? { _id: outpassId } : { shortId: outpassId };

        if (type === "student") {
            outpass = await FormModel.findOne(query).populate("applicantId", "name rollNo").populate("classId", "department");
        } else if (type === "staff") {
            outpass = await StaffOutpassModel.findOne(query).populate("staffId", "name email department designation");
        } else {
            return res.status(400).json({ success: false, message: "Invalid outpass type." });
        }

        if (!outpass) {
            return res.status(404).json({ success: false, message: "Outpass not found." });
        }

        if (outpass.status !== "Approved") {
            return res.status(400).json({ success: false, message: `Outpass is not approved (Status: ${outpass.status}).` });
        }

        if (outpass.gateStatus === "Completed") {
            return res.status(400).json({ success: false, message: "This outpass has already been fully used and completed." });
        }

        let action = "";
        if (outpass.gateStatus === "Pending") {
            // Perform Check-out
            outpass.checkOutTime = new Date();
            outpass.gateStatus = "Checked-Out";
            action = "Check-Out Successful";
        } else if (outpass.gateStatus === "Checked-Out") {
            // Prevent double-scan by enforcing a minimum 5-minute gap between checkout and checkin
            const now = new Date();
            const timeSinceCheckOut = now - new Date(outpass.checkOutTime);
            const FIVE_MINUTES_MS = 5 * 60 * 1000;
            
            if (timeSinceCheckOut < FIVE_MINUTES_MS) {
                return res.status(400).json({ success: false, message: "Please wait at least 5 minutes after Check-Out before Checking-In." });
            }

            // Perform Check-in
            outpass.checkInTime = now;
            outpass.gateStatus = "Completed";
            outpass.actualDuration = calculateDuration(outpass.checkOutTime, outpass.checkInTime);
            action = "Check-In Successful";
        }

        await outpass.save();

        res.status(200).json({
            success: true,
            message: action,
            data: {
                id: outpass._id,
                type: type,
                applicantName: type === "student" ? outpass.applicantId?.name : outpass.staffId?.name,
                department: type === "student" ? outpass.classId?.department : outpass.staffId?.department,
                designation: type === "student" ? "Student" : outpass.staffId?.designation,
                gateStatus: outpass.gateStatus,
                checkOutTime: outpass.checkOutTime,
                checkInTime: outpass.checkInTime,
                actualDuration: outpass.actualDuration
            }
        });
    } catch (error) {
        console.error("Error in scanQrCode:", error);
        res.status(500).json({ success: false, message: "Internal server error during scan." });
    }
};

export const getActiveGatePasses = async (req, res) => {
    try {
        const studentOutpasses = await FormModel.find({ gateStatus: "Checked-Out" }).populate("applicantId", "name rollNo").populate("classId", "department");
        const staffOutpasses = await StaffOutpassModel.find({ gateStatus: "Checked-Out" }).populate("staffId", "name email department designation");
        
        res.status(200).json({
            success: true,
            students: studentOutpasses,
            staff: staffOutpasses
        });
    } catch (error) {
        console.error("Error fetching active passes:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const getTodaysHistory = async (req, res) => {
    try {
        const { department } = req.query;

        // Start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Build the query to find outpasses that were checked out today
        // They can be either 'Checked-Out' or 'Completed'
        const query = {
            gateStatus: { $in: ["Checked-Out", "Completed"] },
            checkOutTime: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        };

        // Fetch without department filtering first, we will filter manually for students since department is nested in classId
        let studentOutpasses = await FormModel.find(query)
            .populate("applicantId", "name rollNo")
            .populate("classId", "department year section");
            
        let staffOutpasses = await StaffOutpassModel.find(query)
            .populate("staffId", "name email department designation");

        // Filter by department if provided (for HODs)
        if (department) {
            studentOutpasses = studentOutpasses.filter(outpass => outpass.classId?.department === department);
            staffOutpasses = staffOutpasses.filter(outpass => outpass.staffId?.department === department);
        }

        res.status(200).json({
            success: true,
            students: studentOutpasses,
            staff: staffOutpasses
        });
    } catch (error) {
        console.error("Error fetching today's history:", error);
        res.status(500).json({ success: false, message: "Internal server error while fetching history." });
    }
};
