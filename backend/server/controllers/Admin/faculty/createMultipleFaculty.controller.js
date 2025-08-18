import { createMultipleFaculty } from "../../../services/user.service.js";

export const createMultipleFacultyController = async (req, res) => {
    try {
        const facultyList = req.body;

        if (!Array.isArray(facultyList) || facultyList.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input. An array of faculty objects is required.",
            });
        }

        const createdFaculty = [];
        for (const facultyData of facultyList) {
            const { name, email, staffId, designation, department } = facultyData;

            // Validate each faculty object
            if (!name || !email || !staffId || !designation || !department) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required for each faculty.",
                });
            }
            const newFaculty = {
                name,
                email,
                staffId,
                password: "karpagam",
                designation,
                department
            };
            createdFaculty.push(newFaculty);
        }

        await createMultipleFaculty(createdFaculty);

        return res.status(201).json({
            success: true,
            message: "Faculty created successfully.",
            data: createdFaculty,
        });
    } catch (error) {
        console.error("Error creating faculty:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating faculty.",
        });
    }
};