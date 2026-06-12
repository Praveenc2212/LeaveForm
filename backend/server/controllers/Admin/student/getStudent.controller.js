import { getStudentByRollNo, getStudentsByClass } from "../../../services/user.service.js";

export const getStudentController = async (req, res) => {
    const { action } = req.params;
    try {
        // Switch based on the action parameter
        switch (action) {
            case 'rollno': {
                const { rollno } = req.query;
                if (!rollno) {
                    return res.status(400).json({
                        success: false,
                        message: "Roll number is required.",
                    });
                }
                const student = await getStudentByRollNo(rollno);
                if (!student) {
                    return res.status(404).json({
                        success: false,
                        message: "No student found.",
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Student retrieved successfully.",
                    data: [student],
                });
            }
            case 'class': {
                const { section, department, year } = req.query;
                if (!section || !department || !year) {
                    return res.status(400).json({
                        success: false,
                        message: "Section, department, and year are required.",
                    });
                }

                const students = await getStudentsByClass(section, department, year);

                return res.status(200).json({
                    success: true,
                    message: "Students by class retrieved successfully.",
                    data: students,
                });
            }
            default:
                return res.status(400).json({
                    success: false,
                    message: "Invalid action specified.",
                });
        }
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching students.",
        });
    }
} 