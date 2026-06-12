
import { StudentModel } from "../models/student.model.js";
import { FacultyModel } from "../models/faculty.model.js";
import { ClassModel } from "../models/class.model.js";

// --- Student Services ---
// Register a new Student...
export async function createStudent(data) {
    const student = new StudentModel(data);
    return await student.save();
}

// Find Student by email...
export async function getStudentByEmail(email) {
    return await StudentModel.findOne({ email }).populate('classId');
}

//find Student by roll number...
export async function getStudentByRollNo(rollno) {
    return await StudentModel.findOne({ rollno }).populate('classId');
}

// Find Student by Class Details...
export async function getStudentsByClass(section, department, year) {
    return await StudentModel.find({ section, department, year })
        .select("_id name rollno classId").populate('classId');
}

// create Multiple Students...
export async function createMultipleStudents(students) {
    return await StudentModel.insertMany(students, { ordered: false });
}

// --- Faculty Services ---
// Register a new Faculty...
export async function createFaculty(data) {
    const faculty = new FacultyModel(data);
    return await faculty.save();
}

// create Multiple Faculty...
export async function createMultipleFaculty(facultyList) {
    return await FacultyModel.insertMany(facultyList, { ordered: false });
}

// Find faculty by email...
export async function getFacultyByEmail(email) {
    return await FacultyModel.findOne({ email });
}

export async function getFacultyByStaffId(staffId) {
    return await FacultyModel.findOne({ staffId });
}


// --- Class Services ---
// Create a new Class document
export async function createClassModel(data) {
    const newClass = new ClassModel(data);
    return await newClass.save();
}

// Find class by department, year, and section...
export async function getClassByDetails(department, year, section) {
    return await ClassModel.findOne({ department, year, section });
}
