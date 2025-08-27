import { FacultyModel } from '../models/faculty.model.js';

/**
 * Finds a faculty by email and updates their signature path.
 * @param {string} email - The email of the faculty to update.
 * @param {string} signaturePath - The file path of the new signature.
 * @returns {Promise<Object|null>} The updated faculty document or null if not found.
 */
export const updateFacultySignatureByEmail = async (email, signaturePath) => {
    try {
        const updatedFaculty = await FacultyModel.findOneAndUpdate(
            { email },
            { $set: { facultySignature: signaturePath } },
            { new: true }
        );
        return updatedFaculty;
    } catch (error) {
        console.error("Error in updateFacultySignatureByEmail service:", error);
        throw error;
    }
};