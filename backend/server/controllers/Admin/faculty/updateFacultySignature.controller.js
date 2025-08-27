import { updateFacultySignatureByEmail } from '../../../services/admin.service.js';

export const updateFacultySignature = async (req, res) => {
    try {
        const { facultyEmail } = req.body;
        const facultySignFile = req.file;

        if (!facultyEmail || !facultySignFile) {
            return res.status(400).json({ message: "Bad Request: Faculty email and signature file are required." });
        }

        const base64Image = `data:${facultySignFile.mimetype};base64,${facultySignFile.buffer.toString('base64')}`;

        const updatedFaculty = await updateFacultySignatureByEmail(facultyEmail, base64Image);

        if (!updatedFaculty) {
            return res.status(404).json({ message: "Faculty not found with the provided email." });
        }

        res.status(200).json({
            message: "Faculty signature updated successfully.",
            data: updatedFaculty
        });

    } catch (error) {
        console.error("Error in updateFacultySignature controller:", error);
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File is too large. Maximum size is 10MB.' });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
};