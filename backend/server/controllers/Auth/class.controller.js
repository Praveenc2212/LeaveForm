
import { ClassModel } from "../models/class.model.js";

export const createClass = async (req, res) => {
    try {
        const { tutors, department, year, section } = req.body;

        if (!Array.isArray(tutors) || tutors.length === 0 || !department || !year || !section) {
            return res.status(400).json({
                success: false,
                message: "tutors (array), department, year, and section are required.",
            });
        }

        const existingClass = await ClassModel.findOne({ department, year, section });
        if (existingClass) {
            return res.status(409).json({
                success: false,
                message: "Class with this department, year, and section already exists.",
            });
        }

         // Use the service function
        const newClass = await createClass({ tutors, department, year, section });

        return res.status(201).json({
            success: true,
            message: "Class created successfully.",
            class: newClass
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create class.",
            error: error.message
        });
    }
};