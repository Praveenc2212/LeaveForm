import { createMultipleStudents, getClassByDetails } from "../../../services/user.service.js";

export const createMultipleStudentController = async (req, res) => {
    try {
        const { classData, studentData: students } = req.body;

        // Validate class object
        if (!classData || !classData.department || !classData.year || !classData.section) {
            return res.status(400).json({
                success: false,
                message: "Class object with department, year, and section is required.",
            });
        }

        // Validate students array
        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({
                success: false,
                message: "An array of student objects is required.",
            });
        }

        // Find the class in DB
        const studentClass = await getClassByDetails(classData.department, classData.year, classData.section);

        if (!studentClass) {
            return res.status(404).json({
                success: false,
                message: `Class not found for department: ${classData.department}, year: ${classData.year}, section: ${classData.section}.`,
            });
        }

        // Prepare student documents
        const createdStudents = [];
        for (const studentData of students) {
            const { name, email, rollno, gender } = studentData;

            // Validate each student object
            if (!name || !email || !rollno || !gender) {
                return res.status(400).json({
                    success: false,
                    message: "All fields (name, email, rollno, gender) are required for each student.",
                });
            }

            const newStudent = {
                name,
                email,
                rollno,
                password: rollno.toLowerCase(),
                gender,
                classId: studentClass._id
            };
            createdStudents.push(newStudent);
        }

        await createMultipleStudents(createdStudents);

        return res.status(201).json({
            success: true,
            message: "Students created successfully.",
            data: createdStudents,
        });
    } catch (error) {
        console.error("Error creating students:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating students.",
        });
    }
};