const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Import student controller
// Route to get all students
router.get('/', studentController.getAllStudents);

// Route to create a new student
router.post('/', studentController.createStudent);

module.exports = router; // Export the router to use in the main app file