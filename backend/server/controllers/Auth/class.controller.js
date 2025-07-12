
import { ClassModel } from "../../models/class.model.js";
import { createClassModel, getFacultyByEmail } from "../../services/user.service.js";

export const createClass = async (req, res) => {
    try {
        const { facultyEmail , department, year, section } = req.body;

        if ( !facultyEmail || !department || !year || !section) {
            return res.status(400).json({
                success: false,
                message: "facultyEmail, department, year, and section are required.",
            });
        }
        // Check if the class already exists
        const existingClass = await ClassModel.findOne({ facultyEmail, department, year, section });
        if (existingClass) {
            return res.status(409).json({
                success: false,
                message: "Class with this facultyEmail, department, year, and section already exists.",
            });
        }

         // Use the service function
        const facultyData = await getFacultyByEmail(facultyEmail);
        const newClass = await createClassModel({ tutorIds: [facultyData._id], department, year, section });

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