import { FacultyModel } from "../../models/faculty.model.js";
import { StudentModel } from "../../models/student.model.js";
import { WardenModel } from "../../models/warden.model.js";

export const AuthenticatedData = async (req, res) => {
    const user = req.user;
    switch (user.designation) {
        case "STUDENT": {
            const student = await StudentModel.findById(user.id).populate('classId', 'department year section');
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    rollno: student.rollno,
                    gender: student.gender,
                    classId: student.classId._id,
                    department: student.classId.department,
                    year: student.classId.year,
                    section: student.classId.section,
                    designation: "STUDENT",
                },
            });
            break;
        }
        case "STAFF": {
            const faculty = await FacultyModel.findById(user.id);
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    id: faculty._id,
                    name: faculty.name,
                    email: faculty.email,
                    staffId: faculty.staffId,
                    department: faculty.department,
                    designation: faculty.designation,
                },
            });
            break;
        }
        case "HOD": {
            const hod = await FacultyModel.findById(user.id);
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    id: hod._id,
                    name: hod.name,
                    email: hod.email,
                    department: hod.department,
                    designation: hod.designation,
                },
            });
            break;
        }
        case "WARDEN": {
            const warden = await WardenModel.findById(user.id);
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    
                    id: warden.id,
                    name: warden.name,
                    email: warden.email,
                    designation: warden.designation,
                },
            });
            break;
        }
        case "ADMIN": {
            const admin = await FacultyModel.findById(user.id);
            res.status(200).json({
                success: true,
                message: "Login successful.",
                userData: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    staffId: admin.staffId,
                    department: admin.department, //CCF
                    designation: admin.designation,
                },
            });
            break;
        }
        default: {
            return res.status(400).json({
                success: false,
                message: "Invalid user designation.",
            });
        }
    }
};
