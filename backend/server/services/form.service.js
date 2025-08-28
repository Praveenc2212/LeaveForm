import { ClassModel } from "../models/class.model.js";
import { FormModel } from "../models/form.model.js";

// Create a new Leave Form
export const createLeaveForm = async (data) => {
    const form = new FormModel(data);
    return await form.save();
};

export const getFromsByHod = async (hodId, status) => {
    const classData = await ClassModel.findOne({ hodId }, { _id: 1 });
    if (!classData) return [];
    return await FormModel.find({ classId: classData._id, status })
        .populate("applicantId", "_id name rollno")
        .lean();
};

// Get all forms by Applicant ID
export const getFormsByApplicant = async (applicantId) => {
    return await FormModel.find({ applicantId })
        .sort({ appliedAt: -1 })
        .select("_id startDate endDate reason status")
        .lean();
};

export const getRecentAppliedStudentForm = async (studentId) => {
    return await FormModel.findOne({ applicantId: studentId })
        .sort({ appliedAt: -1 })
        .populate("applicantId", "name rollno") // Populate student details
        .populate({
            path: "classId",
            select: "year section department tutorIds", // Populate class details
            populate: {
                path: "tutorIds", // Further populate tutor details within the class
                select: "name",
            },
        })
        .lean();
};

// for class Tutors, return data is separated into 2 : tutor not Accepted and tutor Accepted...
export const getFormsByTutor = async (tutorId, status) => {
    const classData = await ClassModel.findOne(
        { tutorIds: tutorId },
        { _id: 1 }
    );

    if (!classData) return [];

    return await FormModel.find({ classId: classData._id, status })
        .populate("applicantId", "_id name rollno")
        .lean();
};

export const getApprovedFormsByTutor = async (tutorId, status) => {
    const classData = await ClassModel.findOne(
        { tutorIds: tutorId },
        { _id: 1 }
    );

    if (!classData) return [];

    return await FormModel.find({ classId: classData._id, status })
        .populate("applicantId", "_id name rollno")
        .populate({
            path: "classId",
            select: "year section department tutorIds",
            populate: {
                path: "tutorIds",
                select: "name",
            },
        })
        .lean();
};

// Retrieves Forms That are Tutor Approved for HOD of Specific Department...
export const getFormsByDepartment = async (department, status) => {
    const classes = await ClassModel.find({ department }).select("_id");
    const classIds = classes.map((cls) => cls._id);
    
    return await FormModel.find({
        classId: { $in: classIds },
        status: status,
    })
        .populate("applicantId", "name rollno classId")
        .populate({
            path: "classId",
            select: "year section department tutorIds",
            populate: {
                path: "tutorIds",
                select: "name",
            },
        })
        .lean();
};

export const updateLeaveFormStatus = async (formId, status) => {
    return await FormModel.findByIdAndUpdate(formId, { status });
};

// Delete Forms by IDs
export const deleteManyFormsByIds = async (ids) => {
    return await FormModel.deleteMany({ _id: { $in: ids } });
};

// Update many forms by Tutor ID
export const updateManyFormsByTutor = async (tutorId) => {
    const classId = await ClassModel.findOne({ tutorIds: tutorId }).select(
        "_id"
    );
    if (!classId) {
        throw Error("Invalid Class Access.");
    }
    return await FormModel.updateMany(
        { classId, status: "Pending" },
        { $set: { status: "Reviewed" } }
    );
};

// Update many forms by Department for HOD
export const updateManyFormsByDepartment = async (department) => {
    const classes = await ClassModel.find({ department }).select("_id");
    const classIds = classes.map((cls) => cls._id);
    return await FormModel.updateMany(
        { classId: { $in: classIds }, status: "Reviewed" },
        { $set: { status: "Approved" } }
    );
};
