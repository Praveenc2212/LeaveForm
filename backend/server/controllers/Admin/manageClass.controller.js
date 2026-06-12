
import { ClassModel } from "../../models/class.model.js";
import { createClassModel, getFacultyByStaffId } from "../../services/user.service.js";

export const createClassController = async (req, res) => {
    try {
        const { staffId , department, year, section } = req.body;

        if ( !staffId || !department || !year || !section) {
            return res.status(400).json({
                success: false,
                message: "staffId, department, year, and section are required.",
            });
        }

        const facultyData = await getFacultyByStaffId(staffId);
        
        // Check if the class already exists
        const existingClass = await ClassModel.findOne({ tutorIds: facultyData._id, department, year, section });
        if (existingClass) {
            return res.status(409).json({
                success: false,
                message: "Class with this staffId, department, year, and section already exists.",
            });
        }

         // Use the service function
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