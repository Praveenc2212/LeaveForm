
import { ClassModel } from "../models/class.model.js";
import { FormModel } from "../models/Form.model.js";

// Create a new Leave Form
export async function createLeaveForm(data) {
    const form = new FormModel(data);
    return await form.save();
}

// Get all forms by Applicant ID
export async function getFormsByApplicant(applicantId) {
    return FormModel.find({ applicantId }).sort({ appliedAt: -1 })  
}

export async function getFormsByTutor(tutorId) {
    const classData = await ClassModel.findOne({ tutorIds: tutorId }, { _id: 1 });
    if (!classData) return [];
    return await FormModel.find({ classId: classData._id, status: "Pending" })
        .populate("applicantId", "name rollno");
}