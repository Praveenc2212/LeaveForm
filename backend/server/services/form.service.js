
import { FormModel } from "../models/Form.model.js";

/**
 * Get leave forms for a student (their own leave forms)
 * @param {Object} user - User object (must have _id)
 * @returns {Promise<Array>} - List of leave forms applied by the student
 */
export async function getFormsByApplicant(applicantId) {
    return await FormModel.find({ applicant: applicantId }).sort({ appliedAt: -1 });
}

/**
 * Get pending leave forms for a staff member (tutor)
 * @param {Object} user - User object (must have _id)
 * @returns {Promise<Array>} - List of pending leave forms for staff's class
 */
export async function getFormsByTutor(tutorId, status) {
    const query = { tutor: tutorId };
    if (status) query.status = status;
    return await FormModel.find(query).sort({ appliedAt: 1 });
}

/**
 * Get tutor-approved leave forms for HOD
 * @returns {Promise<Array>} - List of tutor-approved leave forms
 */
export async function getHodLeaveForms() {
    return await FormModel.find({ status: "Tutor Approved" }).sort({ appliedAt: 1 });
}