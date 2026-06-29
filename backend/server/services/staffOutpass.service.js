import { StaffOutpassModel } from "../models/staffOutpass.model.js";
import { FacultyModel } from "../models/faculty.model.js";
import { generateShortId } from "../utils/shortId.util.js";

// Create a new Staff Outpass Form
export const createStaffOutpass = async (data) => {
    data.shortId = generateShortId("F");
    const outpass = new StaffOutpassModel(data);
    return await outpass.save();
};

// Retrieve all outpasses for a specific staff member (sorted by appliedAt DESC)
export const getOutpassesByStaff = async (staffId) => {
    return await StaffOutpassModel.find({ staffId })
        .populate("staffId", "name email department")
        .sort({ appliedAt: -1 })
        .lean();
};

// Delete a staff outpass if it's pending
export const deleteStaffOutpassById = async (outpassId, staffId) => {
    return await StaffOutpassModel.findOneAndDelete({ _id: outpassId, staffId, status: "Pending" });
};

// Get pending staff outpasses for HOD's department
export const getPendingStaffOutpassesByDepartment = async (department) => {
    // Find all faculty in the department with designation STAFF
    const staffMembers = await FacultyModel.find({ department, designation: "STAFF" }).select("_id");
    const staffIds = staffMembers.map(s => s._id);

    return await StaffOutpassModel.find({
        staffId: { $in: staffIds },
        status: "Pending"
    })
    .populate("staffId", "name email department")
    .sort({ appliedAt: -1 })
    .lean();
};

// Get reviewed staff outpasses for HOD's department (Approved or Rejected)
export const getReviewedStaffOutpassesByDepartment = async (department) => {
    const staffMembers = await FacultyModel.find({ department, designation: "STAFF" }).select("_id");
    const staffIds = staffMembers.map(s => s._id);

    return await StaffOutpassModel.find({
        staffId: { $in: staffIds },
        status: { $in: ["Approved", "Rejected"] }
    })
    .populate("staffId", "name email department")
    .sort({ appliedAt: -1 })
    .lean();
};

// HOD Action (Approve / Reject)
export const updateStaffOutpassStatus = async (outpassId, department, status) => {
    // Find the outpass first and populate staffId to check department
    const outpass = await StaffOutpassModel.findById(outpassId).populate("staffId");
    if (!outpass) {
        throw new Error("Outpass not found");
    }

    if (outpass.staffId.department !== department) {
        throw new Error("Forbidden: Outpass belongs to another department");
    }

    outpass.status = status;
    return await outpass.save();
};
