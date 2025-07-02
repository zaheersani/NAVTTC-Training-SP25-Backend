const StudentModel = require('../models/studentModel');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find(); // Fetch all students from the database
        res.status(200).json(students); // Send the list of students as a JSON response
    } catch (error) {
        console.error('Error fetching students:', error.message); // Log the error message
        res.status(500).json({ message: 'Error fetching students', error }); // Handle errors
    }
}

exports.createStudent = async (req, res) => {
    const { name, rollno, section } = req.body; // Destructure the request body

    const newStudent = new StudentModel({ name, rollno, section }); // Create a new student instance

    try {
        const savedStudent = await newStudent.save(); // Save the new student to the database
        res.status(201).json(savedStudent); // Send the saved student as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error }); // Handle errors
    }
}