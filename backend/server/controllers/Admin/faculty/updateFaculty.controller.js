// import { getFacultyByStaffId } from "../../../services/user.service";

export const updateFacultyController = async (req, res) => {
    // try {
    //     const { staffId } = req.params;

    //     const faculty = await getFacultyByStaffId(staffId);

    //     if (!faculty) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "Faculty not found.",
    //         });
    //     }

    //     // Update faculty details
    //     faculty.name = name || faculty.name;
    //     faculty.staffId = staffId || faculty.staffId;
    //     faculty.designation = designation || faculty.designation;
    //     faculty.department = department || faculty.department;

    //     await faculty.save();

    //     return res.status(200).json({
    //         success: true,
    //         message: "Faculty updated successfully.",
    //         data: faculty
    //     });
    // } catch (error) {
    //     console.error("Error updating faculty:", error);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Internal server error.",
    //     });
    // }
};