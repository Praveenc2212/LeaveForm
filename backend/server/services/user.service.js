
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


// --- Faculty Services ---
// Register a new Faculty...
export async function createFaculty(data) {
    const faculty = new FacultyModel(data);
    return await faculty.save();
}

// Find faculty by email...
export async function getFacultyByEmail(email) {
    return await FacultyModel.findOne({ email });
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

